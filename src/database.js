import mysql from 'mysql';

const connection = mysql.createPool({
    host: 'remotemysql.com',
    user: '841ZEBGTq7',
    password: 'h8utPlWg1H',
    database: '841ZEBGTq7'
});

export const db = {
    connect: () => connection.getConnection(err=>{console.log('error in connection',err)}),
    query: (querystring, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(querystring, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({ results, fields })
            });
        }),
    end: () => connection.end()
}