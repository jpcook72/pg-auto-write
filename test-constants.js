// const testTables = {
//     "id": 1,
//     "key": "11111",
//     "createdAt": "2021-01-02T14:06:40.620Z",
//     "updatedAt": "2021-01-02T14:06:40.620Z",
//     "tables": [
//         {
//             "id": 1,
//             "name": "book",
//             "associations": {
//                 "2": true
//             },
//             "createdAt": "2021-01-02T14:07:09.973Z",
//             "updatedAt": "2021-01-02T14:07:09.973Z",
//             "schemaId": 1,
//             "fields": [
//                 {
//                     "id": 1,
//                     "name": "title",
//                     "type": "string",
//                     "allowNull": false,
//                     "createdAt": "2021-01-02T14:07:10.000Z",
//                     "updatedAt": "2021-01-02T14:07:10.000Z",
//                     "tableId": 1
//                 }
//             ]
//         },
//         {
//             "id": 2,
//             "name": "author",
//             "associations": {
//                 "1": false
//             },
//             "createdAt": "2021-01-02T14:07:09.975Z",
//             "updatedAt": "2021-01-02T14:07:09.975Z",
//             "schemaId": 1,
//             "fields": [
//                 {
//                     "id": 2,
//                     "name": "name",
//                     "type": "string",
//                     "allowNull": true,
//                     "createdAt": "2021-01-02T14:07:10.000Z",
//                     "updatedAt": "2021-01-02T14:07:10.000Z",
//                     "tableId": 2
//                 }
//             ]
//         }
//     ]
// }

const testTables = {
    "id": "YQVYJH",
    "createdAt": "2021-04-17T02:02:05.531Z",
    "updatedAt": "2021-04-17T02:02:05.531Z",
    "tables": [
        {
            "id": 1,
            "frontId": 1,
            "name": "book",
            "offset": 0,
            "createdAt": "2021-04-17T02:02:19.120Z",
            "updatedAt": "2021-04-17T02:02:19.120Z",
            "schemaId": "YQVYJH",
            "fields": [
                {
                    "id": 1,
                    "name": "title",
                    "type": "string",
                    "allowNull": false,
                    "createdAt": "2021-04-17T02:02:19.131Z",
                    "updatedAt": "2021-04-17T02:02:19.131Z",
                    "tableId": 1
                }
            ],
            "belongsTo": [
                {
                    "id": 2,
                    "frontId": "2",
                    "name": "author",
                    "offset": 164,
                    "createdAt": "2021-04-17T02:02:19.121Z",
                    "updatedAt": "2021-04-17T02:02:19.121Z",
                    "schemaId": "YQVYJH",
                    "association": {
                        "id": 1,
                        "createdAt": "2021-04-17T02:02:19.131Z",
                        "updatedAt": "2021-04-17T02:02:19.131Z",
                        "belongsToId": 1,
                        "hasId": 2
                    },
                    "fields": [
                        {
                            "id": 2,
                            "name": "name",
                            "type": "string",
                            "allowNull": true,
                            "createdAt": "2021-04-17T02:02:19.132Z",
                            "updatedAt": "2021-04-17T02:02:19.132Z",
                            "tableId": 2
                        }
                    ]
                }
            ],
            "has": [ ]
        },
        {
            "id": 2,
            "frontId": 2,
            "name": "author",
            "offset": 164,
            "createdAt": "2021-04-17T02:02:19.121Z",
            "updatedAt": "2021-04-17T02:02:19.121Z",
            "schemaId": "YQVYJH",
            "fields": [
                {
                    "id": 2,
                    "name": "name",
                    "type": "string",
                    "allowNull": true,
                    "createdAt": "2021-04-17T02:02:19.132Z",
                    "updatedAt": "2021-04-17T02:02:19.132Z",
                    "tableId": 2
                }
            ],
            "belongsTo": [ ],
            "has": [
                {
                    "id": 1,
                    "frontId": "1",
                    "name": "book",
                    "offset": 0,
                    "createdAt": "2021-04-17T02:02:19.120Z",
                    "updatedAt": "2021-04-17T02:02:19.120Z",
                    "schemaId": "YQVYJH",
                    "association": {
                        "id": 1,
                        "createdAt": "2021-04-17T02:02:19.131Z",
                        "updatedAt": "2021-04-17T02:02:19.131Z",
                        "belongsToId": 1,
                        "hasId": 2
                    },
                    "fields": [
                        {
                            "id": 1,
                            "name": "title",
                            "type": "string",
                            "allowNull": false,
                            "createdAt": "2021-04-17T02:02:19.131Z",
                            "updatedAt": "2021-04-17T02:02:19.131Z",
                            "tableId": 1
                        }
                    ]
                }
            ]
        }
    ]
}

module.exports = {testTables}