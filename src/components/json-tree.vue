<template>
    <ul>
        <json-tree-item
            v-for="item in items" 
            v-bind:key="item.id"
            :name="item.name"
            :children="item.children"
            @closed="closed"
            @opened="opened"
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
        getArrayFromPath(path) {
            if(!Array.isArray(path)) {
            path = path.split("/");
            }

            return path;
        },
        close(path) {
            var array = this.getArrayFromPath(path);
            var level = array.shift();

            this.$children
                .filter(x => x.$options.propsData.name == level)
                .forEach(x => x.closeChild(array));
        },
        open(path) {
            var array = this.getArrayFromPath(path);
            var level = array.shift();

            this.$children
                .filter(x => x.$options.propsData.name == level)
                .forEach(x => {
                    new Promise((resolve, reject) => {
                        x.open();
                        resolve(x);
                    }).then(x => x.openChild(array));
                });
        },
        isClose(path) {
            var array = this.getArrayFromPath(path);
            
        },
        isOpen(path) {
            var array = this.getArrayFromPath(path);
        },
        closed(path) {
            this.$emit("closed", path)
        },
        opened(path) {
            this.$emit("opened", path)
        }
  },

  components: {
      JsonTreeItem
  }
};
</script>

<style scoped>

</style>
