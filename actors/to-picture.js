function ToPicture(canvas, photo) {

    return {
        exec: update
    };

    function update(pictureData) {
        if(pictureData) {
            canvas.width = pictureData.width;
            canvas.height = pictureData.height;
    
            var context = canvas.getContext('2d');
            context.putImageData(pictureData, 0, 0);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }
        else {
            clear();
        }
    }

    function clear() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }  
}