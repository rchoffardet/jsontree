<template>
    <div>
        <h2>Simple tree</h2>
        <h3>(<a href="/">back</a>)</h3>
        <br/>
        <json-tree :json=json></json-tree>
    </div>
</template>

<script>
import JsonTree from "./components/json-tree";

export default {
    name: "AppSimpleTree",
    components: {
        JsonTree
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
        };
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
};
</script>

