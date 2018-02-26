import Vue from "vue";
import AppIndex from "./app-index";
import AppSimpleTree from "./app-simple-tree";
import AppDoubleTree from "./app-double-tree";

const routes = {
    "/": AppIndex,
    "/simple-tree" : AppSimpleTree,
    "/double-tree" : AppDoubleTree,
};

new Vue({
    el: "#app",
    name: "App",
    components: {
    },

    data() {
        return {
            currentRoute: window.location.pathname,
        };
    },

    computed: {
        ViewComponent () {
            return routes[this.currentRoute];
        }
    },

    render (h) { 
        return h(this.ViewComponent); 
    }
});
