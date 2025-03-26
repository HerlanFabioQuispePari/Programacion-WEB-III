const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empresa'
});

console.time("Tiempo de ejecución");

conexion.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conexión exitosa');

    let consultasPendientes = 100;
    for (let i = 0; i < 100; i++) {
        conexion.query('SELECT * FROM empleados', (error, resultados) => {
            if (error) throw error;
            if (--consultasPendientes === 0) {
                conexion.end(); // Cerrar conexión cuando termine todo
                console.timeEnd("Tiempo de ejecución");
            }
        });
    }
});
