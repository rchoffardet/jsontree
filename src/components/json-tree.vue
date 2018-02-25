<template>
    <ul>
        <json-tree-item
            v-for="item in items" 
            v-bind:key="item.id"
            :name="item.name"
            :children="item.children"
            :ref="item.name"
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
      items: this.json
    };
  },

  props :{
      json: {type:Array, required:false}
  },

  methods : {
        before (pathArray) {
            this.walkThroughChildren(this, pathArray, (x) => console.log(x._props.name))
        },
        after (pathArray) {
          this.walkThroughChildren(this, pathArray, null, (x) => console.log(x._props.name))
        }
  },

  components: {
      JsonTreeItem
  }
};
</script>

<style scoped>

</style>
