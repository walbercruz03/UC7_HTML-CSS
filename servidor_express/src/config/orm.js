import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: './src/database/bd.sqlite'

})

const conexaoBd = async () => {
    try{
        await sequelize.authenticate()
        console.log ('Conexão com o Banco estabelecida com sucesso!')
    }catch(error){
        console.log('Erro ao conectar com o banco de dados!')
    }
}

conexaoBd()

const sincronizarBd = async () => {
    try{
        await sequelize.sync({force:false})
        console.log('Banco de dados sincronizado com sucesso!')
    }catch(error){
        console.log('Erro ao sincronizar o banco de dados!')
    }
}

sincronizarBd()

export default sequelize;