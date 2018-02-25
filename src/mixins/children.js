var ChildrenMixin = {
    methods: {
        getChildOf(parent, ref) {
            return parent.$refs[ref];
        },
        walkThroughChildren (parent, pathArray, beforeCallback, afterCallback) {
            if(pathArray.length == 0) {
                return;
            }
            
            var ref = pathArray.shift();
            var children = this.getChildOf(parent, ref);
            if(children.length > 0)
            {
                var child = children[0];
                if(beforeCallback != null)
                {
                    beforeCallback(child);
                }
    
                this.walkThroughChildren(child, pathArray, beforeCallback, afterCallback);
    
                if(afterCallback != null)
                {
                    afterCallback(child);
                }
            }
        }
    }
}

export { ChildrenMixin }
