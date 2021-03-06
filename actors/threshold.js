function Threshold(canvasStack) {
    var transformer = new TransformImage(
        canvasStack.push('Threshold', {
            title: 'SetThreshold',
            action: function() {
                var newValue = Number.parseInt(prompt('New threshold', threshold), 10);
                if(Number.isNaN(newValue) || newValue < 0 || newValue > 255) {
                    newValue = 150;
                }
                
                threshold = newValue;

                console.log('New threshold', threshold);
            }
        }), 
        imgData => { convert(imgData.data); });

    var maxValue = 0;
    var minValue = 0;
    var threshold = 140;

    const color_white = 255;
    const color_black = 0;

    return {
        exec: transformer.exec,
        setThreshold: function(val) { threshold = val; },
        getThreshold: function () { return threshold; },
        getMax: function() { return maxValue; },
        getMin: function() { return minValue; }        
    };

    function convert(data) {
        var max = 0;
        var min = 255;
        // Data is in grayscale (so take one of the rgb parts)
        for (var i = 0; i < data.length; i += 4) {
            var current = data[i];
            if(current > max) {
                max = current;
            }

            if(current < min) {
                min = current;
            }

            var newColor = current > threshold
                ? color_white
                : color_black;

            data[i]     = newColor; // Red
            data[i + 1] = newColor; // Green
            data[i + 2] = newColor; // Blue
            data[i + 3] = 255;      // Alpha
        }

        maxValue = max;
        minValue = min;
        console.log('Thresholded with: max, min, threshold', max, min, threshold);
    } 
}