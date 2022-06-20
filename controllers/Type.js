var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function gettype(){
    try{
        let pool = await sql.connect(config);
        let type = await pool.request().query('SELECT * FROM [GS].[dbo].[Types]');
        return type.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    gettype : gettype,
}