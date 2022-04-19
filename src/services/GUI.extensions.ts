import GUI from "babylonjs-gui";

GUI.AdvancedDynamicTexture.prototype.getControlByName = function (name) {
	let foundControl = null;
	if (name) {
		this.executeOnAllControls(function (control) {
			if (control.name && control.name === name) {
				foundControl = control;
			}
		}, this._rootContainer);
	}
	return foundControl;
}
GUI.AdvancedDynamicTexture.prototype.getControlsByName = function (name) {
	const foundControls = [];
	if (name) {
		this.executeOnAllControls(function (control) {
			if (control.name && control.name === name) {
				foundControls.push(control);
			}
		}, this._rootContainer);
	}
	return foundControls;
}


