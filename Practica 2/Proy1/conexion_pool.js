const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empresa',
    waitForConnections: true,
    connectionLimit: 10, // Más conexiones simultáneas
    queueLimit: 0
});

async function obtenerEmpleados() {
    console.time("Tiempo de ejecución");

    try {
        const promesas = [];
        for (let i = 0; i < 100; i++) {
            promesas.push(pool.query('SELECT * FROM empleados'));
        }

        await Promise.all(promesas);

        console.timeEnd("Tiempo de ejecución");
    } catch (error) {
        console.error('Error al obtener empleados:', error);
    }
}

obtenerEmpleados();
