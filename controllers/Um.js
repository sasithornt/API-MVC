var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getUm(){
    try{
        let pool = await sql.connect(config);
        let um = await pool.request().query('SELECT * FROM GS.[dbo].[Um]');
        return um.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getUm : getUm,
}