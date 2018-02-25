<template>
    <div>
        <json-tree :json="leftItems" @close="onLeftClose" @open="onLeftOpen" ref="left" />
        <json-tree :json="rightItems" @close="onRightClose" @open="onRightOpen" ref="right" />   
    </div>
</template>

<script>
import JsonTree from './json-tree'

export default {
    data() {
        return {
            leftItems: this.left,
            rightItems: this.right,
        };
    },
    props: {
        left: {type:Array, required:false},
        right: {type:Array, required:false}
    },
    methods: {

    },
    components: {
        JsonTree
    }
};
</script>

<style scoped>

</style>
