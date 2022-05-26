var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getStatuss() {
    try {
        let pool = await sql.connect(config);
        let statuss = await pool.request().query("SELECT * FROM [GS].[dbo].[Status_Mst]");
        return statuss.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getStatus(statusId) {
    try {
        let pool = await sql.connect(config);
        let status = await pool.request()
            .input('input_parameter', sql.Int, statusId)
            .query("SELECT * from [GS].[dbo].[Status_Mst] where Id = @input_parameter");
        return status.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function createStatus(status) {
    try {
        let pool = await sql.connect(config);
     // let statusname = status[0];
        let statuss = await pool.request()
        .input('Name' , sql.VarChar,status.Name)
        .query(`INSERT INTO Status_Mst (Name) VALUES('${status.Name}')`);
        
    }
    catch (error) {
        console.log(error);
    }
}

    
    module.exports = {
    getStatuss : getStatuss,
    getStatus : getStatus,
    createStatus : createStatus
}