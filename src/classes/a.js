const Groups = require('./Groups')

async function start() {
 const aaa = await new Groups().get('','','Botany')
 console.log(aaa)
}

start()