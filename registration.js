export default function RegistrationNumbers(database) {
  let theRegNumber = "";
  let locIndicator;
  let regex = /[@!#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
  let allRegTowns = ["CA", "CJ", "CL", "CF"];
  let townRegistrations = [];

  function checklocIndicator(theRegNumber) {
    locIndicator = theRegNumber.slice(0, 2);
    return locIndicator.toUpperCase();
  }
  async function errors(theRegNumber, loc) {
    let errMsg = "";
    if (theRegNumber == "") {
      errMsg = "Please enter registration number";
    } else if (allRegTowns.includes(loc) == false) {
      errMsg = "Please enter valid registration";
    } else {
      errMsg = "";
    }
    return errMsg;
  }

  async function setAllRegistrations(theRegNumber) {
    let theRegistrations = await database.getAllRegistrations();
    let loca = theRegNumber.slice(0, 2);
    let loc = loca.toUpperCase();
    let msg = "";

    let theErrors = await errors(theRegNumber, loc);
    if (theErrors == "") {
      if (regex.test(theRegNumber) === false) {
        if (theRegistrations.includes(theRegNumber.toUpperCase()) == false) {
          let here = await database.insertValues(theRegNumber.toUpperCase());
          console.log(here);
        } else {
          msg = "Registration number already exists";
        }
      }
    }
    return msg;
  }

  async function getTownRegistrations(id) {
    townRegistrations = await database.getAllFromTown(id);
    return townRegistrations;
  }

  async function townErrors(id) {
    let msg = "";
    let idReg = await database.getAllFromTown(id);

    if (id) {
      if (idReg.length < 1) {
        msg = "No available registration for this town";
      }
    }

    return msg;
  }

  return {
    checklocIndicator,
    setAllRegistrations,
    getTownRegistrations,
    errors,
    townErrors,
  };
}
