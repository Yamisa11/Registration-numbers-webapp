import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import registration from "./registration.js";
import flash from "express-flash";
import session from "express-session";
import DBJS from "./database.js";
import RegistrationDBLogic from "./database/dbLogic.js";

const app = express();
let database = RegistrationDBLogic(DBJS)

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

let registrationFunction = registration();
let registrationArray;
let townArray
let errors;

app.get("/", (req, res) => {
  let errorMsg = req.flash("error")[0];
  res.render("index", {
    theRegistration: registrationArray,
    theError: errorMsg,
    });
});

app.post("/registration", async (req, res) => {
  let register = registrationFunction.setRegistration(req.body.regNo);
  console.log(register);
  let loc = registrationFunction.checklocIndicator(register);
  console.log(loc);
  registrationFunction.setAllRegistrations(register,database);
  // console.log(registrationArray);
  registrationArray = await database.getAll()
  console.log(registrationArray);
  errors = registrationFunction.errors(register);
  req.flash("error", errors);
  res.redirect("/");
});

app.post("/selected", async (req,res) => {
  let town_id = parseInt(req.body.towns)
  console.log(town_id);
  registrationArray = await registrationFunction.getTownRegistrations(town_id,database)
  console.log(registrationArray);
  res.redirect('/')
})

let PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log("App started...", PORT);
});
