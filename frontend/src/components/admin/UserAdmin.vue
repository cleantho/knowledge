<template>
  <div class="user-admin">
    <form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <div class="row m-2">
        <div class="left">
          <label for="user-name">Nome:</label>
          <input
            id="user-name"
            type="text"
            v-model="user.name"
            required
            :disabled="mode === 'remove'"
            placeholder="Informe o Nome do Usuário..."
          />
        </div>
        <div class="right">
          <label for="user-email">E-mail:</label>
          <input
            id="user-email"
            type="text"
            v-model="user.email"
            required
            :disabled="mode === 'remove'"
            placeholder="Informe o E-mail do Usuário..."
          />
        </div>
      </div>
      <div class="mt-4">
        <input
          type="checkbox"
          id="user-admin"
          v-model="user.admin"
          :disabled="mode === 'remove'"
          class="m-2"
        />
        <label for="user-admin">Administrador?</label>
      </div>
      <div class="row m-2">
        <div class="left">
          <label for="user-password">Senha:</label>
          <input
            id="user-password"
            type="password"
            v-model="user.password"
            required
            :disabled="mode === 'remove'"
            placeholder="Informe o Senha do Usuário..."
          />
        </div>
        <div class="right">
          <label for="user-confirm-password">Confirmação de Senha:</label>
          <input
            id="user-confirm-password"
            type="password"
            v-model="user.confirmPassword"
            required
            :disabled="mode === 'remove'"
            placeholder="Confirme a Senha do Usuário..."
          />
        </div>
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
    <ctable hover striped :items="users" :fields="fields">
      <template #actions="data">
        <button class="pencil" @click="loadUser(data.item)">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="trash" @click="loadUser(data.item, 'remove')">
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
  name: "UserAdmin",
  components: {
    ctable,
  },
  data: function () {
    return {
      mode: "save",
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "admin", label: "Administrador", sortable: true,
          formatter: (value) => (value ? "Sim" : "Não"),
        },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios
        .get(url)
        .then((res) => {
          this.users = res.data;
        })
        .catch((e) => showError(this.toasted, e));
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    save(event) {
      event.preventDefault();
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.toasted.defaultSuccess();
          this.reset();
        })
        .catch((e) => showError(this.toasted, e));
    },
    remove(event) {
      event.preventDefault();
      const id = this.user.id;
      axios["delete"](`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.toasted.defaultSuccess();
          this.reset();
        })
        .catch((e) => showError(this.toasted, e));
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
      this.user.admin = this.user.admin === "Sim" ? true : false;
      delete this.user.actions;
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
.row {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-template-areas: "left right";
  gap: 40px;
}
.left {
  grid-area: left;
  display: flex;
  flex-direction: column;
}
.right {
  grid-area: right;
  display: flex;
  flex-direction: column;
}
@media only screen and (max-width: 900px) {
  /* For tablets: */
  .row {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    grid-template-areas: "left" "right";
  }
}
</style>
