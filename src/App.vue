<template>
  <div id="app">
    <h2>Arbre simple</h2>
    <json-tree :json="json" />
    <h2>Arbre double</h2>
    <json-tree-diff :left="json" :right="json" ref="tree"/>
    <br />
    <input type="text" v-model="path" />
    <button @click="open">open</button>
    <button @click="close">close</button>
  </div>
</template>

<script>
import JsonTree from './components/json-tree'
import JsonTreeDiff from './components/json-tree-diff'

export default {
  name: 'App',
  components: {
    JsonTree,
    JsonTreeDiff
  },

    data() {
        return {
            path : "",
            json : [{
                name: "assets",
                children: [{
                    name: "css",
                    children: [
                        {
                            name: "main.css" 
                        }, {
                            name: "reset.css" 
                        },
                    ]
                }, {
                    name: "js",
                    children: [{
                            name: "components",
                            children: []
                        }, {
                            name: "libraries",
                            children: [{
                                name: "vue",
                                children: [{
                                    name: "vue.min.js"
                                }]
                            },{
                                name: "bootstrap",
                                children: [{
                                    name: "bootstrap-toggle",
                                    children: [{
                                        name: "bootstrap-toggle.min.js"
                                    }]
                                }]
                            }
                            ]
                        },
                    ]
                }]
            }]
        }
    },

    computed : {
        pathArray() {
            return this.path.split("/");
        }
    },

    methods : {
        open () {
            var tree = this.$refs.tree;
            tree.trigger("open", tree.$refs.left, this.pathArray);
            tree.trigger("open", tree.$refs.right, this.pathArray);
        },
        close () {
            var tree = this.$refs.tree;
            tree.trigger("close", tree.$refs.left, this.pathArray);
            tree.trigger("close", tree.$refs.right, this.pathArray);
        }
    }
}
</script>

<style>
</style>
