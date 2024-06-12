<template>
	<div id="app">
		<HeaderVue />
		<MenuVue />		
		<ContentVue />
		<FooterVue />
	</div>
</template>

<script>
import HeaderVue from "@/components/template/Header"
import MenuVue from "@/components/template/Menu"
import ContentVue from "@/components/template/Content"
import FooterVue from "@/components/template/Footer"

export default {
	name: "App",
	components: { HeaderVue, MenuVue, ContentVue, FooterVue }
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px calc(100vw - 300px);
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}
</style>