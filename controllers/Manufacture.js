var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getManufacture(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request().input('id_parameter', sql.Int, Id).query("SELECT * from [GS].[dbo].[Manufacture] where Id = @id_parameter");
        return c.recordsets
    }
    catch (error) {
        console.log(error);
    }
}


async function getManufactures() {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request().query("SELECT * FROM [GS].[dbo].[Manufacture]");
        return c.recordsets
    }
    catch (error) {
        console.log(error);
    }
}


async function creManufacture(parmlist) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            //.query(`INSERT INTO [GS].[dbo].[Model] (Name,Model_Comment,UpdatedBy,RecordDate) VALUES('${parmlist.Name}','${parmlist.Model_Comment}','${parmlist.UpdatedBy}','${parmlist.RecordDate}')`);
            .query(`INSERT INTO [GS].[dbo].[Manufacture] (Name,Manufacture_Comment) VALUES('${parmlist.Name}','${parmlist.Manufacture_Comment}')`);
    }
    catch (error) {
        console.log(error);
    }
}

async function updateManufacture(parmlist,Id) {
    try {
            let pool = await sql.connect(config);
            let c = await pool.request()
            .query(`UPDATE [GS].[dbo].[Manufacture] SET Name = '${parmlist.Name}', Manufacture_Comment = '${parmlist.Manufacture_Comment}' where Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}

async function delManufacture(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`DELETE FROM [GS].[dbo].[Manufacture] WHERE Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getManufacture: getManufacture,
    getManufactures: getManufactures,
    creManufacture: creManufacture,
    delManufacture: delManufacture,
    updateManufacture : updateManufacture
}