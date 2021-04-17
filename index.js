const axios = require('axios')
const defineAndAssociateDB = require('./defineTables')

const DBsync = async function (db, schemaId) {

    const makeDB = async function(userDB, currentSchemaId) {
        const resp = await axios.get(`https://pg-visualizer.herokuapp.com/api/schema/${currentSchemaId}`)
        const schemaData = resp.data
        return defineAndAssociateDB(userDB, schemaData)
    }

    const syncDB = await makeDB(db, schemaId);
    await syncDB.sync({force:true})
}

exports.DBsync = DBsync

