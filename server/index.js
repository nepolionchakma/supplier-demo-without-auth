const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const database = require("./services/database");
app.use(express.json());
// Use the CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's URL
  })
);
// app.use(
//   cors({
//     origin: "*", // all origin
//      methods: ["GET", "POST", "DELETE"],
//     credentials: true,
//   })
// );
app.get("/", (req, res) => {
  res.send("server Testing 3000 port");
});

app.use(require("./routes/departmentsRoute"));
app.use(require("./routes/employeesRoute"));
app.use(require("./routes/employeeStateRoute"));
app.use(require("./routes/messagesRoute"));
app.use(require("./routes/usersRoute"));

//

app.listen(port, () => console.log(`server start on port ${port}`));

// --------------------------------------------
//
// const emailData = [
//   { name: "Nepolion Chakma", email: "nepolionchakma.nc.lord@gmail.com" },
//   { name: "Jyanial Dewan", email: "djyanial@gmail.com" },
//   { name: "Dipon Chakma", email: "diponchakma@gmail.com" },
//   { name: "Alpona Chakma", email: "alpona1@yahoo.com" },
//   { name: "Nipon Chakma", email: "niponchakma22@yahoo.com" },
//   // Add more email data as needed
// ];

// app.get("/search", async (req, res) => {
//   const query = req.query.q.toLowerCase();
//   const usersResult = await database.client.query(`
//       SELECT * FROM test.users
//       `);
//   console.log(usersResult.rows, "user....");
//   const results = usersResult?.rows.filter(
//     (email) =>
//       email.user_name.toLowerCase().includes(query) ||
//       email.email.toLowerCase().includes(query)
//   );
//   res.json(results);
// });
// // ------------------------------
