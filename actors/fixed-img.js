function FixedImg(canvasStack, img, processPicture) {
    var canvas = canvasStack.push('Fixed img', {
        title: 'Load',
        action: function() {
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
        }
    }, {
        title: 'Re-process',
        action: function() {
            processPicture();
        }
    });
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    return {
        exec: getImageData
    };

    function getImageData() {
        var context = canvas.getContext('2d');
        return context.getImageData(0, 0, canvas.width, canvas.height);
    }
}