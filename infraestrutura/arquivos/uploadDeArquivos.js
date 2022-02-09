const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoEValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoEValido) {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`

        return new Promise((resolve, reject) => {
            fs.createReadStream(caminho)
                .pipe(fs.createWriteStream(novoCaminho))
                .on('finish', () => resolve(novoCaminho))
        })
    } else {
        const erro = "Tipo de arquivo é inválido"
        return new Promise((resolve, reject) => reject(erro))
    }

}

