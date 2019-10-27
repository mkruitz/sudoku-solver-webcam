function Input(canvasStack, processPicture) {
    var canvas;

    var transformer = new TransformImage(
        canvas = canvasStack.push('Webcam', {
            title: 'Re-process',
            action: function() {
                processPicture();
            }
        }), 
        imgData => { });
        
    return {
        exec: transformer.exec,
        getCanvas: function() {
            return canvas;
        }
    };
}