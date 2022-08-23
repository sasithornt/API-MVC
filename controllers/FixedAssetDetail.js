var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getFixedAssetDetailAll() {
    try {
        let pool = await sql.connect(config);
        let fixedassetdetailall = await pool.request().query("SELECT  FD.Id,FD.FixedAsset_id, FD.Po,FD.Po_line,FD.Recieved_Date,FD.Invoice,FD.Invoice_Date,FD.Supplier_id,FD.Item_desc,FD.Unit_Price,FD.Qty,FD.Unit_Price,FD.Um_id" +
        " FROM    FixedAsset_Mst FA  "+
        "          LEFT JOIN FIXEDASSET_Dtl FD    ON FA.id = fd.FixedAsset_id " +
        "        LEFT JOIN UM            ON UM.ID = FD.UM_ID"+
        "        LEFT JOIN Supplier         ON Supplier.Id = FD.Supplier_id" 
       
    );
        return fixedassetdetailall.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}
async function getFixedAssetDetailId(Id) {
    try {
        let pool = await sql.connect(config);
        let fixedassetdetailid = await pool.request().input('id_parameter', sql.Int, Id)
        .query("SELECT  FD.Id,FD.FixedAsset_id,Fa.Asset_Code,FD.Po,FD.Po_line,FD.Recieved_Date,FD.Invoice,FD.Invoice_Date,FD.Supplier_id,FD.Item_desc,FD.Unit_Price,FD.Qty,FD.Unit_Price,FD.Um_id" +
        " FROM    FixedAsset_Mst FA  "+
        "        LEFT JOIN FIXEDASSET_Dtl FD    ON FA.id = fd.FixedAsset_id " +
        "        LEFT JOIN UM                   ON UM.ID = FD.UM_ID"+
        "        LEFT JOIN Supplier             ON Supplier.Id = FD.Supplier_id"+
        " where FA.Id = @id_parameter"
    );
        return fixedassetdetailid.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}
async function getFixedAssetDetailBYId(Id) {
    try {
        let pool = await sql.connect(config);
        let fixedassetdetailid = await pool.request().input('id_parameter', sql.Int, Id)
        .query("SELECT  FD.Id,FD.FixedAsset_id,Fa.Asset_Code,FD.Po,FD.Po_line,FD.Recieved_Date,FD.Invoice,FD.Invoice_Date,FD.Supplier_id,FD.Item_desc,FD.Unit_Price,FD.Qty,FD.Unit_Price,FD.Um_id" +
        " FROM    FixedAsset_Mst FA  "+
        "        LEFT JOIN FIXEDASSET_Dtl FD    ON FA.id = fd.FixedAsset_id " +
        "        LEFT JOIN UM                   ON UM.ID = FD.UM_ID"+
        "        LEFT JOIN Supplier             ON Supplier.Id = FD.Supplier_id"+
        " where FD.Id = @id_parameter"
    );
        return fixedassetdetailid.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}
async function insertFixedAsset_Dtl(parm) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`INSERT INTO FixedAsset_Dtl (FixedAsset_id,Po,Po_line,Recieved_Date,Invoice,Invoice_Date,Supplier_id,Item_desc,Qty,Unit_Price,Um_id) 
            VALUES('${parm.FixedAsset_id}','${parm.Po}',${parm.Po_line},'${parm.Recieved_Date}','${parm.Invoice}','${parm.Invoice_Date}',${parm.Supplier_id},'${parm.Item_desc}',${parm.Qty},${parm.Unit_Price},${parm.Um_id})`);
    }
    catch (error) {
        console.log(error);
    }
}
async function updateFixedAsset_Dtl(parmlist,Id) {
    try {
            let pool = await sql.connect(config);
            let c = await pool.request()
            .query(`UPDATE [GS].[dbo].[FixedAsset_Dtl] 
            SET Po = '${parmlist.Po}',Po_line = ${parmlist.Po_line},Recieved_Date = '${parmlist.Recieved_Date}', Invoice = '${parmlist.Invoice}',
            Invoice_Date='${parmlist.Invoice_Date}',Supplier_id = ${parmlist.Supplier_id},Item_desc = '${parmlist.Item_desc}',Qty=${parmlist.Qty}, 
            Unit_Price=${parmlist.Unit_Price}, Um_id = ${parmlist.Um_id}  where Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}
async function delsFixedAsset_Dtl(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`DELETE FROM [GS].[dbo].[FixedAsset_Dtl] WHERE Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {
    getFixedAssetDetailAll : getFixedAssetDetailAll,
    getFixedAssetDetailId : getFixedAssetDetailId,
    getFixedAssetDetailBYId : getFixedAssetDetailBYId,
    insertFixedAsset_Dtl : insertFixedAsset_Dtl,
    updateFixedAsset_Dtl : updateFixedAsset_Dtl,
    delsFixedAsset_Dtl : delsFixedAsset_Dtl
}