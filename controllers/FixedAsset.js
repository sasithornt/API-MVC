var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getFixedAssetAll() {
    try {
        let pool = await sql.connect(config);
        // let fixedassetall = await pool.request().query("SELECT Id, Asset_Code , Name FROM [GS].[dbo].[FixedAsset_Mst]" );


        let fixedassetall = await pool.request().query("SELECT FA.Id, FA.ASSET_CODE , CG.NAME [CATEGORY]"+
        ", TP.NAME [TYPE],FA.NAME ,FA.BEGIN_USE,FA.PURCHASEAMT [PRICE],FA.QTY,UM.NAME [UM] " +
        ", FA.AMOUNT, LO.ANCESTORS_CACHE [LOCATION],US.FIRSTNAME+' ' + US.LASTNAME [USERS] " +
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

module.exports = {
    getFixedAssetAll: getFixedAssetAll,
}