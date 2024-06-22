<template>
  <div class="tabs">
    <ul>
      <li
        v-for="(title, index) in tabTitles"
        :key="index"
        :class="selected == title ? 'aba ativo' : 'aba'"
      >
        <a class="link" @click="selected = title">{{ title }}</a>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
import { provide, computed } from "vue";

export default {
  name: "c-tabs",
  data() {
    return {
      selected: "",
    };
  },
  setup(props, { slots }) {
    const tabTitles = slots.default().map((tab) => tab.props.title);
    const tabActive = slots.default().map((tab) => tab.props.active);
    const position =
      tabActive.indexOf("") != -1
        ? tabActive.indexOf("")
        : tabActive.indexOf(true);
    const selectedTitle = tabTitles[position];
    provide("selectedTitle", selectedTitle); 
    return { tabTitles, selectedTitle };
  },
  provide() {
    return {      
      selectedTitle: computed(() => this.selected)
    }
  },
  mounted() {
    this.selected = this.selectedTitle;
  },
};
</script>

<style>
:root {
  --radius: 5px;
  --color: #d7d7d7;
}

.link,
.link:hover {
  text-decoration: none;
  padding: 12px;
  color: inherit;
  cursor: pointer;
}

.tabs {
  background-color: white;
  border: 1px solid var(--color);
  border-radius: var(--radius);
  margin: 5px;
}

.tabs ul {
  background-color: #f3f2f2;
  margin: 0px;
  display: flex;
  list-style-type: none;
  border-bottom: 1px solid var(--color);
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
}

.tabs .aba {
  color: cornflowerblue;
  margin: 10px 0px 0px 0px;
  max-width: min-content;
  text-align: center;
  font-size: 1.5em;
  z-index: 1;
  position: relative;
  top: 1px;
}

.tabs .ativo {
  background-color: white;
  color: black;
  border: 1px solid var(--color);
  border-bottom: 1px solid white;
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
}
</style>
