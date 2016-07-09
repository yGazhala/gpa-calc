'use strict';

import template from './domino.html';

let dominoComponent = {
    bindings: {},
    template: template,
    controller: DominoController
};

function DominoController() {

    this.dominoAvailable = [
        'num1',
        'num2',
        'num3',
        'num4',
        'num5',
        'num6'
    ];

    this.dominoTopSelected = this.dominoAvailable[0];
    this.dominoBottomSelected = this.dominoAvailable[0];

    this.domino = document.querySelector('.domino_container');
    this.currentDominoDeg = 0;
    this.currentRotateValue = '';
    this.dominoSize = 1;
    this.currentScaleValue = '';

    this.rotateDomino = (deg) => {

        this.currentDominoDeg += deg;
        this.currentRotateValue = 'rotate(' + this.currentDominoDeg + 'deg)';

        // Rewrite transform rotate() but save the current transform scale() value
        this.domino.style.webkitTransform = this.currentRotateValue + this.currentScaleValue;
        this.domino.style.msTransform = this.currentRotateValue + this.currentScaleValue;
        this.domino.style.transform = this.currentRotateValue + this.currentScaleValue;
    };

    this.changeDominoScale = () => {

        this.currentScaleValue = 'scale(' + this.dominoSize + ',' + this.dominoSize + ')';

        // Rewrite transform scale() but save the current transform rotate() value
        this.domino.style.webkitTransform = this.currentScaleValue + this.currentRotateValue;
        this.domino.style.msTransform = this.currentScaleValue + this.currentRotateValue;
        this.domino.style.transform = this.currentScaleValue + this.currentRotateValue;
    };

    this.dominoAnimationSpeed = 0.5;

    this.changeDominoAnimationSpeed = () => {

        this.domino.style.webkitTransitionDuration = this.dominoAnimationSpeed + 's';
        this.domino.style.transitionDuration = this.dominoAnimationSpeed + 's';
    }
}

export default dominoComponent;
