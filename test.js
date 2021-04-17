const {testTables} = require('./test-constants');
const defineAndAssociateDB = require('./defineTables');
const Sequelize = require('sequelize');

let testDB = new Sequelize(`postgres://localhost:5432/test-pg-auto-write`, {
    logging: false,
});

//returns the same db
//creates a table for each of the things
    //table has the correct row and allowNull functionality
//tables can be associated properly

describe('defineAndAssociateDB function', () => {

    afterAll( async () => {
        try {
            await testDB.close();
        }
        catch(err) {
            console.log(err)
        }
    })

    let definedDB;

    test('The database begins with no tables', () => {
            expect(Object.keys(testDB.models).length).toBe(0);
    });

    test('The input DB is returned by defineAndAssociateDB', async () => {
        definedDB = defineAndAssociateDB(testDB, testTables);
        expect(definedDB).toBe(testDB)
        await definedDB.sync({force: true});
    });

    test('Creates a table in the database for each table in the tables argument', () => {
        expect(Object.keys(definedDB.models).length).toBe(testTables.tables.length)
        expect(Object.keys(definedDB.models).includes('book')).toBe(true);
    });

    describe('Table creation works properly after calling defineAndAssociateDB', () => {

        test('Unassociated table works properly', async () => {
            let testAuthor = await definedDB.models.author.create({
                name: 'Fake Author'
            })
            expect(testAuthor.name).toBe('Fake Author')
        });
        test('Associated table works properly', async() => {
            let testBook = await definedDB.models.book.create({
                title: 'Fake Book',
                authorId: 1
            })            
            expect(testBook.id).toBe(1);
            expect(testBook.authorId).toBe(1);
        })
        test('AllowNull option works correctly', async() => {
            let err;
            try {
                err = await definedDB.models.book.create({
                    title: null,
                    authorId: 1
                })
            }
            catch(ex) {
                err = ex;
            }
            expect(err.name).toBe('SequelizeValidationError');
            expect(err.message).toBe('notNull Violation: book.title cannot be null')

        })
    });
});