<template>
    <footer class="footer">
        <span>Copyright <strong>Cleantho</strong> © 2024</span>
    </footer>
</template>

<script>
export default {
    name: "FooterVue"
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>
