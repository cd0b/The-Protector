"use strict";








export function Controllable(selectable, controlSettings) {

    this.obj = selectable.obj;
    this.selectable = selectable.selectable;

    this.controlObject = controlSettings.controlObject;
    this.controlFeatures = controlSettings.controlFeatures;
    this.featuresRanges = controlSettings.featuresRanges;
    this.featureIndex = 0;
    this.controlFeature = this.controlFeatures[this.featureIndex];
    this.featureRange = this.featuresRanges[this.featureIndex];
    this.unit = (this.featureRange.max - this.featureRange.min) / 100;
    this.featureChange = false;

    window.addEventListener("wheel", function(e) {
        if(this.selectable) {
            const change = e.deltaY * -1;
            if((change > 0 && this.controlObject[this.controlFeature] < this.featureRange.max) || 
                (change < 0 && this.controlObject[this.controlFeature] > this.featureRange.min))
            this.controlObject[this.controlFeature] += change * this.unit;
        }
        if(this.controlObject[this.controlFeature] <= this.featureRange.min) {
            this.controlObject[this.controlFeature] = this.featureRange.min;
        } else if(this.controlObject[this.controlFeature] >= this.featureRange.max) {
            this.controlObject[this.controlFeature] = this.featureRange.max;
        }
    }.bind(this), false);
    window.addEventListener("mousedown", function(e) {
        if(e.which == 2) {
            this.featureIndex++;
            this.featureIndex %= this.controlFeatures.length;
            this.featureChange = true;
        }
    }.bind(this));

    this.update = function(timeElapsed) {
        selectable.update();
        this.selectable = selectable.selectable;
        if(this.featureChange) {
            this.controlFeature = this.controlFeatures[this.featureIndex];
            this.featureRange = this.featuresRanges[this.featureIndex];
            this.unit = (this.featureRange.max - this.featureRange.min) / 100;
            this.featureChange = false;
        }
    }

}