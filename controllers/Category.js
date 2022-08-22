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

async function getcategoryid(categorysId) {
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

async function postcategory(s){
    try{
        let pool = await sql.connect(config);
        let t = await pool.request()
        .query(`INSERT INTO [GS].[dbo].[Category] (Name,Category_Comment) VALUES ('${s.Name}','${s.Category_Comment}')`);
    }
    catch (error) {
        console.log(error);
    }
}
async function delcategory(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`DELETE FROM [GS].[dbo].[Category] WHERE Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getcategory: getcategory,
    getcategoryid: getcategoryid,
    postcategory: postcategory,
    delcategory : delcategory
}