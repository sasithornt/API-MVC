var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getUm(){
    try{
        let pool = await sql.connect(config);
        let um = await pool.request().query('SELECT * FROM GS.[dbo].[Um]');
        return um.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
async function postUm(s){
    try{
        let pool = await sql.connect(config);
        let t = await pool.request()
        .query(`INSERT INTO [GS].[dbo].[Um] (Name) VALUES ('${s.Name}')`);
    }
    catch (error) {
        console.log(error);
    }
}
async function delUm(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`DELETE FROM [GS].[dbo].[Um] WHERE Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUm : getUm,
    postUm : postUm,
    delUm : delUm
}