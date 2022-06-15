var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getcategory() {
    try {
        let pool = await sql.connect(config);
        let category = await pool.request().query("SELECT * FROM [GS].[dbo].[Category]");
        return category.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getcategory(categorysId) {
    try {
        let pool = await sql.connect(config);
        let categoryy = await pool.request()
            .input('input_parameter', sql.Int, categorysId)
            .query("SELECT * from [GS].[dbo].[Category] where Id = @input_parameter");
        return categoryy.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}