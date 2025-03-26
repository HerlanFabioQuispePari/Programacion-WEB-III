const mysql = require('mysql2/promise');

async function conectar() {
    console.time("Tiempo de ejecución");
    try {
        const conexion = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'empresa'
        });

        console.log('Conexión exitosa con Promesas');

        const promesas = [];
        for (let i = 0; i < 100; i++) {
            promesas.push(conexion.execute('SELECT * FROM empleados'));
        }

        await Promise.all(promesas);

        await conexion.end(); // Cerrar conexión
        console.timeEnd("Tiempo de ejecución");
    } catch (error) {
        console.error('Error de conexión:', error);
    }
}

conectar();
