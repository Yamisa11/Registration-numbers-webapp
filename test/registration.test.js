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

    it('should be able to insert registration number value and retrieve it', async () => {
        const result= await registrationDBLogic.getLocationIndicator('CA1555');
       
    
        assert.strictEqual(result, '1');
      });

     

})