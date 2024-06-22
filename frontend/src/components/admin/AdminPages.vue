<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <ctabs>
                <ctab title="Artigos">
                    <ArticleAdmin />
                </ctab>
                <ctab title="Categorias">
                    <CategoryAdmin />
                </ctab>
                <ctab title="Usuários" active>
                    <UserAdmin />
                </ctab>                    
            </ctabs>
        </div> 
    </div>
</template>

<script>
import ctab from '../additional/Tab'
import ctabs from '../additional/Tabs'

import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin, 
        ctab, ctabs  
    }
}
</script>

<style>

</style>
