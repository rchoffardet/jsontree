<template>
    <div>
        <json-tree :json="leftItems" @closed="leftClosed" @opened="leftOpened" ref="left" />
        <json-tree :json="rightItems" @closed="rightClosed" @opened="rightOpened" ref="right" />   
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
        leftClosed(path) {
            if(this.$refs.right.isOpen(path)) {
                this.$refs.right.close(path);
            }
            this.$refs.right.close(path);
        },
        leftOpened(path) {
            if(!this.$refs.right.isOpen(path)) {
                this.$refs.right.open(path);
            }
        },
        rightClosed(path) {
            if(this.$refs.left.isOpen(path)) {
                this.$refs.left.close(path);
            }
        },
        rightOpened(path) {
            if(!this.$refs.left.isOpen(path)) {
                this.$refs.left.open(path);
            }
        }
    },

    components: {
        JsonTree
    }
};
</script>

<style scoped>

</style>
