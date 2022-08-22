var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function gettype(){
    try{
        let pool = await sql.connect(config);
        let type = await pool.request().query(`SELECT * FROM [GS].[dbo].[Types]`);
        return type.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
async function posttype(type){
    try{
        let pool = await sql.connect(config);
        let t = await pool.request()
        .query(`INSERT INTO [GS].[dbo].[Types] (Name,Type_Comment) VALUES ('${type.Name}','${type.Type_Comment}')`);
    }
    catch (error) {
        console.log(error);
    }
}
async function deltype(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`DELETE FROM [GS].[dbo].[Types] WHERE Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {
    gettype : gettype,
    posttype: posttype,
    deltype : deltype,
}
