const { mongo } = require('../.env')
const mongoose = require('mongoose')

mongoose.connect(mongo)
    .then(_ => console.log('\x1b[32m%s', "Conectado ao MongoDB!", '\x1b[0m'))
    .catch(e => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })