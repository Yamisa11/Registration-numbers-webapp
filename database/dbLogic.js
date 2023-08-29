export default function RegistrationDBLogic(database){


    async function getAll() {
        const result = await database.any('SELECT * FROM registration_table')
        return result;
    }

    async function getLocationIndicator(regNumber) {
        let locIndicator = regNumber.slice(0, 2)
        const result = await database.one('SELECT id FROM towns_table WHERE towns = $1', [locIndicator])
        return result.id;
    }

    async function insertValues(regNumber) {
        let theId = await getLocationIndicator(regNumber)
        await database.any('INSERT INTO registration_table (registrations, town_id) VALUES ($1, $2)', [regNumber, theId])
    }

    return{
        getAll,
        insertValues,
        getLocationIndicator
    }
}