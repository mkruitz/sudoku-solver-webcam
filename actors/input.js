function Input(canvasStack, processPicture) {
    var canvas;

    var transformer = new TransformImage(
        canvas = canvasStack.push('Webcam', {
            title: 'Re-process',
            action: function() {
                processPicture();
            }
        }), 
        data => { });
        
    return {
        exec: transformer.exec,
        getCanvas: function() {
            return canvas;
        }
    };
}