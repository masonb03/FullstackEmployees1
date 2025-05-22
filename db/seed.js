import db from "./client.js";
import { createEmployee } from "./queries/employees.js";


const employees = [
  { name: "Alice Smith", birthday: "1990-01-01", salary: 60000 },
  { name: "Bob Jones", birthday: "1985-05-23", salary: 75000 },
  { name: "Charlie Brown", birthday: "1992-07-15", salary: 55000 },
  { name: "Diana Prince", birthday: "1988-11-30", salary: 80000 },
  { name: "Ethan Hunt", birthday: "1979-09-12", salary: 90000 },
  { name: "Fiona Gallagher", birthday: "1995-03-25", salary: 62000 },
  { name: "George Martin", birthday: "1982-05-04", salary: 73000 },
  { name: "Hannah Baker", birthday: "1991-12-10", salary: 58000 },
  { name: "Ian Curtis", birthday: "1987-08-08", salary: 67000 },
  { name: "Jane Doe", birthday: "1993-06-21", salary: 71000 },
];

async function seedEmployees() {
  for (const emp of employees) {
    await createEmployee(emp);
  }
}

async function runSeed() {
  try {
    await db.connect();
    await db.query("DELETE FROM employees");
    await seedEmployees();
    console.log("Database seeded.");
  } catch (err) {
    console.error("Error seeding:", err);
  } finally {
    await db.end();
  }
}

runSeed();
