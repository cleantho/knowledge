<template>
    <section class="content">
        <router-view></router-view>
    </section>
</template>

<script>
export default {    
    name: 'ContentVue'
}
</script>

<style>
    .content {
        grid-area: content;        
        background-color: #efefef;
        padding: 20px;
    }
</style>
