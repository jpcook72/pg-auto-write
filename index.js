const Sequelize = require('sequelize');
const axios = require('axios')
// const express = require("express")

// const app = express();
// app.use(express.json());

exports.makeDB = async function(db) {

    const resp = await axios.get('localhost:3035/api/schema/1')
    const fromGet = resp.data

    exportTables = {}

    fromGet.tables.forEach( (table) => {

        const fieldList = {}
        console.log(table)

        table.fields.forEach( (field) => {
            fieldList[field.name] = {}
            fieldList[field.name].type = Sequelize[field.type.toUpperCase()]
        })


        exportTables[table.name] = db.define(table.name.toLowerCase(), fieldList)


    })
    return {db, ...exportTables}
}

// const tables = makeDB(db)

