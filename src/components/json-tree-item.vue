<template>
    <li 
        :class="{closed : isClosed, folder : isFolder}"
        @click.self="isClosed ? open() : close()"
    >
        {{ name }}
        <ul v-if="isFolder" v-show="!isClosed">
            <json-tree-item 
                v-for="item in children"
                :key="item.id"
                :name="item.name"
                :children="item.children"
                :prefix="path"
                :ref="item.name"
                @close="onClose"
                @open="onOpen"
            />
        </ul>
    </li>
</template>

<script type="javascript">
export default {
    name: "JsonTreeItem",
    props : {
        name: {type:String, required:true},
        icon: {type:String, default:""},
        children: {type:Array, required:false},
        closed: {type:Boolean, default:true},
        prefix: {type:String, default:""}
    },
    computed: {
        isFolder() {
            return typeof this.children !== "undefined";
        },
        path() {
            return this.prefix == "" ? this.name : this.prefix + "." + this.name; 
        }
    },
    data() {
        return {
            isClosed: this.closed
        };
    },
    methods : {
        open() {
            this.isClosed = false;
            this.$emit("open", [this.name]);
        },
        close(recursively) {
            if(recursively) {
                this.$children.forEach(x => x.close(recursively));
            }

            this.isClosed = true;
            this.$emit("close", [this.name]);
        },
        hasPath(pathArray) {
            return pathArray.join(".") == this.path;
        },
        onOpen(pathArray) {
            pathArray.unshift(this.name);
            this.$emit("open", pathArray);
        },
        onClose(pathArray) {
            pathArray.unshift(this.name);
            this.$emit("close", pathArray);
        }
    }
};
</script>

<style scoped>
    li {
        list-style: none
    }

    li::before {
        display: inline-block;
        font-size: 10px;
        content: "\00A0";
    }

    li.folder::before {
        content: "\25BA";
        transform: rotate(45deg);
    }

    li.folder.closed::before {
        transform: rotate(0deg);
    }
</style>
