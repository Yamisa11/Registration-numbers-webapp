export default function RegistrationDBLogic(database){


    async function getAll() {
        const result = await database.any('SELECT * FROM registration_table')
        return result;
    }

    async function getLocationIndicator(regNumber) {
        let locIndicator = regNumber.slice(0, 2)
        locIndicator = locIndicator.toUpperCase()
        try {
            const result = await database.one('SELECT id FROM towns_table WHERE towns = $1', [locIndicator])
        return result.id;
        } catch (error) {
            console.error('error', error)
        }
    }

    async function insertValues(regNumber) {
        let theId = await getLocationIndicator(regNumber)
       try {
        await database.any('INSERT INTO registration_table (registrations, town_id) VALUES ($1, $2)', [regNumber, theId])
       } catch (error) {
        console.error('Error inserting registration data:', error)
       }
    }

    async function getAllFromTown(theId){
        let theRegistrations = []
        let result = await database.any('SELECT registrations FROM registration_table WHERE town_id = $1', [theId])
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            theRegistrations.push(element.registrations)
        }
        return theRegistrations
    }

    async function getAllRegistrations(){
        let theRegistrations = []
        let result = await database.any('SELECT registrations FROM registration_table')
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            theRegistrations.push(element.registrations)
        }
        return theRegistrations;
    }

    async function reset(){
       let result = await database.any('DELETE FROM registration_table')   
       return result
    }

    return{
        getAll,
        insertValues,
        getLocationIndicator,
        getAllFromTown,
        getAllRegistrations,
        reset
    }
}