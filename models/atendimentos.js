const { default: axios } = require('axios')
const moment = require('moment')
const repositorio = require('../repositorios/atendimento')

class Atendimento {
    constructor() {
        this.dataEValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(moment(dataCriacao))
        this.clienteEValido = ({ tamanho }) => tamanho >= 5

        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]
                return !campo.valido(parametro)
            })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEValida,
                mensagem: 'Data do agendamento deve ser maior ou igual à data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return { ...atendimento, id }
                })

        }

    }

    lista() {
        return repositorio.lista()
    }

    buscaPorId(id) {
        return repositorio.buscaPorId(id)
            .then(resultados => {
                const resultado = resultados[0]

                if (!resultado) {
                    const error = `atendimento com id ${id} not found`
                    return new Promise((resolve, reject) => reject({ error }))
                } else {
                    return resultado
                }


            })
    }

    alterar(id, valores) {
        return repositorio.altera(id, valores)
            .then(() => this.buscaPorId(id))
    }


    deleta(id) {
        const atendimentoApagado = this.buscaPorId(id)
        return repositorio.deleta(id)
            .then(() => atendimentoApagado)
    }
}

module.exports = new Atendimento