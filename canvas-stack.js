function CanvasStack(parent) {
    return {
        push: pushCanvas
    }

    function pushCanvas(title) {
        var canvas; 
        var elm = createElm('div', e => {
                e.className = 'canvas-stack-child';
            },
            createElm('div', e => { 
                e.innerHTML = title;
                e.className = 'canvas-stack-child-title';
            }),
            createElm('canvas', e => {
                canvas = e;
            })
        );
        parent.appendChild(elm);
        return canvas;
    }

    function createElm(type, additions) {
        var children = argsSlice(arguments, 2);

        var elm = document.createElement(type);
        if(additions) {
            additions(elm);
        }

        for(var i = 0, l = children.length; i < l; ++i) {
            elm.appendChild(children[i]);
        }

        return elm;
    }

    function argsSlice(args, skip) {
        var result = [];
        args = args || [];
        skip = skip || 0;

        if(args.length <= skip) {
            return [];
        }

        for(var i = skip, l = args.length; i < l; ++i) {
            result.push(args[i]);
        }

        return result;
    }
}