var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');

async function getFixedAssetDtl(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request().input('id_parameter', sql.Int, Id)
            .query("SELECT FA.Id, FA.Asset_Code , CG.Name [Category] ,"+
            " TP.Name [Types],FA.Name ,SM.Name [Status_Mst],FA.Regis_Date,FA.Begin_Use,FA.DestroyRequest_Date,FA.Destroy_Date,FA.PurchaseAmt [Price],FA.Qty,UM.Name [Um] ," +
            " FA.Amount, LO.Ancestors_Cache [Location],US.Firstname+' ' + US.Lastname [Users] ," +
            " MD.Name [Model],MF.Name [Manufacture],FA.Serail ,FA.Useful,FA.AccruDrep,FA.Amorlization,FA.CurrentDrep"+
            " FROM	FIXEDASSET_MST FA  " + 
            " LEFT JOIN LOCATION LO	ON LO.ID = FA.LOCATION_ID " +
            " LEFT JOIN UM			ON UM.ID = FA.UM_ID " +
            " LEFT JOIN CATEGORY CG	ON CG.ID = FA.CATEGORY_ID " +
            " LEFT JOIN STATUS_MST ST	ON ST.ID = FA.STATUS_ID " +
            " LEFT JOIN TYPES TP		ON TP.ID = FA.TYPES_ID " +
            " LEFT JOIN USERS US		ON US.ID = FA.USER_ID " +
            " LEFT JOIN Model MD		ON MD.Id = FA.Model_id" +
            " LEFT JOIN Manufacture MF ON MF.Id = FA.Manufacture_id"+
            " LEFT JOIN Status_Mst SM  ON SM.Id = FA.Status_id"+
            " where FA.Id = @id_parameter");
        return c.recordsets
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFixedAssetDtl : getFixedAssetDtl
}