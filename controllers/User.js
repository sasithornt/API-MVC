var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getuser(){
    try{
        let pool = await sql.connect(config);
        let user = await pool.request().query('SELECT * FROM GS.[dbo].[Users]');
        return user.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getuser: getuser,
}