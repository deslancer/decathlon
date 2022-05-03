import * as BABYLON from 'babylonjs';

export class ShadowService {

	createShadowGenerator(light: Array<any>) {
		const shadowGenerator = new BABYLON.ShadowGenerator(512, light[0])
		shadowGenerator.useBlurExponentialShadowMap = true;
		shadowGenerator.blurScale = 2;
		shadowGenerator.setDarkness(0.4);
		return shadowGenerator;
	}

}
