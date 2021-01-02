const axios = require('axios')
const defineAndAssociateDB = require('./defineTables')

const DBsync = async function (db) {

    const makeDB = async function(userDB) {
        const resp = await axios.get('https://pg-visualizer.herokuapp.com/api/schema/1')
        const schemaData = resp.data
        return defineAndAssociateDB(userDB, schemaData)
    }

    const userDB = await makeDB(db);
    await userDB.sync({force:true})
}

exports.DBsync = DBsync

