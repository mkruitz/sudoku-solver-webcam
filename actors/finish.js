function Finish(canvasStack) {
    var canvas;
    var downloadBtn = createDownloadBtn();

    var transformer = new TransformImage(
        canvas = canvasStack.push('Finish', {
            title: 'Download',
            action: function() {
                var imgUrl = canvas.toDataURL('image/png');
                download(imgUrl);
            }
        }), 
        imgData => { });
        
    return {
        exec: transformer.exec
    };

    function download(dataUrl) {
        downloadBtn.setAttribute('href', dataUrl);
        downloadBtn.click();
    }

    function createDownloadBtn() {
        var a = document.createElement('a');
        a.setAttribute('download', 'img.png');
        var body = document.getElementsByTagName('body')[0];

        body.appendChild(a);
        return a;
    }
}