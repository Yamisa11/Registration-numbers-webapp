import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import registration from "./registration.js";
import flash from "express-flash";
import session from "express-session";
import DBJS from "./database.js";
import RegistrationDBLogic from "./database/dbLogic.js";

const app = express();
let database = RegistrationDBLogic(DBJS);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Yamisa",
  })
);
app.use(flash());

let theRegistrations = await database.getAllRegistrations();
console.log(theRegistrations);
let registrationFunction = registration();
let registrationArray = await database.getAll();
let errors;

app.get("/", (req, res) => {
  let resetMsg = req.flash("resetMsg");
  let errorMsg = req.flash("error");
  res.render("index", {
    theRegistration: registrationArray,
    theError: errorMsg,
    resetMessage: resetMsg,
  });
});

app.post("/registration", async (req, res) => {
  // let register = registrationFunction.setRegistration(req.body.regNo);
  // console.log(register);
  let loc = registrationFunction.checklocIndicator(req.body.regNo);
  // console.log(loc);
  await registrationFunction.setAllRegistrations(req.body.regNo, database);
  // let theId = await database.getLocationIndicator(register);
  // console.log(theId);
  registrationArray = await database.getAll();
  // await registrationFunction.setAllRegistrations(register, database);

  errors = await registrationFunction.errors(req.body.regNo, loc, database);
  // console.log(errors);
  req.flash("error", errors);
  res.redirect("/");
});

app.post("/selected", async (req, res) => {
  let town_id = req.body.towns;
  console.log(town_id);
  registrationArray = await registrationFunction.getTownRegistrations(
    town_id,
    database
  );
  console.log(registrationArray);
  res.redirect("/");
});

app.post("/reset", async (req, res) => {
  await database.reset();
  req.flash("resetMsg", "Successfully cleared database!");
  registrationArray = [];
  res.redirect("/");
});

let PORT = process.env.PORT || 2020;
app.listen(PORT, () => {
  console.log("App started...", PORT);
});
