import assert from "assert"
import RegistrationDBLogic from "../database/dbLogic.js";
import pgPromise from 'pg-promise';

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/registrations';

const db = pgPromise()(connectionString);


describe('Registration Numbers App database tests', () => {
    let registrationDBLogic = RegistrationDBLogic(db)

    beforeEach(async () => {
        await registrationDBLogic.reset()
    })

    it('should be able to insert and get all the registrations from the registration table as objects', async () => {
        await registrationDBLogic.insertValues('CJ15762');
        await registrationDBLogic.insertValues('CY15762')
        await registrationDBLogic.insertValues('EC15762')
    
        const result = await registrationDBLogic.getAll();
        assert.deepEqual(result, [{row:'(CJ15762,)'},{row: '(CY15762,)'} , {row: '(EC15762,)'}]);
      });

    it('should be able to check for the location of the registration and return its id', async () => {
        const result= await registrationDBLogic.getLocationIndicator('CA1555');
       
        assert.strictEqual(result, 1);
      });

      it('should be able to insert registration number value and retrieve it', async () => {
        await registrationDBLogic.insertValues('CJ15762');
    
        const result = await registrationDBLogic.getAllRegistrations();
        assert.strictEqual(result[0], 'CJ15762');
      });

      it('should be able to insert multiple registration numbers and retrieve them', async () => {
        await registrationDBLogic.insertValues('CJ15762');
        await registrationDBLogic.insertValues('CY15762')
        await registrationDBLogic.insertValues('EC15762')
    
        const result = await registrationDBLogic.getAllRegistrations();
        assert.deepStrictEqual(result, ['CJ15762', 'CY15762', 'EC15762']);
      });

     
      it('should be able to get the town id from of a selected town from the database', async () => {
        await registrationDBLogic.insertValues('CJ15762');
        await registrationDBLogic.insertValues('CY15762')
        await registrationDBLogic.insertValues('EC15762')
        await registrationDBLogic.insertValues('CA15762');
        await registrationDBLogic.insertValues('CA22589')
    
        const result = await registrationDBLogic.getAllFromTown(1)
        assert.deepStrictEqual(result, ['CA15762', 'CA22589'])
      }); 

      it('should be able to delete the registration numbers from thhe registration table', async () => {
        await registrationDBLogic.insertValues('CJ15762');
        await registrationDBLogic.insertValues('CY15762')
        await registrationDBLogic.insertValues('EC15762')
    
        const result = await registrationDBLogic.reset();
        assert.deepStrictEqual(result, null);
      });
})