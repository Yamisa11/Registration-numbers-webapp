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

let registrationArray = await database.getAllRegistrations();

let registrationFunction = registration(database)
let errors;
let tError;
let newRegError

app.get("/", (req, res) => {
  let resetMsg = req.flash("resetMsg");
  let errorMsg = req.flash("error");
  let townError = req.flash("townError");
  let newRegError = req.flash("newRegError")
  res.render("index", {
    theRegistration: registrationArray,
    theError: errorMsg,
    resetMessage: resetMsg,
    theTownError: townError,
    regError: newRegError
  });
});

app.post("/registration", async (req, res) => {
  let loc = registrationFunction.checklocIndicator(req.body.regNo);

 newRegError = await registrationFunction.setAllRegistrations(req.body.regNo);
  registrationArray = await database.getAllRegistrations();
  errors = await registrationFunction.errors(req.body.regNo, loc);

  req.flash("error", errors);
  req.flash("newRegError",newRegError)
  res.redirect("/");
});

app.post("/selected", async (req, res) => {
  let town_id = req.body.towns;

  registrationArray = await registrationFunction.getTownRegistrations(
    town_id
  );
  tError = await registrationFunction.townErrors(town_id);
  req.flash("townError", tError);
  res.redirect("/");
});

app.post("/all", async (req, res) => {
  registrationArray = await database.getAllRegistrations();
  res.redirect("/");
});

app.post("/reset", async (req, res) => {
  await database.reset();
  req.flash("resetMsg", "Successfully cleared database!");
  registrationArray = [];
  res.redirect("/");
});

let PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log("App started...", PORT);
});
