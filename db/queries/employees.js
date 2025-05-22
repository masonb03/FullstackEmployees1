import db from "../client.js";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const {
    rows: [employee],
  } = await db.query(
    `INSERT INTO employees (name, birthday, salary)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, birthday, salary]
  );
  return employee;
}

/** @returns all employees */
export async function getEmployees() {
  const { rows } = await db.query(`SELECT * FROM employees`);
  return rows;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const {
    rows: [employee],
  } = await db.query(`SELECT * FROM employees WHERE id = $1`, [id]);
  return employee;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const {
    rows: [employee],
  } = await db.query(
    `UPDATE employees
     SET name = $1, birthday = $2, salary = $3
     WHERE id = $4
     RETURNING *`,
    [name, birthday, salary, id]
  );
  return employee;
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const {
    rows: [employee],
  } = await db.query(`DELETE FROM employees WHERE id = $1 RETURNING *`, [id]);
  return employee;
}
