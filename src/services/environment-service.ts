import * as BABYLON from 'babylonjs';
import type { ILoaderService } from "../interfaces/ILoaderService"
import type { MaterialsService } from './materials-service';
import { skyboxState, grassState, gridState } from './store';

export class EnvironmentService {
	private readonly scene: any;
	private readonly materialService: any;
	private loaderService: ILoaderService;
	constructor(scene: BABYLON.Scene, materials: MaterialsService, loaderService: ILoaderService) {
		this.scene = scene;
		this.materialService = materials;
		this.loaderService = loaderService;
	}

	createHDREnvironment(): void {
		this.loaderService.getEnvTextureTask().onSuccess = (task) => {
			task.texture.setReflectionTextureMatrix(
				BABYLON.Matrix.RotationY(1.20)
			);
			this.scene.environmentTexture = task.texture;
		}
	}

	createSkyBox() {
		let skybox = BABYLON.Mesh.CreateBox("BackgroundSkybox", 300, this.scene, undefined, BABYLON.Mesh.BACKSIDE);

		skyboxState.subscribe((value) => {
			skybox.setEnabled(value);
		});
		skybox.material = this.materialService.backgroundMaterial;
		this.scene.registerAfterRender(() => {
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
		ground.position.y = 0;

	}

	createGrid() {
		let grid = BABYLON.MeshBuilder.CreateDisc("plane", {
			radius: 15
		}, this.scene);
		grid.rotation.x = Math.PI / 2;
		grid.position.y = -0.06;
		grid.position.x = 0.5;
		grid.material = this.materialService.gridMaterial;
		gridState.subscribe((value) => {
			grid.setEnabled(value);
		});
	}
}
