const moment = require('moment')

let vezesFalse = 0
let vezesTrue = 0

for (let i = 0; i < 1000; i++) {
    let data1 = moment().format('YYYY-MM-DD HH:MM:SS')
    let data2 = moment('20/02/2022', 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

    let comparacao = moment(data2).isSameOrAfter(data1)

    if(comparacao) {
        vezesTrue++
    } else {
        vezesFalse++
    }
}

console.table([vezesTrue, vezesFalse])