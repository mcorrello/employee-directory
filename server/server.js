var express = require("express")
const sqlite3 = require("sqlite3").verbose()
const bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var HTTP_PORT = 8000

// const database = path.join(__dirname, "database", "apptest.db");
const db = new sqlite3.Database('./database/employee_directory.db', err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful connection to the database 'employee_directory.db'");
  });

db.run(`CREATE TABLE IF NOT EXISTS employee_directory(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    title TEXT,
    department TEXT,
    location TEXT,
    imageUrl TEXT
)`, err => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Successful creation of employee_directory table')

    // Setting the ID isn't necessary, but prevents these rows from re-inserting each time if they already exist
    db.run(`INSERT OR IGNORE INTO employee_directory(id, name, title, department, location, imageUrl) VALUES
    (1, 'Jane Austen', 'Technical Lead', 'Marketing', 'Florida', null),
    (2, 'Elizabeth Bennet', 'Software Engineer', 'Marketing', 'Florida', null)
    `, err => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Successful insert of test rows')
    });
});




app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


// Setup endpoints
app.get("/api/employees", (req, res) => {
    console.log("Hitting get all employees endpoint")

    db.all(`SELECT * FROM employee_directory`, (err, rows) => {
        if (err) {
            console.error(err.message)
            res.status(500).json({'error': res.message})
            return;
        }
        console.log(rows)
        res.status(200).json(rows)
    })
});

app.post("/api/employees", (req, res) => {
    console.log("Hitting insert new employee endpoint")
    var request = req.body
    db.run('INSERT INTO employee_directory(name, title, department, location, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
    [request.name, request.title, request.department, request.location, request.imageUrl],
    (err, result) => {
        console.log(err)
        if (err) {
            console.error(err.message)
            res.status(500).json({'error': res.message})
            return;
        }
        res.status(201).json({"message": "Successful insertion"})
    })
})

app.post('/api/employees/:employeeId', (req, res) => {
    console.log("Hitting update employee endpoint")
    var employeeId = req.params.employeeId
    var request = req.body
    db.run(`UPDATE employee_directory 
        SET name = (?), 
            title = (?),
            department = (?),
            location = (?)
            imageUrl = (?)
        WHERE id = (?)`,
    [request.name, request.title, request.department, request.location, request.imageUrl, employeeId],
    (err) => {
        if (err) {
            console.error(err.message)
            res.status(500).json({'error': res.message})
        }
        res.status(201).json({"message": "Successful insertion"})
    })
})