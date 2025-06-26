const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const dbs = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"finaldb"
})

app.get("/", (req, res)=>{
    const sql = "SELECT * FROM featuredata";
    dbs.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})



app.post('/create', (req, res) => {
    const sql = "INSERT INTO featuredata (`name`, `status`, `creator`, `start`, `starttime`, `startzone`, `end`, `endtime`, `endzone`, `prod`, `test`, `dev`, `descp`) VALUES(?)";
    const values = [req.body.name, req.body.status, req.body.creator, req.body.start, req.body.starttime, req.body.startzone,  req.body.end, req.body.endtime, req.body.endzone, req.body.prod, req.body.test, req.body.dev, req.body.descp];

    dbs.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})




app.get('/feature/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM featuredata WHERE `id` = ?";
    dbs.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            return res.json(data[0]); // Return the first (and only) matching row
        } else {
            return res.json({ message: "Feature not found" });
        }
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE featuredata SET `name` = ?, `status` = ?, `creator` = ?, `start` = ?, `starttime` = ?, `startzone` = ?, `end` = ?, `endtime` = ?, `endzone` = ?, `prod` = ?, `test` = ?, `dev` = ? , `descp`=? WHERE `id` = ?";
    const values = [req.body.name, req.body.status, req.body.creator, req.body.start, req.body.starttime, req.body.startzone,  req.body.end, req.body.endtime, req.body.endzone, req.body.prod, req.body.test, req.body.dev, req.body.descp];

    const id = req.params.id;

    dbs.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/feature/:id', (req, res)=> {
    const sql = "SELECT * FROM featuredata where id=?";
    const id = req.params.id;
    dbs.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }
  
  // /poll endpoint
  app.get("/poll", (req, res)=>{
    const sql = "SELECT name, status, start, end FROM featuredata WHERE status = 'Active' AND DATE(start) <= CURDATE() AND (end IS NULL OR end = '' OR DATE(end) >= CURDATE())";
    dbs.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
  


app.listen(8080,() =>{
    console.log("listening");
})