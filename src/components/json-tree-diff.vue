<template>
    <div>
        <json-tree :json="leftItems" @close="trigger('close', $refs.right, $event)" @open="trigger('open', $refs.right, $event)" ref="left" />
        <json-tree :json="rightItems" @close="trigger('close', $refs.left, $event)" @open="trigger('open', $refs.left, $event)" ref="right" />   
    </div>
</template>

<script>
import JsonTree from './json-tree'

export default {
    data() {
        return {
            leftItems: this.left,
            rightItems: this.right,
            listenToEvents: true,
        };
    },
    props: {
        left: {type:Array, required:false},
        right: {type:Array, required:false}
    },
    methods: {
        trigger(fn, side, pathArray) {
            if(this.listenToEvents) {
                // prevent circular events
                this.listenToEvents = false;
                side[fn](pathArray)
                this.listenToEvents = true;
            }
        }
    },
    components: {
        JsonTree
    }
};
</script>

<style scoped>
ul {
    display: inline-block;
    width: 45%;
}
</style>
