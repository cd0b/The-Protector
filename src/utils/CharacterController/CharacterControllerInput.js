"use strict";


export function ChararacterControllerInput() {

    this._keys = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        space: false,
        shift: false,
    };

    const _onKeyDown = function (e) {
        switch(e.keyCode) {
            case 87:
                this._keys.forward = true;
                break;
            case 65:
                this._keys.left = true;
                break;
            case 83:
                this._keys.backward = true;
                break;
            case 68:
                this._keys.right = true;
                break;
            case 32:
                this._keys.space = true;
                break;

        }
    }.bind(this);

    const _onKeyUp = function (e) {
        switch(e.keyCode) {
            case 87:
                this._keys.forward = false;
                break;
            case 65:
                this._keys.left = false;
                break;
            case 83:
                this._keys.backward = false;
                break;
            case 68:
                this._keys.right = false;
                break;
            case 32:
                this._keys.space = false;
                break;
        }
    }.bind(this);

    document.addEventListener("keydown", (e) => _onKeyDown(e), false);
    document.addEventListener("keyup", (e) => _onKeyUp(e), false);

}