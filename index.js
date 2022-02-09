const customExpress = require('./config/customExpsress')
const conexao = require('./infraestrutura/database/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

conexao.connect(erro => {
    if (erro) {
        console.error(erro)
    } else {
        console.log('mySQL conectado com sucesso!')
        
        Tabelas.init(conexao)
        const app = customExpress()
        
        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
})
