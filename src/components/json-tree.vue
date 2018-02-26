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
            this.walkThroughChildren(this, pathArray, null, (x) => {
                if(x.hasPath(pathArray)) {
                    x.close(recursively);
                }
            });
        },
        onOpen (pathArray) {
            this.$emit("open",  pathArray);
        },
        onClose (pathArray) {
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
