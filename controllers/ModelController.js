var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');


async function getModel(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request().input('id_parameter', sql.Int, Id).query("SELECT * from [GS].[dbo].[Model] where Id = @id_parameter");
        return c.recordsets
    }
    catch (error) {
        console.log(error);
    }
}


async function getModels() {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request().query("SELECT * FROM [GS].[dbo].[Model]");
        return c.recordsets
    }
    catch (error) {
        console.log(error);
    }
}


async function creModel(parmlist) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
        .query(`INSERT INTO [GS].[dbo].[Model] (Name,Model_Comment) VALUES ('${parmlist.Name}','${parmlist.Model_Comment}')`);
    }
    catch (error) {
        console.log(error);
    }
}


async function delModel(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`DELETE FROM [GS].[dbo].[Model] WHERE Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}
    module.exports = {
        getModel : getModel,
        getModels : getModels,
        creModel : creModel,
        delModel : delModel
}