var express = require("express")
const sqlite3 = require("sqlite3").verbose()
const bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var HTTP_PORT = 8000

/* 
 * Setup sqlite3 as local in-memory database, and seed test data
 */ 
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
    (1, 'Marianne Dashwood', 'Technical Lead', 'Marketing', 'Dallas, Texas', 'https://randomuser.me/api/portraits/women/62.jpg'),
    (2, 'George Wickham', 'Software Engineer', 'Marketing', 'Wilmington, Delaware', 'https://randomuser.me/api/portraits/men/33.jpg'),
    (3, 'Mary Crawford', 'Software Engineer', 'Marketing', 'Chicago, Illinois', 'https://randomuser.me/api/portraits/women/39.jpg'),
    (4, 'Henry Tilney', 'Test Engineer', 'Marketing', 'Chicago, Illinois', 'https://randomuser.me/api/portraits/men/54.jpg'),
    (5, 'Frank Churchill', 'Software Engineer', 'Finance', 'Wilmington, Delaware', 'https://randomuser.me/api/portraits/men/87.jpg'),
    (6, 'William Elliot', 'Software Engineer', 'Finance', 'Dallas, Texas', 'https://randomuser.me/api/portraits/men/91.jpg'),
    (7, 'Georgiana Darcy', 'Product Owner', 'Finance', 'Houston, Texas', 'https://randomuser.me/api/portraits/women/51.jpg'),
    (8, 'Maria Bertram', 'Technical Lead', 'Operations', 'Houston, Texas', 'https://randomuser.me/api/portraits/women/44.jpg'),
    (9, 'Robert Martin', 'Test Engineer', 'Operations', 'Wilmington, Delaware', 'https://randomuser.me/api/portraits/men/81.jpg'),
    (10, 'Catherine Morland', 'Software Engineer', 'Operations', 'Chicago, Illinois', 'https://randomuser.me/api/portraits/women/89.jpg')
    `, err => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Successful insert of test rows')
    });
});


/* 
 * Run application and setup API endpoints
 */ 
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


// Setup endpoints
app.get("/api/employees", (req, res) => {
    console.log("Get all employees")

    db.all(`SELECT * FROM employee_directory`, (err, rows) => {
        if (err) {
            console.error(err.message)
            res.status(500).json({'success': false, 'error': res.message})
            return;
        }
        console.log(rows)
        res.status(200).json(rows)
    })
});

app.post("/api/employees", (req, res) => {
    console.log("Inserting new employee")
    var request = req.body
    db.run('INSERT INTO employee_directory(name, title, department, location, imageUrl) VALUES (?, ?, ?, ?, ?)',
    [request.name, request.title, request.department, request.location, request.imageUrl],
    (err, result) => {
        if (err) {
            console.error(err.message)
            res.status(500).json({'success': false, 'error': res.message})
            return;
        }
        res.status(201).json({'success': true, 'message': "Successful insertion"})
    })
})

app.post('/api/employees/:employeeId', (req, res) => {
    console.log("Updating employee id: " + req.params.employeeId)
    var request = req.body
    db.run(`UPDATE employee_directory 
        SET name = (?), 
            title = (?),
            department = (?),
            location = (?),
            imageUrl = (?)
        WHERE id = (?)`,
    [request.name, request.title, request.department, request.location, request.imageUrl, request.id],
    (err) => {
        if (err) {
            console.error(err.message)
            res.status(500).json({'success': false, 'error': res.message})
        }
        res.status(201).json({'success': true, 'message': "Successful insertion"})
    })
})

app.delete('/api/employees/:employeeId', (req, res) => {
    console.log("Deleting employee id: " + req.params.employeeId)
    db.run(`DELETE FROM employee_directory WHERE id = (?)`,
    [req.params.employeeId],
    (err) => {
        if (err) {
            console.error(err.message)
            res.status(500).json({'success': false, 'error': res.message})
        }
        res.status(201).json({'success': true, 'message': "Successful deletion"})
    })
})