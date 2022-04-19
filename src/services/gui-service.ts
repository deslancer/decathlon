import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import './GUI.extensions'

export class GUIService {
    private readonly advancedDynamicTexture: any;
    private readonly model: any;
    private readonly scene: any;
    constructor(scene) {
        this.scene = scene;
        this.model = scene.getNodeByName("Building");
        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    }

    addBtnPlace(xrTest){
        const model = this.model;
        const ghost = this.scene.getNodeByName("ghost");
        const advancedTexture = this.advancedDynamicTexture;
        const btn_place = GUI.Button.CreateSimpleButton("place", "Place!");
        btn_place.width = "280px";
        btn_place.height = "120px";
        btn_place.color = "rgb(0, 130, 195)";
        btn_place.cornerRadius = 20;
        btn_place.background = "rgb(255, 234, 40)";
        btn_place.fontSize = "36px";
        btn_place.top = "-95px";
        btn_place.left = "-50px";
        btn_place.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        btn_place.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        advancedTexture.addControl(btn_place);
        btn_place.onPointerDownObservable.add(function () {
            if (ghost.isEnabled()) {
                model.setEnabled(true);
                model.isVisible = true;
                model.rotate(new BABYLON.Vector3(0,1,0), Math.PI, BABYLON.Space.LOCAL);
                model.position.x = ghost.position.x;
                model.position.y = ghost.position.y;
                model.position.z = ghost.position.z;

                model.scalingDeterminant = 0.03;

                ghost.setEnabled(false);
                xrTest.onHitTestResultObservable.clear();
                advancedTexture.getControlByName("message").isVisible = false;
            }
        });
        return btn_place;
    }
    addBtnExit(xr){
        const model = this.model;
        const button_exit = GUI.Button.CreateImageOnlyButton("exit", "assets/close.png");
        button_exit.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button_exit.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button_exit.width = "96px";
        button_exit.height = "96px";
        button_exit.color = "white";
        button_exit.cornerRadius = 20;
        button_exit.image.scaleX = 0.5;
        button_exit.image.scaleY = 0.5;
        button_exit.top = "95";
        button_exit.left = "-50";
        button_exit.background = "rgb(226, 12, 24)";
        this.advancedDynamicTexture.addControl(button_exit);
        button_exit.onPointerDownObservable.add(function () {
            model.scalingDeterminant = 1.0;
            xr.baseExperience.exitXRAsync();
        });
        return button_exit;
    }
    addBtnRotateRight(){
        const model = this.model;
        const btn_right = GUI.Button.CreateImageOnlyButton("btn_right", "assets/rotate_right.png");
        btn_right.width = "120px";
        btn_right.height = "120px";
        btn_right.color = "white";
        btn_right.cornerRadius = 20;
        btn_right.background = "rgb(0, 130, 195)";
        btn_right.image.scaleX = 0.5;
        btn_right.image.scaleY = 0.5;
        btn_right.top = "-95px";
        btn_right.left = "185px";
        btn_right.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        btn_right.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.advancedDynamicTexture.addControl(btn_right);
        btn_right.onPointerDownObservable.add(function () {
            model.rotate(new BABYLON.Vector3(0, 1, 0), +Math.PI / 8, BABYLON.Space.WORLD);
        });
        return btn_right
    }
    addBtnRotateLeft(){
         const model = this.model;
        const btn_left = GUI.Button.CreateImageOnlyButton("btn_left", "assets/rotate_left.png");
        btn_left.width = "120px";
        btn_left.height = "120px";
        btn_left.color = "white";
        btn_left.cornerRadius = 20;
        btn_left.background = "rgb(0, 130, 195)";
        btn_left.image.scaleX = 0.5;
        btn_left.image.scaleY = 0.5;
        btn_left.top = "-95px";
        btn_left.left = "50px";
        btn_left.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        btn_left.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.advancedDynamicTexture.addControl(btn_left);
        btn_left.onPointerDownObservable.add(function () {
            model.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 8, BABYLON.Space.WORLD);
        });
        return btn_left
    }

    addMessage() {
        let rectangle = new GUI.Rectangle("message");
        rectangle.background = "rgba(0,0,0,0.1)";
        rectangle.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        rectangle.color = "rgba(0,0,0,0)";
        rectangle.width = "100%";
        rectangle.height = "500px";
        rectangle.top = "200px";
        this.advancedDynamicTexture.addControl(rectangle);
        let XRPanel = new GUI.StackPanel();
        rectangle.addControl(XRPanel);
        const text1 = new GUI.TextBlock("text3");
        text1.fontFamily = "Helvetica";
        text1.textWrapping = true;
        text1.text = 'Для лучшего результата найдите свободную площадку и медленно перемещайте телефон пока не появится ghost объект, размещайте объект на расстоянии не менее 2х метров от вас';
        text1.color = "white";
        text1.fontSize = "32px";
        text1.height = "400px"

        text1.paddingLeft = "10px";
        text1.paddingRight = "10px";
        XRPanel.addControl(text1);
        return rectangle;
    }
}

