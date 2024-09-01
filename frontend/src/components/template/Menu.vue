<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input
        type="text"
        placeholder="Digite para filtrar..."
        v-model="treeFilter"
        name="filter"        
      />
    </div>
    <ctree :data="treeData" :filter="treeFilter" :options="treeOptions" />
  </aside>
</template>

<script>
import { mapState } from "vuex";
import ctree from "../additional/Tree";
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "MenuVue",
  components: {
    ctree,
  },
  computed: mapState(["isMenuVisible", "updateCategory"]),
  data() {
    return {
      treeFilter: "",
      treeData: [],
      treeOptions: {
        propertyNames: { text: "name" },
        filter: { emptyText: "Categoria não encontrada" },
        router: {
          name: "articlesByCategory",
          param: "id",
        },
      },
    };
  },
  watch: {
    updateCategory() {
      this.getTreeData();
    },
  },
  methods: {
    async getTreeData() {
      const url = `${baseApiUrl}/categories/tree`;
      this.treeData = await axios.get(url).then((res) => res.data);
    },
  },
  mounted() {
    this.getTreeData();
  },
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.menu a,
.menu a:hover {
  color: white;
  text-decoration: none;
}
.menu .tree-node .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.tree-arrow.has-child {
  filter: brightness(2);
}
.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}
.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}
.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}
.tree-filter-empty {
  color: #ccc;
  font-size: 1.3rem;
}
</style>
