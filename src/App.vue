<template>
  <div id="app">
    <h2>Arbre simple</h2>
    <json-tree :json="json" />
    <h2>Arbre double</h2>
    <json-tree-diff :left="json" :right="json" />
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
    }
}
</script>

<style>
</style>
