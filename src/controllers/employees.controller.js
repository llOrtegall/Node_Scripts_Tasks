import { pool } from "../db.js";

/* Obtenemos todos los empleados */
export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal' })
    }
};

/* Obtenemos empleado enviandole en id */
export const getEmployee = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employe WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Employee not fond'
        })
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal' })
    }
}

/* Para crear los empleados */
export const createEmployees = async (req, res) => {

    const { name, lastName, email, rolUser } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO employee (name, lastName, email, rolUser) VALUES (?, ?, ?, ?)', [name, lastName, email, rolUser]);
        res.send({
            id: rows.insertId,
            name,
            lastName,
            email,
            rolUser,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal' })
    }
};

/* Para Borrar los empleados */
export const deleteEmployees = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not fond'
        })
        res.send(204);
    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal' })
    }
};

/* Para Actualizar los empleados */
export const updateEmployees = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, rolUser } = req.body;
    try {
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), lastName = IFNULL(?, lastName), email = IFNULL(?, email), rolUser = IFNULL(?, rolUser) WHERE id = ?',
            [name, lastName, email, rolUser, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' })
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

