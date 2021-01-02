const Sequelize = require('sequelize');

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
                        (userDB.models[thisTable.name]).belongsTo(userDB.models[checkTable.name]);
                        (userDB.models[checkTable.name]).hasMany(userDB.models[thisTable.name]);               
                    }
                }
            }
        }
    } 
    return userDB
}


// const defineAndAssociateDB = function(db, userDB, schemaData) {
//     exportTables = {}
//     schemaData.tables.forEach( (table) => {
//         const fieldList = {}
//         table.fields.forEach( (field) => {
//             fieldList[field.name] = {}
//             fieldList[field.name].type = Sequelize[field.type.toUpperCase()]
//             fieldList[field.name].allowNull = field.allowNull
//         })
//         exportTables[table.name] = userDB.define(table.name.toLowerCase(), fieldList)
//     })

//     let thisTable;
//     let thisAssoc;
//     let checkTable;
//     for(let i = 0; i < schemaData.tables.length; i++) {
//         thisTable = (schemaData.tables[i])
//         for (let k = 0; k < Object.keys(schemaData.tables[i]).length; k++) {
//             thisAssoc = Object.keys(thisTable.associations)[k]
//             if (thisTable.associations[thisAssoc]) {
//                 for (let j = 0; j < schemaData.tables.length; j++) {
//                     checkTable = schemaData.tables[j]
//                     if (checkTable.id === Number(thisAssoc)) {
//                         (db.models[thisTable.name]).belongsTo(db.models[checkTable.name]);
//                         (db.models[checkTable.name]).hasMany(db.models[thisTable.name]);               
//                     }
//                 }
//             }
//         }
//     } 

//     return exportTables
// }

module.expors = defineAndAssociateDB