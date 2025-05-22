import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

const router = express.Router();

// GET all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// POST create employee
router.post("/", async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Missing request body" });
  }

  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});


// GET employee by id
router.get("/:id", async (req, res, next) => {
  try {
    const {id} = req.params
    Number(id)
    console.log(id)
    if(0>id){
        return res.status(400).send("Number was negative")
    }
    const employee = await getEmployee(req.validatedId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// DELETE employee by id
router.delete("/:id", async (req, res, next) => {
  try {
    const {id} = req.params
    Number(id)
    console.log(id)
    if(0>id){
        return res.status(400).send("Number was negative")
    }
    const employee = await getEmployee(req.validatedId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT update employee by id
router.put("/:id", async (req, res, next) => {
    const {id} = req.params
    Number(id)
    console.log(id)
    if(0>id){
        return res.status(400).send("Number was negative")
    }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Missing request body" });
  }

  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existing = await getEmployee(req.validatedId);
    if (!existing) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const updated = await updateEmployee( {id:req.validatedId, name, birthday, salary });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
