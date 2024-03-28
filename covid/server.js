const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");


app.use(express.json());
app.use(cors());

const myPassword = "lq2p0J8h";
const myDatabase = "hadasim01";


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: myPassword,
  database: myDatabase,
});

connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL server: " + err.stack);
      return;
    }
    console.log("Connected to MySQL server");
  });

//helper function used to execute SQL queries 
function sqlConnect(query, values = []) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
        if (err) {
          console.error("Error executing query: " + err.code);
          reject(err);
        }
        resolve(results);
        });
    });
}      

app.get("/", async (req, res) => {
    try {
      const query = "SELECT * FROM members";
      const results = await sqlConnect(query);
      console.log('Data fetched:', results); // Move inside the try block
      res.status(200).json(results);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
      

app.post("/members", async (req, res) => {
    try {
      var { fName, lName, memId, address, phone, cell, vac1, vac2, vac3, vac4, manu1, manu2, manu3, manu4, positive, recovery } = req.body;
      
        address = address ? address : null;
        phone = phone ? phone : null;
        cell = cell ? cell : null;
        vac1 = vac1 ? vac1 : null;
        vac2 = vac2 ? vac2 : null;
        vac3 = vac3 ? vac3 : null;
        vac4 = vac4 ? vac4 : null;
        manu1 = manu1 ? manu1 : null;
        manu2 = manu2 ? manu2 : null;
        manu3 = manu3 ? manu3 : null;
        manu4 = manu4 ? manu4 : null;
        positive = positive ? positive : null;
        recovery = recovery ? recovery : null;

      const query = "INSERT INTO members (fName, lName, memId, address, phone, cell, vac1, vac2, vac3, vac4, manu1, manu2, manu3, manu4, positive, recovery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [fName, lName, memId, address, phone, cell, vac1, vac2, vac3, vac4, manu1, manu2, manu3, manu4, positive, recovery];
      await sqlConnect(query, values);
      res.status(200).json({ message: "Member added successfully" });
    } catch (error) {
      console.error("Error adding member: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/members/:memberId", async (req, res) => {
    try {
      var { fName, lName, address, phone, cell, vac1, vac2, vac3, vac4, manu1, manu2, manu3, manu4, positive, recovery } = req.body;
      const { memberId } = req.params;
        fName = fName ? fName : null;
        lName = lName ? lName : null;
        address = address ? address : null;
        phone = phone ? phone : null;
        cell = cell ? cell : null;
        vac1 = vac1 ? vac1 : null;
        vac2 = vac2 ? vac2 : null;
        vac3 = vac3 ? vac3 : null;
        vac4 = vac4 ? vac4 : null;
        manu1 = manu1 ? manu1 : null;
        manu2 = manu2 ? manu2 : null;
        manu3 = manu3 ? manu3 : null;
        manu4 = manu4 ? manu4 : null;
        positive = positive ? positive : null;
        recovery = recovery ? recovery : null;
      const query = `
        UPDATE members 
        SET fName=?, lName=?, address=?, phone=?, cell=?, vac1=?, vac2=?, vac3=?, vac4=?, manu1=?, manu2=?, manu3=?, manu4=?, positive=?, recovery=?
        WHERE memId=?
      `;
      const values = [fName, lName, address, phone, cell, vac1, vac2, vac3, vac4, manu1, manu2, manu3, manu4, positive, recovery, memberId];
      await sqlConnect(query, values);
      res.status(200).json({ message: "Member updated successfully" });
    } catch (error) {
      console.error("Error updating member: ", error);
      res.status(500).json({ error: "Failed to update member. Please try again later." });
    }
  });
  
  
app.delete("/members/:memberId", async (req, res) => {
    try {
      var { memberId } = req.params;
     
      const query = "DELETE FROM members WHERE memId=?";
      const value = [memberId];
      await sqlConnect(query, value);
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
      console.error("Error deleting member: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
});
 

app.listen(4000, () => {
  console.log("Server is running on port 4000");

});
 