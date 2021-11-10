import mysql from 'mysql';

const connection = mysql.createPool({
    host: 'remotemysql.com',
    user: '841ZEBGTq7',
    password: 'h8utPlWg1H',
    database: '841ZEBGTq7'
});

function handleDisconnect() {
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}



export const db = {
    connect: () => connection.getConnection(err => { console.log('error in connection', err); setTimeout(handleDisconnect, 2000) }),
    query: (querystring, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(querystring, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({ results, fields })
            });
        }),
    end: () => connection.end(),
    handleDisconnect: () => handleDisconnect()
}