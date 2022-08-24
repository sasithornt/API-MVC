var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getFixedAssetAll() {
    try {
        let pool = await sql.connect(config);
        // let fixedassetall = await pool.request().query("SELECT Id, Asset_Code , Name FROM [GS].[dbo].[FixedAsset_Mst]" );

        let fixedassetall = await pool.request().query("SELECT FA.Id,ST.Name [Status_Mst], FA.Asset_Code , CG.Name [Category]" +
            ", TP.Name [TYPE],FA.Name ,FA.BEGIN_USE,FA.PURCHASEAMT [PRICE],FA.QTY,UM.NAME [UM] " +
            ", FA.PurchaseAmt, LO.ANCESTORS_CACHE [LOCATION],US.FIRSTNAME+' ' + US.LASTNAME [USERS] " +
            " FROM	FIXEDASSET_MST FA  "+
            "        LEFT JOIN LOCATION LO	ON LO.ID = FA.LOCATION_ID " +
            "        LEFT JOIN UM			ON UM.ID = FA.UM_ID " +
            "        LEFT JOIN CATEGORY CG	ON CG.ID = FA.CATEGORY_ID " +
            "        LEFT JOIN STATUS_MST ST	ON ST.ID = FA.STATUS_ID " +
            "        LEFT JOIN TYPES TP		ON TP.ID = FA.TYPES_ID " +
            "        LEFT JOIN USERS US		ON US.ID = FA.USER_ID"
        );

        // let statuss = await pool.request().query("SELECT * FROM [GS].[dbo].[Status_Mst]");
        return fixedassetall.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function insertFixedAsset_Mst(parm) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request()
            .query(`INSERT INTO FixedAsset_Mst (Asset_Code,Name,Types_id,Status_id,Category_id,Um_id,User_id,Location_id,Manufacture_id,Model_id,Regis_Date,Begin_Use,Qty,PurchaseAmt,Serail) 
            VALUES('${parm.Asset_Code}','${parm.Name}',${parm.Types_id},${parm.Status_id},${parm.Category_id},${parm.Um_id},'${parm.User_id}',${parm.Location_id},${parm.Manufacture_id},${parm.Model_id},'${parm.Regis_Date}',
            '${parm.Begin_Use}',${parm.Qty},${parm.PurchaseAmt},'${parm.Serail}')`);
    }
    catch (error) {
        console.log(error);
    }
}

async function updateFixedAsset_Mst(parmlist,Id) {
    try {
            let pool = await sql.connect(config);
            let c = await pool.request()
            .query(`UPDATE [GS].[dbo].[FixedAsset_Mst] 
            SET Name = '${parmlist.Name}', Regis_Date = '${parmlist.Regis_Date}' ,Begin_Use = '${parmlist.Begin_Use}', 
            DestroyRequest_Date = '${parmlist.DestroyRequest_Date}',Destroy_Date ='${parmlist.Destroy_Date}',Location_id = ${parmlist.Location_id}, 
            User_id = ${parmlist.User_id},Qty = ${parmlist.Qty} , Manufacture_id = ${parmlist.Manufacture_id}, Model_id = ${parmlist.Model_id} , 
            Serail = '${parmlist.Serail}' , Types_id = ${parmlist.Types_id}, 
            Category_id = ${parmlist.Category_id} ,Status_id = ${parmlist.Status_id}, PurchaseAmt = ${parmlist.PurchaseAmt},
            AccruDrep = ${parmlist.AccruDrep}, CurrentDrep = ${parmlist.CurrentDrep}, Amorlization = ${parmlist.Amorlization}, 
            Useful = ${parmlist.Useful} where Id = '${Id}'`);
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteFixedAsset_Mst(Id){
    try {
        let pool = await sql.connect(config);
        let c = await pool.request().input('id_parameter', sql.Int, Id).query("DELETE FROM [GS].[dbo].[FixedAsset_Mst] WHERE Id = @id_parameter");
        return c.recordsets
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = {
    getFixedAssetAll: getFixedAssetAll,
    insertFixedAsset_Mst: insertFixedAsset_Mst,
    updateFixedAsset_Mst:updateFixedAsset_Mst,
    deleteFixedAsset_Mst:deleteFixedAsset_Mst
}