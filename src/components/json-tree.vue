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

export default {
  mixins: [ChildrenMixin],
  data() {
    return {
      items: this.json,
      openedPath: []
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
        getBiggestParentOpenedPath (pathArray) {
            return this.openedPath
                .filter(x => pathArray.includes(x))
                .sort((a, b) => a.length - b.length)
                [0];
        },
        getChildOpenedPath(pathArray) {
            return this.openedPath
                .filter(x => x.includes(pathArray));
        },
        updateOpenedPath(pathArray) {

        },
        onOpen (pathArray){
            if(!this.openedPath.indexOf(pathArray))
            {
                this.openedPath.push(pathArray);
            }
            this.$emit("open",  pathArray)
        },
        onClose (pathArray) {
            var index = openedPath.indexOf(pathArray)
            if(!index)
            {
                this.openedPath.splice(index, 1);
            }
            this.$emit("close",  pathArray)
        },
  },
  components: {
      JsonTreeItem
  }
};
</script>

<style scoped>

</style>
