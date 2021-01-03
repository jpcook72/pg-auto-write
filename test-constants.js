const testTables = {
    "id": 1,
    "key": "11111",
    "createdAt": "2021-01-02T14:06:40.620Z",
    "updatedAt": "2021-01-02T14:06:40.620Z",
    "tables": [
        {
            "id": 1,
            "name": "book",
            "associations": {
                "2": true
            },
            "createdAt": "2021-01-02T14:07:09.973Z",
            "updatedAt": "2021-01-02T14:07:09.973Z",
            "schemaId": 1,
            "fields": [
                {
                    "id": 1,
                    "name": "title",
                    "type": "string",
                    "allowNull": false,
                    "createdAt": "2021-01-02T14:07:10.000Z",
                    "updatedAt": "2021-01-02T14:07:10.000Z",
                    "tableId": 1
                }
            ]
        },
        {
            "id": 2,
            "name": "author",
            "associations": {
                "1": false
            },
            "createdAt": "2021-01-02T14:07:09.975Z",
            "updatedAt": "2021-01-02T14:07:09.975Z",
            "schemaId": 1,
            "fields": [
                {
                    "id": 2,
                    "name": "name",
                    "type": "string",
                    "allowNull": true,
                    "createdAt": "2021-01-02T14:07:10.000Z",
                    "updatedAt": "2021-01-02T14:07:10.000Z",
                    "tableId": 2
                }
            ]
        }
    ]
}

module.exports = {testTables}