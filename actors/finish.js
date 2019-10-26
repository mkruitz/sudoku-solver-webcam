function Finish(canvasStack) {
    var transformer = new TransformImage(
        canvasStack.push('Finish'), 
        data => { });
        
    return {
        exec: transformer.exec
    };
}