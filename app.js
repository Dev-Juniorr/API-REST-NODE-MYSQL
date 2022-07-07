const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

// Conexion a la base de datos!
const conex = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "API",
});

//Routes
app.get("", (req, res) => {
  res.send("Welcome to my API");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  conex.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("Not results");
    }
  });
});

app.get("/user/:id", (req, res) => {
  const {id} = req.params;

  const sql = `SELECT * FROM users WHERE id = ${id}`;

  conex.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("Not results");
    }
  });
});

app.post("/add", (req, res) => {
  const sql = 'INSERT INTO users SET ?';

  const userObj = {
    name: req.body.name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }


  conex.query(sql, userObj, err => {
    if (err) throw err;
    res.send('User Created!');
  });
});

app.put("/update/:id", (req, res) => {
  const {id} = req.params;

  const {name, last_name, email, password} = req.body;
  const sql = `UPDATE users SET name = '${name}', last_name = '${last_name}', email = '${email}', password = '${password}' WHERE id = '${id}'`;

  conex.query(sql, err => {
    if (err) throw err;
    res.send('User Update!');
  });

});

app.delete("/delete/:id", (req, res) => {
  const {id} = req.params;

  const sql = `DELETE FROM users WHERE id = '${id}'`;

  conex.query(sql, err => {
    if (err) throw err;
    res.send('User Delete!');
  });
});

// conex.connect((error) => {
//   if (error) throw error;
//   console.log("Servidor Conectado!");
// });

app.listen(PORT, () => console.log(`Servidor conectado ${PORT}`));
