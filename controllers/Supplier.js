var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getsupplier() {
    try {
        let pool = await sql.connect(config);
        let sup = await pool.request().query("SELECT * FROM Supplier");

        return sup.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}
async function creSupplier(s) {
    try {
        let pool = await sql.connect(config);
        let t = await pool.request()
            .query(`INSERT INTO Supplier (Supplier_Name,Address,PostCode,Country,Website,PhoneNumber,Sup_Fax,Sup_Email,Sup_Comment)
         VALUES ('${s.Supplier_Name}','${s.Address}','${s.PostCode}','${s.Country}','${s.Website}','${s.PhoneNumber}','${s.Sup_Fax}','${s.Sup_Email}','${s.Sup_Comment}')`);
    }
    catch (error) {
        console.log(error);
    }
}
async function delsupplier(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`DELETE FROM [GS].[dbo].[Supplier] WHERE Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {
    getsupplier: getsupplier,
    creSupplier: creSupplier,
    delsupplier : delsupplier
}