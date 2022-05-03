import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as Materials from 'babylonjs-materials';
import {preloading} from "./store";

export class LoaderService {
    loadModel(scene) {
        preloading.update(() => {
            return true;
        });
        let meshes;

        BABYLON.SceneLoader.ImportMeshAsync("", "/assets/models/", 'shelter_lp3.glb', scene).then((result) => {
            meshes = result.meshes[0];
            scene.activeCamera.setTarget(meshes)
            const ghostObject = meshes.getChildren()[0].clone("ghost");
            ghostObject.setEnabled(false);

            const building = ghostObject.getChildren()
            building.forEach((child)=>{
                child.visibility = 0.25;
            })
            preloading.update(() => {
                return false;
            });
        });

    }
}
