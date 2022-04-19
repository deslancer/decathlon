import * as BABYLON from 'babylonjs';

export class LightService {
    private readonly scene;
    constructor(scene) {
        this.scene = scene;
    }

    createHemisphericLight(){
      return new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), this.scene);
    }

    createDirectionalLight() {
      const dir_light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(1, -1, -1.5), this.scene)
        dir_light.position.y = 4;
        dir_light.intensity = 1;
        return dir_light;
    }

    createHDRILight(){
        const hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("./assets/textures/environment.env", this.scene);
        this.scene.environmentTexture = hdrTexture;
        hdrTexture.level = 1.0;
        const hdrRotation = 277.5; // in degrees
        hdrTexture.setReflectionTextureMatrix(BABYLON.Matrix.RotationY(BABYLON.Tools.ToRadians(hdrRotation)));
        return hdrTexture;
    }
}
