<template>
  <div class="user-admin">    
    <ctable hover striped :items="users" :fields="fields"></ctable>
  </div>
</template>

<script>
import ctable from "../additional/Table";
import { baseApiUrl } from "@/global";
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
      axios.get(url).then((res) => {
        this.users = res.data;
      });
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>
