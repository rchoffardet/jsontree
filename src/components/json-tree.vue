<template>
    <ul>
        <json-tree-item
            v-for="item in items" 
            v-bind:key="item.id"
            :name="item.name"
            :children="item.children"
            :ref="item.name"
            @close="onClose"
            @open="onOpen"
        />
    </ul>
</template>

<script>
import JsonTreeItem from "./json-tree-item"
import { ChildrenMixin } from "../mixins/children"
import _ from "lodash"

export default {
  mixins: [ChildrenMixin],
  data() {
    return {
      items: this.json,
      openedPaths: []
    };
  },
  props :{
      json: {type:Array, required:false}
  },
  methods : {
        open (pathArray) {
            this.walkThroughChildren(this, pathArray, (x) => x.open())
        },
        close (pathArray, recursively) {
            var path = pathArray.slice();
            this.walkThroughChildren(this, pathArray, null, (x) => {
                if(x.hasPath(path)) {
                    x.close(recursively);
                }
            });
        },
        getOpenedPathFor (pathArray) {
            return this.openedPaths
                .filter(x => _.isEqual(x.slice(), pathArray))
                [0];
        },
        addOpenedPath(pathArray) {
            if(!this.isOpen(pathArray))
            {
                this.openedPaths.push(pathArray);
            }
        },
        removeOpenedPath(pathArray) {
            var openedPath = this.getOpenedPathFor(pathArray);
            var index = this.openedPaths.indexOf(openedPath)
            if(index >= 0)
            {
                this.openedPaths.splice(index, 1);
            }
        },
        isOpen(pathArray) {
            return !!this.getOpenedPathFor(pathArray);
        },
        onOpen (pathArray) {
            this.addOpenedPath(pathArray);
            this.$emit("open",  pathArray);
        },
        onClose (pathArray) {
            this.removeOpenedPath(pathArray);
            this.$emit("close",  pathArray);
        },
  },
  components: {
      JsonTreeItem
  }
};
</script>

<style scoped>

</style>
