var config = require('../config/db');
const sql = require('mssql');

const { json } = require('express/lib/response');


async function getFixedAsset(Id) {
    try {
        let pool = await sql.connect(config);
        let c = await pool.request().input('id_parameter', sql.Int, Id)
            .query("SELECT FA.Id, FA.Asset_Code , CG.Name [Category] ,"+
            " TP.Name [Types],FA.Name ,FA.Begin_Use,FA.PurchaseAmt [Price],FA.Qty,UM.Name [Um] ," +
            " FA.Amount, LO.Ancestors_Cache [Location],US.Firstname+' ' + US.Lastname [Users] " +
            " FROM	FIXEDASSET_MST FA  " + 
            " LEFT JOIN LOCATION LO	ON LO.ID = FA.LOCATION_ID " +
            " LEFT JOIN UM			ON UM.ID = FA.UM_ID " +
            " LEFT JOIN CATEGORY CG	ON CG.ID = FA.CATEGORY_ID " +
            " LEFT JOIN STATUS_MST ST	ON ST.ID = FA.STATUS_ID " +
            " LEFT JOIN TYPES TP		ON TP.ID = FA.TYPES_ID " +
            " LEFT JOIN USERS US		ON US.ID = FA.USER_ID " +
            " where FA.Id = @id_parameter");
        return c.recordsets
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFixedAsset : getFixedAsset
}