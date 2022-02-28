const express = require("express");
const path = require("path");
const controller = require("./controller");
// import sequelize connection
const sequelize = require("./config/connection");

const exphbs = require("express-handlebars");

const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 3001;
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//sets the path to static so I just have to use js/signup instead of public/js/signup
app.use(express.static(path.join(__dirname, "public")));

app.use(controller);

// // sync sequelize models to the database, then turn on the server
// //sequelize.sync({ force: true }).then(() => {
// app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
// //});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
