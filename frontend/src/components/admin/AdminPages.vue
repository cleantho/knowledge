<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <ctabs>
                <ctab title="Artigos">
                    <ArticleAdmin />
                </ctab>
                <ctab title="Categorias" active>
                    <CategoryAdmin />
                </ctab>
                <ctab title="Usuários">
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
select {
    height: 32px;
}
.colunm {  
  display: flex;
  flex-direction: column;
}
.button {
  color: white;
  border: none;
  border-radius: 2px;
  box-shadow: 0px 0px 1px gray;
}
.pencil {
  width: 34px;
  height: 34px;
  margin-right: 5px;
  border-radius: 3px;
  border: none;
  background-color: rgb(220, 160, 10);
}
.pencil:hover {
  outline: 3px solid rgb(220, 200, 160);
  background-color: rgb(220, 180, 60);
  border-radius: 2px;
}
.trash {
  width: 34px;
  height: 34px;
  border-radius: 3px;
  border: none;
  background-color: darkred;
  color: white;
}
.trash:hover {
  outline: 3px solid rgb(200, 100, 100);
  background-color: rgb(200, 64, 64);
  border-radius: 2px;
}
</style>
