function NoiseReduction(canvasStack) {
    var imgArea = new ImageArea(1);
    var binaryImg = new BinaryImg();

    var transformer = new TransformImage(
        canvasStack.push('Noise reduction'), 
        imgData => { convert(imgData); });

    return {
        exec: transformer.exec
    };

    function convert(imgData) {
        console.log('Noise reduction');

        var imgBin = binaryImg.toBinary(imgData);
        var newValues = [];
        for(var i = 0, l = imgBin.data.length; i < l; ++i) {
            var area = imgArea.getArea(imgBin, i);
            newValues.push(avgBinary(area));
        }
        
        imgBin.data = newValues;

        binaryImg.toNormal(imgData, imgBin);
    }
}

function avgBinary(arr) {
    var total = 0;
    for(var i = 0, l = arr.length; i < l; ++i) {
        total += arr[i];
    }

    return Math.round(total / arr.length);
}

function BinaryImg() {
    return {
        toBinary: toBinary,
        toNormal: toNormal
    }

    function toNormal(imgData, binaryImg) {
        var i = 0;
        var j = 0;
        while(i < imgData.data.length) {
            var val = binaryImg.data[j] ? 0 : 255;
            imgData.data[i    ] = val;
            imgData.data[i + 1] = val;
            imgData.data[i + 2] = val;
            imgData.data[i + 3] = 255;

            i += 4;
            ++j;
        }
    }

    function toBinary(imgData) {
        var result = {
            width: imgData.width,
            height: imgData.height,
            data: []
        };

        for(var i = 0, l = imgData.data.length; i < l; i += 4) {
            result.data.push(imgData.data[i] == 0 ? 1 : 0);
        }

        return result;
    }
}

function ImageArea(areaRadius) {
    return {
        getArea: getArea
    }

    function getArea(imgData, i) {
        var width = imgData.width;
        var length = imgData.data.length;
        var result = [];

        var xI = i % width;
        var xMin = xI - areaRadius;
        var xMax = xI + areaRadius + 1;
        var yI = i > 0 ? Math.trunc(i / width) : 0;
        var yMin = yI - areaRadius;
        var yMax = yI + areaRadius + 1;
        xMin = xMin < 0      ? 0    : xMin;
        xMax = xMax < width ? xMax : width;
        yMin = yMin < 0      ? 0    : yMin;
        yMax = yMax < length / width ? yMax : length / width;

        for(var iY = yMin; iY < yMax; ++iY) {
            for(var iX = xMin; iX < xMax; ++iX) {
                var index = iX + iY * width;
                result.push(imgData.data[index]);
            }
        }

        return result;
    }
}