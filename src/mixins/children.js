var ChildrenMixin = {
    methods: {
        getChildOf(parent, ref) {
            return parent.$refs[ref];
        },
        walkThroughChildren (parent, path, beforeCallback, afterCallback) {
            // slice is just used to create a copy of path
            // which is already an array
            var pathArray = path.slice();
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
};

export { ChildrenMixin };
