<template>
    <li 
        :class="{collapsed : isCollapsed, folder : isFolder}"
        @click.self="isCollapsed ? open() : close()"
    >
        {{ name }}
        <ul v-if="isFolder && !isCollapsed">
            <json-tree-item 
                v-for="item in children"
                :key="item.id"
                :name="item.name"
                :children="item.children"
                :prefix="path"
                @closed="closed"
                @opened="opened"
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
        collapsed: {type:Boolean, default:true},
        prefix: {type:String, default:""}
    },
    computed: {
        isFolder() {
            return typeof this.children !== "undefined";
        },
        path() {
            return this.prefix == "" ? this.name : this.prefix + "/" + this.name; 
        }
    },
    data() {
        return {
            isCollapsed: this.collapsed
        };
    },
    methods : {
        open() {
            this.$emit("opened", this.path);
            this.isCollapsed = false;
        },
        close() {
            this.$emit("closed", this.path);
            this.isCollapsed = true;
        },
        getArrayFromPath(path) {
            if(!Array.isArray(path)) {
                path = path.split("/");
            }

            return path;
        },
        closeChild(path) {
            var array = this.getArrayFromPath(path);
            var level = array.shift();

            this.$children
                .filter(x => x.$options.propsData.name == level)
                .forEach(x => x.closeChild(array));
        },
        openChild(path) {
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
        closed(path) {
            this.$emit("closed", path)
        },
        opened(path) {
            this.$emit("opened", path)
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

    li.folder.collapsed::before {
        transform: rotate(0deg);
    }
</style>
