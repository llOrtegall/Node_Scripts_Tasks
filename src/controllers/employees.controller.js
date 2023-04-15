import { pool } from "../db.js";

/* Obtenemos todos los empleados */
export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employe');
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

    const { name, salary } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO employe (name, salary) VALUES (?, ?)', [name, salary]);
        res.send({
            id: rows.insertId,
            name,
            salary,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal' })
    }
};

export const deleteEmployees = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM employe WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not fond'
        })
        res.send(204);
    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal' })
    }
};



export const updateEmployees = async (req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;
    try {
        const [result] = await pool.query('UPDATE employe SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
            [name, salary, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Employee not fond'
        })
        const [rows] = await pool.query('SELECT * FROM employe WHERE  id = ?', [id])
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal' })
    }
};

