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
        await registrationDBLogic.insertValues('CY15762')
        await registrationDBLogic.insertValues('CY69965')
        
    
        const result = await registrationDBLogic.getAll();
        assert.deepEqual(result, [{row: '(CY15762,)'} , {row: '(CY69965,)'}]);
      });

    it('should be able to check for the location of the registration and return its id', async () => {
        const result= await registrationDBLogic.getLocationIndicator('CA1555');
       
        assert.deepStrictEqual(result,[{id:1}] );
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
      it('should be able to set and get registration number that contains a hyphen', async () => {
        await registrationDBLogic.insertValues('CJ125-597');
    
        const result = await registrationDBLogic.getAllRegistrations();
        assert.strictEqual(result[0], 'CJ125-597');
      });

   

      it('should be able to delete the registration numbers from thhe registration table', async () => {
        await registrationDBLogic.insertValues('CJ15762');
        await registrationDBLogic.insertValues('CY15762')
        await registrationDBLogic.insertValues('EC15762')
    
        const result = await registrationDBLogic.reset();
        assert.deepStrictEqual(result, null);
      });
      it('should return error message "Please enter registration number" when no registration is provided', async () => {
        await registrationDBLogic.insertValues('');
    
        const result = await registrationDBLogic.getAllRegistrations();
        assert.strictEqual('Please enter registration number', 'Please enter registration number');
      });
      it('should return error message "Please enter valid registration" when invalid registration is entered', async () => {
        await registrationDBLogic.insertValues('CA#$@$#25');
    
        const result = await registrationDBLogic.getAllRegistrations();
        assert.strictEqual('Please enter valid registration', 'Please enter valid registration');
      });
      it('should return error message "Please enter valid registration" when registration entered is not CA,EC,GP or CJ', async () => {
        await registrationDBLogic.insertValues('CL1254865');
    
        const result = await registrationDBLogic.getAllRegistrations();
        assert.strictEqual('Please enter valid registration', 'Please enter valid registration');
      });
      
})