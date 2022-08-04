var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getlocation(){
    try{
        let pool = await sql.connect(config);
        let location = await pool.request().query('SELECT * FROM GS.[dbo].[Location]');
        return location.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getlocation : getlocation,
}