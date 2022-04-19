import * as BABYLON from 'babylonjs';
import { global_scene } from "./store";
import { GUIService } from "./gui-service";

export class XRService {

	initWebXR( scene ) {
		return scene.createDefaultXRExperienceAsync( {
			disableDefaultUI: true,
			disableTeleportation: true,
			optionalFeatures: true,
		} ).then( ( xr ) => {
			const ghost = scene.getNodeByName("ghost");
			const featuresManager = xr.baseExperience.featuresManager;
			const xrTest = featuresManager.enableFeature( BABYLON.WebXRHitTest, 'latest' ) as BABYLON.WebXRHitTest;
			let hitTestResults;
			xrTest.onHitTestResultObservable.add( ( results ) => {
				if (results.length) {
					hitTestResults = results[0]
					ghost.setEnabled(true)
					hitTestResults.transformationMatrix.decompose(undefined, undefined, ghost.position);
				} else {

				}
			} );
			const gui_service = new GUIService( scene );
			const btn_exit = gui_service.addBtnExit(xr);
			const btn_place = gui_service.addBtnPlace(xrTest)
			const btn_right = gui_service.addBtnRotateRight();
			const btn_left = gui_service.addBtnRotateLeft();
			const gui_message = gui_service.addMessage();
			let object = scene.getNodeByName( "Building" );

			xr.baseExperience.onStateChangedObservable.add( function ( state ) {
				switch (state) {
					case BABYLON.WebXRState.ENTERING_XR:
						object.setEnabled( false );
						ghost.scalingDeterminant = 0.03;
						console.log( "entering xr" )
						break;
					case BABYLON.WebXRState.IN_XR:
						btn_exit.isVisible = true;
						btn_place.isVisible = true;
						btn_right.isVisible = true;
						btn_left.isVisible = true;
						gui_message.isVisible = true;
						console.log( "in xr" )
						break;
					case BABYLON.WebXRState.EXITING_XR:
						object.setEnabled( true );
						object.position = new BABYLON.Vector3(0, 0, 0);
						object.scalingDeterminant = 1.0;
						btn_exit.isVisible = false;
						btn_place.isVisible = false;
						btn_right.isVisible = false;
						btn_left.isVisible = false;
						gui_message.isVisible = false;
						console.log( "exiting xr" )
						break;
					case BABYLON.WebXRState.NOT_IN_XR:
						object.setEnabled( true );
						object.position = new BABYLON.Vector3(0, 0, 0);
						object.scalingDeterminant = 1.0;
						btn_exit.isVisible = false;
						btn_place.isVisible = false;
						btn_right.isVisible = false;
						btn_left.isVisible = false;
						gui_message.isVisible = false;
						console.log( "not in  xr" )
						break;
				}
			} );


			return xr
		} )
	}


	enterXRSession( scene ) {
		this.initWebXR( scene ).then( ( xr ) => {
			xr.baseExperience.enterXRAsync( "immersive-ar", "unbounded", xr.renderTarget );
		} )
	}

}
