<template>
  <ul class="tree-root" v-if="test(filter, data)">
    <ctreeItem
      v-for="node in data"
      :key="node.id"
      :model="node"
      :filter="filter"
      :text="text"
      :router="options.router"
    ></ctreeItem>
  </ul>
  <div class="tree-filter-empty" v-else>
    {{ emptyText }}
  </div>
</template>

<script>
import ctreeItem from "./TreeItem";

const defination = {
  text: "text",
  emptyText: "No found",
};

export default {
  name: "c-tree",
  components: {
    ctreeItem,
  },
  props: {
    data: Object,
    filter: String,
    options: Object,
  },
  data() {
    return {
      text: this.getText(),
      emptyText: this.getMensage(),
    };
  },
  methods: {
    getText() {
      if (this.options != undefined) {
        if (this.options.propertyNames) {
          if (this.options.propertyNames.text) {
            return this.options.propertyNames.text;
          } else {
            return defination.text;
          }
        } else {
          return defination.text;
        }
      } else {
        return defination.text;
      }
    },
    getMensage() {
      if (this.options != undefined) {
        if (this.options.filter) {
          if (this.options.filter.emptyText) {
            return this.options.filter.emptyText;
          } else {
            return defination.emptyText;
          }
        } else {
          return defination.emptyText;
        }
      } else {
        return defination.emptyText;
      }
    },
    test(name, tree) {
      let result = false;
      for (let sheet of tree) {
        result = this.visible(name, sheet);
        if (result) {
          return true;
        }
      }
    },
    visible(name, tree) {
      if (name == "") {
        return true;
      } else {
        if (tree.children && tree.children.length > 0) {
          let result = false;
          for (let item of tree.children) {
            result = this.visible(name, item);
            if (result) {
              return true;
            }
          }
          if (tree[this.text].toLowerCase().match(name.toLowerCase())) {
            return true;
          }
        } else {
          if (tree[this.text].toLowerCase().match(name.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
  },
};
</script>

<style>
.tree-root {
  list-style-type: none;
  line-height: 30px;
  padding: 3px;
}
.tree-filter-empty {
  margin: 0px auto;
}
</style>
