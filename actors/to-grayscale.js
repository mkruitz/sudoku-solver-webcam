function ToGrayScale(canvasStack) {
    var transformer = new TransformImage(
        canvasStack.push('ToGrayScale'), 
        data => { convert(data); });
        
    return {
        exec: transformer.exec
    };

    function convert(data) {
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i]     = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
    } 
}