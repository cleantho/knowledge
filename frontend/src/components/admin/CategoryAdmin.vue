<template>
  <div class="category-admin">
    <form>
      <input id="category-id" type="hidden" v-model="category.id" />
      <div class="m-2 colunm">
        <label for="category-name">Nome:</label>
        <input
          id="category-name"
          type="text"
          v-model="category.name"
          required
          :disabled="mode === 'remove'"
          placeholder="Informe o Nome da Categoria..."
        />
      </div>
      <div class="m-2 mt-4 colunm">
        <label for="category-parentId">Categoria Pai:</label>
        <select
          v-if="mode === 'save'"
          id="category-parentId"
          v-model="category.parentId"
        >
          <option
            v-for="(opt, i) in categories"
            :key="i"
            :value="opt.id"
            :selected="opt.id === category.parentId"
          >
            {{ opt.path }}
          </option>
        </select>

        <input
          v-else
          id="category-parentId"
          type="text"
          v-model="category.path"
          readonly
          disabled
        />
      </div>
      <div class="m-2 mt-4">
        <button
          class="button bg-primary"
          v-show="mode === 'save'"
          @click="save"
        >
          Salvar
        </button>
        <button
          class="button bg-danger"
          v-show="mode === 'remove'"
          @click="remove"
        >
          Excluir
        </button>
        <button class="button bg-secondary ml-2" @click="reset">
          Cancelar
        </button>
      </div>
    </form>
    <hr />
    <ctable hover striped :items="categories" :fields="fields">
      <template #actions="data">
        <button class="pencil" @click="loadCategory(data.item)">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="trash" @click="loadCategory(data.item, 'remove')">
          <i class="bi bi-trash"></i>
        </button>
      </template>
    </ctable>
  </div>
</template>

<script>
import ctable from "../additional/Table";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "CategoryAdmin",
  components: {
    ctable,
  },
  data: function () {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
    save(event) {
      event.preventDefault();
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.toasted.defaultSuccess();
          this.reset();
        })
        .catch((e) => showError(this.toasted, e));
    },
    remove(event) {
      event.preventDefault();
      const id = this.category.id;
      axios["delete"](`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.toasted.defaultSuccess();
          this.reset();
        })
        .catch((e) => showError(this.toasted, e));
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = this.categories.find((c) => c.id == category.id);
    },
  },
  mounted() {
    this.loadCategories();
  },
};
</script>

<style>
</style>
