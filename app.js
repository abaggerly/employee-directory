import express from "express";
import employees from "./db/employees.js";
const app = express();
export default app;

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.route("/employees").get((req, res) => {
  res.send(employees);
});

let lastRandomEmployee = null; 
app.route("/employees/random").get((req, res) => {
  if (!employees) {
    return res.status(200).send("Employee Not found");
  }
  let randomEmployee;
  do {
  randomEmployee = employees[Math.floor(Math.random() * employees.length)];
  } while (randomEmployee === lastRandomEmployee);

  lastRandomEmployee = randomEmployee;

  res.send(randomEmployee);
});

app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;
  const employee = employees.find((element) => element.id === +id);
  if (!employee) {
    return res.status(404).send(`Employee with ID ${id} Not found in Database`);
  }
  res.send(employee);
});
