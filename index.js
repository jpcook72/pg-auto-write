const Sequelize = require('sequelize');
const axios = require('axios')
const express = require("express")

const app = express();
app.use(express.json());


const DBsync = async function (db) {

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

        let thisTable;
        let thisAssoc;
        let checkTable;
        for(let i = 0; i < fromGet.tables.length; i++) {
            thisTable = (fromGet.tables[i])
            for (let k = 0; k < Object.keys(fromGet.tables[i]).length; k++) {
                thisAssoc = Object.keys(thisTable.associations)[k]
                if (thisTable.associations[thisAssoc]) {
                    for (let j = 0; j < fromGet.tables.length; j++) {
                        checkTable = fromGet.tables[j]
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

    const tables = await makeDB(db);
    await db.sync({force:true})
}

exports.DBsync = DBsync

