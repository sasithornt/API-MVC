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

// async function createstatus(a,b) {
//     try {
//         // const Name = req.body.Name;
//         // const CreatedBy = req.body.CreatedBy;
//         let pool = await sql.connect(config);
//         let c = await pool.request()
//         .query(`INSERT INTO Status_Mst (Name,CreatedBy) VALUES('${a}','${b}')`);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }
async function createstatus1(order) {
    try {
        // let Name = req.body.Name;
        let pool = await sql.connect(config);
        let c = await pool.request()
        .query(`INSERT INTO Status_Mst (Name,CreatedBy,UpdatedBy,A,B,C) VALUES('${order.Name}','${order.CreatedBy}','${order.UpdatedBy}','${order.A}','${order.B}','${order.C}')`);
    }
    catch (error) {
        console.log(error);
    }
}
    module.exports = {
    getStatuss : getStatuss,
    getStatus : getStatus,
    //createStatus : createstatus,
    createStatus1 : createstatus1
}