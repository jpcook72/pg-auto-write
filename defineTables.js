const Sequelize = require('sequelize');

const defineAndAssociateDB = function(userDB, schemaData) {
    let exportTables = {}
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
    let checkTable;
    for(let i = 0; i < schemaData.tables.length; i++) {
        thisTable = (schemaData.tables[i])
        for (let k = 0; k < thisTable.belongsTo.length; k++) {
            for (let j = 0; j < schemaData.tables.length; j++) {
                checkTable = schemaData.tables[j]
                if (checkTable.id === thisTable.belongsTo[k].id) {
                    (userDB.models[thisTable.name]).belongsTo(userDB.models[checkTable.name]);
                    (userDB.models[checkTable.name]).hasMany(userDB.models[thisTable.name]);   
                }

            }
  
        }
    } 
    return userDB
}

module.exports = defineAndAssociateDB