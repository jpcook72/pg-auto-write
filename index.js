const Sequelize = require('sequelize');
const axios = require('axios')
const express = require("express")

const app = express();
app.use(express.json());


const DBsync = async function (db) {

    // const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
    //     logging: false,
    //   });

    const makeDB = async function(somedb) {
        const resp = await axios.get('https://pg-visualizer.herokuapp.com/api/schema/1')
        const fromGet = resp.data
    
        exportTables = {}
        fromGet.tables.forEach( (table) => {
            const fieldList = {}
            table.fields.forEach( (field) => {
                fieldList[field.name] = {}
                fieldList[field.name].type = Sequelize[field.type.toUpperCase()]
                fieldList[field.name].allowNull = field.allowNull
            })
            exportTables[table.name] = somedb.define(table.name.toLowerCase(), fieldList)
        })

        fromGet.tables.forEach( (table,ind,arr) => {
            Object.keys(table.associations).forEach( assoc => {
                if (table.assocations[assoc]) {
                    const thisTable = arr.find( inTable => Number(inTable.id) === Number(assoc))
                    (exportTables[table.name]).belongsTo(exportTables[thisTable.name])
                    (exportTables[thisTable.name]).hasMany(exportTables[table.name])
                }
            })
        })

        return exportTables
    }

    const tables = await makeDB(db);
    await db.sync({force:true})
    // exports.db = db;
    // Object.keys(tables).forEach( table => {
    //     exports[table] = tables[table]
    // })
}

exports.DBsync = DBsync


// exports.makeDB = async function(db) {

//     const resp = await axios.get('localhost:3035/api/schema/1')
//     const fromGet = resp.data
//     console.log('it is getting', fromGet)

//     exportTables = {}

//     fromGet.tables.forEach( (table) => {

//         const fieldList = {}
//         console.log(table)

//         table.fields.forEach( (field) => {
//             fieldList[field.name] = {}
//             fieldList[field.name].type = Sequelize[field.type.toUpperCase()]
//         })


//         exportTables[table.name] = db.define(table.name.toLowerCase(), fieldList)


//     })
//     return {db, ...exportTables}
// }

// const tables = makeDB(db)

