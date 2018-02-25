<template>
    <ul>
        <json-tree-item
            v-for="item in items" 
            v-bind:key="item.id"
            :name="item.name"
            :children="item.children"
        />
    </ul>
</template>

<script>
import JsonTreeItem from './json-tree-item'

export default {
  data() {
    return {
      items: this.json
    };
  },

  props :{
      json: {type:Array, required:false}
  },

  methods : {
  },

  components: {
      JsonTreeItem
  }
};
</script>

<style scoped>

</style>
