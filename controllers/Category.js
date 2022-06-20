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

async function postcategory(a) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`INSERT INTO Category ([Name],[Category_Comment],[UpdatedBy],[RecordDate],[CreatedBy],[CreateDate],[RowPointer]) VALUES('${a}')`)
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getcategory: getcategory,
    getcategoryid: getcategoryid,
    postcategory: postcategory
}