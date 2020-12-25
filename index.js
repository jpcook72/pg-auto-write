const Sequelize = require('sequelize');
const axios = require('axios')

const defineAndAssociateDB = function(userDB, schemaData) {
    exportTables = {}
    schemaData.tables.forEach( (table) => {
        const fieldList = {}
        table.fields.forEach( (field) => {
            fieldList[field.name] = {}
            fieldList[field.name].type = Sequelize[field.type.toUpperCase()]
            fieldList[field.name].allowNull = field.allowNull
        })
        exportTables[table.name] = userDB.define(table.name.toLowerCase(), fieldList)
    })

    let thisTable;
    let thisAssoc;
    let checkTable;
    for(let i = 0; i < schemaData.tables.length; i++) {
        thisTable = (schemaData.tables[i])
        for (let k = 0; k < Object.keys(schemaData.tables[i]).length; k++) {
            thisAssoc = Object.keys(thisTable.associations)[k]
            if (thisTable.associations[thisAssoc]) {
                for (let j = 0; j < schemaData.tables.length; j++) {
                    checkTable = schemaData.tables[j]
                    if (checkTable.id === Number(thisAssoc)) {
                        (db.models[thisTable.name]).belongsTo(db.models[checkTable.name]);
                        (db.models[checkTable.name]).hasMany(db.models[thisTable.name]);               
                    }
                }
            }
        }
    } 

    return exportTables
}

const DBsync = async function (db) {

    const makeDB = async function(userDB) {
        const resp = await axios.get('https://pg-visualizer.herokuapp.com/api/schema/1')
        const schemaData = resp.data
        return defineAndAssociateDB(userDB, schemaData)
    }

    const tables = await makeDB(db);
    await db.sync({force:true})
}

exports.DBsync = DBsync

