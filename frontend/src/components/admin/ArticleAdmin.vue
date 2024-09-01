<template>
  <div class="article-admin">
    <form>
      <input id="article-id" type="hidden" v-model="article.id" />
      <div class="m-2 colunm">
        <label for="article-name">Nome:</label>
        <input
          id="article-name"
          type="text"
          v-model="article.name"
          required
          :disabled="mode === 'remove'"
          placeholder="Informe o Nome do Artigo..."
        />
      </div>
      <div class="m-2 mt-4 colunm">
        <label for="article-description">Descrição:</label>
        <input
          id="article-description"
          type="text"
          v-model="article.description"
          required
          :disabled="mode === 'remove'"
          placeholder="Informe o Descrição do Artigo..."
        />
      </div>
      <div class="m-2 mt-4 colunm" v-if="mode === 'save'">
        <label for="article-imageUrl">Imagem (URL):</label>
        <input
          id="article-imageUrl"
          type="text"
          v-model="article.imageUrl"
          :disabled="mode === 'remove'"
          placeholder="Informe a URL da imagem..."
        />
      </div>
      <div class="m-2 mt-4 colunm" v-if="mode === 'save'">
        <label for="article-categoryId">Categoria:</label>
        <select id="article-categoryId" v-model="article.categoryId">
          <option v-for="(opt, i) in categories" :key="i" :value="opt.value">
            {{ opt.text }}
          </option>
        </select>
      </div>
      <div class="m-2 mt-4 colunm" v-if="mode === 'save'">
        <label for="article-userId">Autor:</label>
        <select id="article-userId" v-model="article.userId">
          <option v-for="(user, i) in users" :key="i" :value="user.value">
            {{ user.text }}
          </option>
        </select>
      </div>
      <div class="m-2 mt-4 colunm" v-if="mode === 'save'">
        <label for="article-content">Conteúdo:</label>
        <VueEditor
          v-model="article.content"
          name="article-content"
          id="article-content"
          placeholder="Informe o Conteúdo do Artigo..."
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
    <ctable hover striped :items="articles" :fields="fields">
      <template #actions="data">
        <button class="pencil" @click="loadArticle(data.item)">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="trash" @click="loadArticle(data.item, 'remove')">
          <i class="bi bi-trash"></i>
        </button>
      </template>
    </ctable>
    <cpagination size="md" v-model="page" :totalRows="count" :perPage="limit" />
  </div>
</template>

<script>
import { VueEditor } from "vue3-editor";
import ctable from "../additional/Table";
import cpagination from "../additional/Pagination";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ArticleAdmin",
  components: {
    ctable,
    cpagination,
    VueEditor,
  },
  data: function () {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then((res) => {
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      }).catch((e) => showError(this.toasted, e));
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map((category) => {
          return { value: category.id, text: category.path };
        });
      }).catch((e) => showError(this.toasted, e));
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      }).catch((e) => showError(this.toasted, e));
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    save(event) {
      event.preventDefault();
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.toasted.defaultSuccess();
          this.reset();
        })
        .catch((e) => showError(this.toasted, e));
    },
    remove(event) {
      event.preventDefault();
      const id = this.article.id;
      axios["delete"](`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.toasted.defaultSuccess();
          this.reset();
        })
        .catch((e) => showError(this.toasted, e));
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      axios
        .get(`${baseApiUrl}/articles/${article.id}`)
        .then((res) => (this.article = res.data))
        .catch((e) => showError(this.toasted, e));
    },
  },
  watch: {
    page() {
      this.loadArticles();
    },
  },
  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUsers();
  },
};
</script>

<style>
</style>
