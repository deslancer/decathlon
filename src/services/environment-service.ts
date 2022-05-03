import * as BABYLON from 'babylonjs';
import { MaterialsService } from "./materials-service";


export class EnvironmentService {
	private readonly scene: any;
	private hdrTexture;
	private readonly materialService:any ;
	constructor(scene, materials) {
		this.scene = scene;
		this.materialService = materials;
	}
	createHDREnvironment(){
		const scene = this.scene;
		const url = "./assets/textures/environment.env";
		return new Promise((resolve, reject) =>{
			const envFileStatus = linkCheck( url );
			if (envFileStatus){
				let hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData( url, scene );
				hdrTexture.setReflectionTextureMatrix(
					BABYLON.Matrix.RotationY( 1.20 )
				);
				scene.environmentTexture = hdrTexture;
				this.hdrTexture = hdrTexture;
				resolve(hdrTexture);
			}
			function linkCheck( url ) {
				let http = new XMLHttpRequest();
				http.open( 'HEAD', url, false );
				http.send();
				return http.status != 404;
			}

			reject(new Error("Requested file return status 404"));
		})
	}

	createSkyBox(){
		let skybox = BABYLON.Mesh.CreateBox("BackgroundSkybox", 300, this.scene, undefined, BABYLON.Mesh.BACKSIDE);
		//skybox.setEnabled(true);
		skybox.material = this.materialService.backgroundMaterial;
		this.scene.registerAfterRender(()=>{
			skybox.rotate(BABYLON.Axis.Y, +0.00015, BABYLON.Space.LOCAL);
		})
		return skybox
	}

	createGround() {
		const ground = BABYLON.Mesh.CreatePlane('ground', 1000, this.scene)
		ground.rotation.x = Math.PI / 2;
		ground.material = this.materialService.shadowOnlyMaterial;
		ground.receiveShadows = true;
		ground.isPickable = false;
		ground.position.y = -0.05;

	}
	createGrid(){
		let grid = BABYLON.MeshBuilder.CreateDisc("plane", {
			radius: 15
		}, this.scene);
		grid.rotation.x = Math.PI / 2;
		grid.position.y = -0.06;
		grid.position.x = 0.5;
		grid.material = this.materialService.gridMaterial;
	}
}
