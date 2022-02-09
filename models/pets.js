const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos')
const repositorio = require('../repositorios/pet')

class Pet {
    adiciona(pet) {
        return uploadDeArquivo(pet.imagem, pet.nome)
            .then(novoCaminho => {
                const novoPet = {
                    nome: pet.nome,
                    imagem: novoCaminho
                }

                return repositorio.adiciona(novoPet)
                    .then(resultados => {
                        const id = resultados.insertId
                        return { ...novoPet, id }
                    })
            })
            .catch(error => error)
    }
}

module.exports = new Pet