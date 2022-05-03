import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

import { EngineService } from './services/engine-service';
import { CameraService } from './services/camera-service';
import { LightService } from './services/light-service';
import { LoaderService } from './services/loader-service';
import {ShadowService} from "./services/shadow-service";
import { MaterialsService } from "./services/materials-service";
import { EnvironmentService } from "./services/environment-service";
import { global_scene } from './services/store';

export const createScene = async ( canvas ) => {

	const engine = new EngineService( canvas ).getEngine();
	const scene = new BABYLON.Scene( engine );
	const cameraService = new CameraService( canvas, scene );
	const lightService = new LightService( scene );
	const loaderService = new LoaderService();
	const materialService = new MaterialsService(scene);
	const envService = new EnvironmentService(scene, materialService);
	const shadowService = new ShadowService();
	const lights: Array<any> = lightService.createDirectionalLights();

	scene.clearColor = new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 ).toLinearSpace();
	cameraService.createPerspectiveCam();
	shadowService.createShadowGenerator(lights);
	envService.createHDREnvironment().then(()=>{
		materialService.createBackgroundMaterial();
		materialService.createGrassMaterial();
		materialService.createGridMaterial();
		materialService.createShadowOnlyMaterial();
		envService.createSkyBox();
		envService.createGround();
		envService.createGrid();
		loaderService.loadModel( scene );
	})


	global_scene.update( () => {
		return scene;
	} );


	engine.runRenderLoop( () => {
		scene.render();
	} );

	/*await scene.debugLayer.show({
		embedMode: true,
	});*/
	return scene;
}
