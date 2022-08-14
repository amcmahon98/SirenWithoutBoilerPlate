const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sirenalerting@gmail.com',
      pass: 'urkhzuhbjwkgxjdh'
    }
  });

const db = mysql.createPool({ 
    host: "localhost",
    user: "root",
    password: "Password1!",
    database: "Siren"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})

app.get("/api/getAlerts", (req,res) => {
    let status = req.query.status;
    let sqlquery = "";
    let validStatus = true;
    switch (status) {
        case "open":
            sqlquery = "SELECT * FROM alert where status!='Resolved'";
            break;
        case "triggered":
            sqlquery = "SELECT * FROM alert where status='Triggered'";
            break;
        case "acknowledged":
            sqlquery = "SELECT * FROM alert where status='Acknowledged'";
            break;
        case "resolved":
            sqlquery = "SELECT * FROM alert where status='Resolved'";
            break;   
        case "all":
            sqlquery = "SELECT * FROM alert";
            break;
        default:
            validStatus=false;
    }
    if (validStatus) {
        db.query(sqlquery, (error, result) => {
            console.log("error", error);
            console.log("result", result);
            res.send(result);
        })
    }
    else {
        res.send("Invalid Query String");
    }
    
})


app.get("/api/getMaintenance", (req,res) => {
    let status = req.query.status;
    let sqlquery = "";
    switch (status) {
        case "active":
            sqlquery = "SELECT * FROM maintenance where starttime <= CURRENT_TIMESTAMP and endtime >= CURRENT_TIMESTAMP";
            break;
        case "future":
            sqlquery = "SELECT * FROM maintenance where starttime > CURRENT_TIMESTAMP";
            break;
        case "previous":
            sqlquery = "SELECT * FROM maintenance where endtime < CURRENT_TIMESTAMP";
            break;
        case "all":
            sqlquery = "SELECT * FROM maintenance";
            break;
    }
    db.query(sqlquery, (error, result) => {
            console.log("error", error);
            res.send(result);
        })
    
})

app.get("/api/getAlertReporting", (req,res) => {
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;
    let sqlquery = "select * from alert where creationtime >= ? and creationtime <= ?";
    db.query(sqlquery, [starttime, endtime], (error, result) => {
            console.log("error", error);
            res.send(result);
        })
    
})

app.get("/api/getMaintenanceReporting", (req,res) => {
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;
    let sqlquery = "select * from maintenance where starttime >= ? and endtime <= ?";
    db.query(sqlquery, [starttime, endtime], (error, result) => {
            console.log("error", error);
            res.send(result);
        })
    
})


app.get("/api/getSchedule", (req,res) => {
    let sqlquery = "select * from schedule";
    db.query(sqlquery, (error, result) => {
            console.log("error", error);
            res.send(result);
        })
    
})

app.post("/api/createSchedule", (req) => {
    const {user, tier, starttime, endtime} = req.body;
    const sqlquery = "INSERT INTO schedule (user, tier, starttime, endtime) VALUES (?,?,?,?)";
    db.query(sqlquery, [user, tier, starttime, endtime], (error) => {
        if(error) {
            console.log(error);
        }
    })
})

app.post("/api/createMaintenance", (req) => {
    const {reason, starttime, endtime} = req.body;
    const sqlquery = "INSERT INTO maintenance (reason, starttime, endtime) VALUES (?,?,?)";
    db.query(sqlquery, [reason, starttime, endtime], (error) => {
        if(error) {
            console.log(error);
        }
    })
})

app.post("/api/updateMaintenance", (req) => {
    const {id} = req.body;
    const sqlquery = "UPDATE maintenance SET endtime=CURRENT_TIME WHERE id=?";
    db.query(sqlquery, id, (error, result) => {
        if(error) {
            console.log(error);
        }
    })
})

app.delete("/api/delete/maintenance/:id", (req) => {
    const {id} = req.params;
    const sqlquery = "DELETE FROM maintenance WHERE id=?";
    db.query(sqlquery, id, (error) => {
        if(error) {
            console.log(error);
        }
    })
})

app.get("/api/getAlert/:id", (req,res) => {
    const {id} = req.params;
    const sqlquery = "SELECT * FROM alert WHERE id=?";
    db.query(sqlquery, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    })
})

app.post("/api/updateStatus", (req) => {
    const {id, updatedStatus} = req.body;
    const sqlquery = "UPDATE alert SET status=? WHERE id=?";
    db.query(sqlquery, [updatedStatus,id], (error, result) => {
        if(error) {
            console.log(error);
        }
    })
})

app.post("/api/createAlert", (req,res) => {
    const {subject, description, priority, triggeredby} = req.body;
    const createAlertQuery = "INSERT INTO alert (subject,description,priority,status,creationtime,assigned, triggeredby) VALUES (?,?,?,'Triggered',CURRENT_TIMESTAMP,?,?)";
    getPrimaryOnCall = "select * from schedule where CURRENT_TIMESTAMP >= starttime and CURRENT_TIMESTAMP <= endtime and tier='Primary'"
    getMaintenanceQuery = "SELECT * FROM maintenance where starttime <= CURRENT_TIMESTAMP and endtime >= CURRENT_TIMESTAMP";
    db.query(getMaintenanceQuery, (error, result) => {
        if(error) {
            console.log(error)
        }
        else if (result.length > 0){
            res.send("Active maintenance window - Alert not created");
        }
        else {
            db.query(getPrimaryOnCall, (error, result) => {
                if(error) {
                    console.log(error)
                }
                else {
                    db.query(createAlertQuery, [subject,description,priority,result[0].user,triggeredby], (error, res) => {
                        if(error) {
                            console.log(error);
                        }
                        else {
                            if (priority == "High") {
                                triggerAlert(result[0].user,subject,description);
                                setTimeout(() => {
                                    checkHighPriorityAlert(res.insertId);
                                  }, "60000")
                            }
                        }
                    })
                }
            })
        }
    })
})

app.post("/api/createAccount", (req,res) => {
    const {email, name, contactnumber, password} = req.body;
    const sqlquery = "INSERT INTO user (email,name,contactno,password) VALUES (?,?,?,?)";
    const passwordHash = bcrypt.hashSync(password, 10);
    db.query(sqlquery, [email,name,contactnumber,passwordHash], (error) => {
        if(error) {
            if(error.errno == 1062) {
                res.status(409).send('User Exists');
            }
        }
        
    })
})

app.post("/api/updatePassword", (req) => {
    const {email, password} = req.body;
    const sqlquery = "Update user SET password=? where email=?";
    const passwordHash = bcrypt.hashSync(password, 10);
    db.query(sqlquery, [passwordHash,email], (error) => {
        if(error) {
            console.log(error);
        }
    })
})

app.post("/api/login", (req, res) => {
    const {email, password} = req.body;
    const sqlquery = "select * from user where email=?";
    db.query(sqlquery, [email], (error, result) => {
        if (result.length == 0){
            res.status(404).send('User Not Found');
        }
        else {
            if(bcrypt.compareSync(password,result[0].password)){
                res.status(200).send(result)
            }
            else {
                res.status(401).send('Invalid Password')
            }
        }
    })
})

app.get("/api/getAccount", (req,res) => {
    let id = req.query.user;
    let sqlquery = "SELECT * FROM user where id=?";
        db.query(sqlquery, [id], (error, result) => {
            console.log("error", error);
            console.log("result", result);
            res.send(result);
        })
})

app.post("/api/updateAccount", (req) => {
    const {id,email, name, contactno} = req.body;
    const sqlquery = "UPDATE user SET email=?, name=?, contactno=? where id=?";
    db.query(sqlquery, [email,name,contactno,id], (error) => {
        if(error) {
            console.log(error);
        }
    })
})

function triggerAlert(email,subject,description) {
    var mailOptions = {
        from: 'sirenalerting@gmail.com',
        to: email,
        subject: subject,
        text: description
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

function checkHighPriorityAlert(id) {
    getSecondaryOnCall = "select * from schedule where CURRENT_TIMESTAMP >= starttime and CURRENT_TIMESTAMP <= endtime and tier='Secondary'"
    getTriggeredAlert = "select * from alert where id = ? and status='Triggered'"
    db.query(getTriggeredAlert, [id], (error,result) => {
        if(error) {
            console.log(error);
        }
        else {
            if(result.length>0) {
                db.query(getSecondaryOnCall, (error,res) => {
                    if(error) {
                        console.log(error);
                    }
                    else {
                        triggerAlert(res[0].user,result[0].subject,result[0].description)
                    }
                })
            }
        }
    })
}