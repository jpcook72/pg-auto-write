const Sequelize = require('sequelize');

const fromGet = {
    tables: [
            {    
                name: 'Food',
                fields: [
                    {
                        name: 'name',
                        type: 'string'
                    },
                    {
                        name: 'price',
                        type: 'float'
                    },
                ]
            },
            {
                name: 'Drink',
                fields: [
                    {
                        name: 'name',
                        type: 'string'
                    },
                    {
                        name: 'price',
                        type: 'float'
                    },
                ]
            }
            ],
}

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

