var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getFixedAssetAll() {
    try {
        let pool = await sql.connect(config);
        // let fixedassetall = await pool.request().query("SELECT Id, Asset_Code , Name FROM [GS].[dbo].[FixedAsset_Mst]" );


        let fixedassetall = await pool.request().query("SELECT FA.Id, FA.Asset_Code , CG.Name [Category]"+
        ", TP.Name [TYPE],FA.Name ,FA.BEGIN_USE,FA.PURCHASEAMT [PRICE],FA.QTY,UM.NAME [UM] " +
        ", FA.Amount, LO.ANCESTORS_CACHE [LOCATION],US.FIRSTNAME+' ' + US.LASTNAME [USERS] " +
        " FROM	FIXEDASSET_MST FA  " 
        +
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
        .query(`INSERT INTO Status_Mst (Asset_Code,Name,Regis_Date,Begin_Use,DestroyRequest_Date,
            Destroy_Date,Location_id,User_id,Qty,Um_id,Manufacture_id,Model_id,Serail,Types_id,
            Category_id,Status_id,PurchaseAmt,Amount,AccruDrep,CurrentDrep,Amorlization,Useful) 
        VALUES('${order.Asset_Code}'
        ,'${parm.Name}'
        ,'${parm.Regis_Date}'
        ,'${parm.Begin_Use}'
        ,'${parm.DestroyRequest_Date}'
        ,'${parm.Destroy_Date}'
        ,'${parm.Location_id}'
        ,'${parm.User_id}'
        ,'${parm.Qty}'
        ,'${parm.Um_id}'
        ,'${parm.Manufacture_id}'
        ,'${parm.Model_id}'
        ,'${parm.Serail}'
        ,'${parm.Types_id}'
        ,'${parm.Category_id}'
        ,'${parm.Status_id}'
        ,'${parm.PurchaseAmt}'
        ,'${parm.Amount}'
        ,'${parm.AccruDrep}'
        ,'${parm.CurrentDrep}'
        ,'${parm.Amorlization}'
        ,'${parm.Useful}'
        )`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFixedAssetAll: getFixedAssetAll,
    insertFixedAsset_Mst: insertFixedAsset_Mst,
}