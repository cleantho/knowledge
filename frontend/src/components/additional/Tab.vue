<template>
  <div class="tab" v-show="title == selectedTitle">
    <slot />
  </div>
</template>

<script>
export default {
  name: "c-tab",
  props: {
    title: String,
    active: Boolean,
  },
  inject: ["selectedTitle"],
};
</script>

<style>
.tab {
  margin: 20px;
}
</style>
