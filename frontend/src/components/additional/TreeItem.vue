<template>
  <li class="tree-node" v-if="visible(filter, model)">
    <div class="tree-content" :class="{ bold: isFolder() }" @click="toggle">
      <i class="tree-arrow" :class="icon"></i
      ><a href="#" @click="onNodeSelect(model[router.param])">{{
        model[text]
      }}</a>
    </div>
    <ul v-show="isOpen" v-if="isFolder()">
      <c-tree-item
        v-for="node in model.children"
        :key="node.id"
        :model="node"
        :filter="filter"
        :text="text"
        :router="router"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "c-tree-item", // necessary for self-reference
  props: {
    model: Object,
    filter: String,
    text: String,
    router: Object,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    icon() {
      if (this.isFolder()) {
        return this.isOpen
          ? "has-child fa fa-lg fa-angle-down"
          : "has-child fa fa-lg fa-angle-right";
      } else {
        return "";
      }
    },
  },
  methods: {
    onNodeSelect(node) {
      this.$router.push({
        name: this.router.name,
        params: { id: node },
      });
    },
    isFolder() {
      return this.model.children && this.model.children.length > 0;
    },
    toggle() {
      if (this.isFolder()) {
        this.isOpen = !this.isOpen;
      }
    },
    visible(name, tree) {
      if (name == "") {
        return true;
      } else {
        if (this.isFolder()) {
          this.isOpen = true;
          let result = false;
          for (const item of tree.children) {
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

<style scoped>
.tree-node,
.tree-node ul {
  list-style-type: none;
  padding-inline-start: 14px;
  width: 100%;
}
a {
  color: gray;
}
a:hover {
  color: dodgerblue;
}
.tree-content {
  background: transparent;
}
.tree-content:hover {
  background: #f6f8fb;
  color: black;
}
.tree-arrow {
  font-size: 1.3em;
}
.has-child {
  color: gray;
}
i.fa {
  width: 20px;
  margin-right: 6px;
}
.bold {
  font-weight: bolder;
}
</style>
