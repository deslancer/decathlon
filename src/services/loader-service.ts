import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import linkCheck from './files-checker-helper.js';
import { IShadowGenerator } from "../interfaces/IShadowGenerator";
import { preloading } from "./store";

export class LoaderService {
	private shadowGenerator: IShadowGenerator;

	constructor( shadowGenerator: IShadowGenerator ) {
		this.shadowGenerator = shadowGenerator;
		this.shadowGenerator.createGenerator();
	}

	loadModel( scene ) {
		let meshes;
		const url = "./assets/models/shelter_lp3.glb";
		return new Promise( ( resolve, reject ) => {
			const envFileStatus = linkCheck( url );
			if (envFileStatus) {
				BABYLON.SceneLoader.ImportMeshAsync( "", "/assets/models/", 'shelter_lp3.glb', scene ).then( ( result ) => {
					meshes = result.meshes[0];
					const shelterOuter = scene.getNodeByName('Palatka_low').getChildren()[0];
					this.shadowGenerator.getGenerator().addShadowCaster(shelterOuter);
					scene.activeCamera.setTarget( meshes )
					const ghostObject = meshes.getChildren()[0].clone( "ghost" );
					ghostObject.setEnabled( false );

					const building = ghostObject.getChildren()
					building.forEach( ( child ) => {
						child.visibility = 0.25;
					} )
					const dimension_height = scene.getMeshByName( 'dimension_h' );
					const dimension_wd = scene.getMeshByName( 'dimensions_plane' );
					//dimension_height.isVisible = false;
					//dimension_wd.isVisible = false;
					dimension_height.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
					dimension_height.position.z = -1;
					dimension_height.position.y = -0.7;
					dimension_height.rotationQuaternion = new BABYLON.Quaternion.RotationAxis( new BABYLON.Vector3( 0, 1, -1 ), Math.PI );
					resolve( meshes )
					reject( new Error( "Requested file return status 404" ) );
				} );
			}
		} )

	}
}
