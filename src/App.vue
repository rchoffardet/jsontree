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
      json : [
        {
            id: 1,
            name: "my folder 1",
            children: [
                {
                    id: 11, 
                    name: "my file 1" 
                },
                {
                    id: 12, 
                    name: "my subfolder 1",
                    children: [
                        {
                            id: 111, 
                            name: "my subfile 1" 
                        },
                        {
                            id: 112, 
                            name: "my subfile 2" 
                        },
                    ]
                },
            ]
        },
        {
            id: 2,
            name: "my folder 2",
            children: [
                {
                    id: 21, 
                    name: "my file 1" 
                },
                {
                    id: 22, 
                    name: "my file 2" 
                },
                {
                    id: 23, 
                    name: "my file 3" 
                },
            ]
        }
      ]
    }
  }
}
</script>

<style>
</style>
