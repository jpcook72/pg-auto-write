const Sequelize = require('sequelize');
const axios = require('axios')
const express = require("express")

const app = express();
app.use(express.json());

const resp = axios.get('localhost:3035/api/schema/1')
console.log(resp.data)
const fromGet = resp.data

exports.makeDB = function(db) {

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

