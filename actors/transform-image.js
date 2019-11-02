function TransformImage(canvas, transformer) {
    return {
        exec: exec
    };

    function exec(pictureData) {
        if(pictureData) {
            canvas.width = pictureData.width;
            canvas.height = pictureData.height;
    
            var context = canvas.getContext('2d');
            // context.putImageData(pictureData, 0, 0);

            // var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            transformer(pictureData);

            context.putImageData(pictureData, 0, 0);
            return pictureData;
        }
        else {
            clear();
            return null;
        }
    }

    function clear() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#ABC";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }  
}