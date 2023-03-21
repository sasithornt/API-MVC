var Db1 = require('./controllers/FixedAsset');
var Db = require('./controllers/Statuscontroller');
var D1 = require('./controllers/Category');
var T = require('./controllers/Type')
var ModelController = require('./controllers/ModelController')
var FixedAsset_MstController = require('./controllers/FixedAsset_MstController')

var bodyParser = require('body-parser');
var mssql = require('mssql');
var cors = require('cors');
const res = require('express/lib/response');
var express = require('express');
const req = require('express/lib/request');
const FixedAsset = require('./controllers/FixedAsset');
const Um = require('./controllers/Um');
const Locationn = require('./controllers/Locationn');
const { user } = require('./config/db');
const User = require('./controllers/User');
const Manufacture = require('./controllers/Manufacture');
const Type = require('./controllers/Type');
const FixedAssetDetail = require('./controllers/FixedAssetDetail');
const { response, request } = require('express');
const Supplier = require('./controllers/Supplier');
const { json } = require('body-parser');
const Statuscontroller = require('./controllers/Statuscontroller');
const Category = require('./controllers/Category');
var app = express();
var router = express.Router();
const http = require('http');

const corsOptions = {
    origin: 'http://localhost:3000/test',
    origin:'http://192.168.0.19/test/',
    credentials: true,
    optionSuccessStatus:200
};
app.use(cors(corsOptions));

app.use('/', router);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

router.use((request, response, next) => {
    console.log('middleware');
    next();
});
router.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
});

app.route('/fixedassetall').get((request, response) => {
    Db1.getFixedAssetAll().then((data) => {
        response.send(data[0]);
    })
})

app.route('/fixedassetupdate/:id').put((request, response) => {
    let parmlist = { ...request.body }
    FixedAsset_MstController.updateFixedAsset_Mst(parmlist,request.params.id).then((data) => {
        response.send("Update Completed").json(data);
    })
})
app.route('/fixedassetdelete/:id').delete((request, response) => {
    FixedAsset_MstController.deleteFixedAsset_Mst(request.params.id).then((data) => {
        response.send(data);
    })
})
// Start Status
app.route('/statuss').get((request, response) => {
    Db.getStatuss().then((data) => {
        response.send(data[0]);
    })
})

app.route('/status/:id').get((request, response) => {
    Db.getStatus(request.params.id).then((data) => {
        response.send(data[0]);
    })
})

app.route('/createstatus1').post((request, response) => {
    let order = { ...request.body }
    Db.createStatus1(order).then(data => {
        response.send("Completed").json(data);
    })
})
app.route('/statusdelete/:id').delete((request, response) => {
    Statuscontroller.delstatus(request.params.id).then((data) => {
        response.send("Delete Completed").json(data);
    })
})
// End Status

// Start Category 
router.route('/category').get((request, response) => {
    D1.getcategory().then((data) => {
        response.send(data[0]);
    })
})
app.route('/categorycreate').post((request, response) => {
    let s = { ...request.body }
    Category.postcategory(s).then(data => { response.send("Insert Completed").json(data); })
})
app.route('/categorydelete/:id').delete((request, response) => {
    Category.delcategory(request.params.id).then((data) => {
        response.send("Delete Completed").json(data);
    })
})

// End Category
// Fern "Type"
router.route('/type').get((request, response) => {
    T.gettype().then((data) => {
        response.send(data[0]);
    })
})
app.route('/typecreate').post((request, response) => {
    let type = { ...request.body }
    Type.posttype(type).then(data => { response.send("Completed").json(data); })
})
app.route('/typedelete/:id').delete((request, response) => {
    Type.deltype(request.params.id).then((data) => {
        response.send("Delete Completed").json(data);
    })
})
// End "Type"

// TABLE "MODEL"
app.route('/model').get((request, response) => { ModelController.getModels().then((data) => { response.send(data[0]); }) })
app.route('/model/:id').get((request, response) => { ModelController.getModel(request.params.id).then((data) => { response.send(data[0]); }) })
app.route('/modeldelete/:id').delete((request, response) => { ModelController.delModel(request.params.id).then((data) => { response.send("Delete Completed").json(data); }) })
app.route('/modelcreate').post((request, response) => {
    let parmlist = { ...request.body }
    ModelController.creModel(parmlist).then(data => { response.send(data); })
})
// JAY

// TABLE "Manufacture" Brand
app.route('/munufactures').get((request, response) => { Manufacture.getManufactures().then((data) => { response.send(data[0]); }) })
app.route('/munufacture/:id').get((request, response) => { Manufacture.getManufacture(request.params.id).then((data) => { response.send(data[0]); }) })
app.route('/munufacturedelete/:id').delete((request, response) => {
    Manufacture.delManufacture(request.params.id).then((data) => {
        response.send("Delete Completed").json(data);
    })
})
app.route('/munufacturecreate').post((request, response) => {
    let parmlist = { ...request.body }
    Manufacture.creManufacture(parmlist).then(data => { response.send("Insert Completed").json(data); })
})
app.route('/munufactureupdate/:id').put((request, response) => {
    let parmlist = { ...request.body }
    Manufacture.updateManufacture(parmlist,request.params.id).then((data) => {
        response.send("Update Completed").json(data);
    })
})
// Fern

// TABLE "FixedAsset_Mst"
app.route('/fixedasset/:id').get((request, response) => { FixedAsset_MstController.getFixedAsset(request.params.id).then((data) => { response.send(data[0]); }) })
// JAY
//Fern Table "FixedAsset_Mst"
// get FixedAsset_MstById 
app.route('/fixedassetBy/:id').get((request, response) => { FixedAsset_MstController.getFixedAssetBy(request.params.id).then((data) => { response.send(data[0]); }) })

app.route('/addfixedasset').post((request, response) => {
    let parm = { ...request.body }
    FixedAsset.insertFixedAsset_Mst(parm).then(data => { response.send("Completed").json(data); })
})

app.route('/updatefixedasset/:id').put((request, response) => {
    let parmlist = { ...request.body }
    FixedAsset.updateFixedAsset_Mst(parmlist,request.params.id).then((data) => {
        response.send("Update Completed").json(data);
    })
})

app.route('/deletefixedasset/:id').delete((request, response) => {
    FixedAsset.deleteFixedAsset_Mst(request.params.id).then((data) => {
        response.send(data);
    })
})
//Fern End Table "FixedAsset_Mst"

//Fern Table"FixedAsset_Dtl"
app.route('/fixedassetdetailall').get((request, response) => { FixedAssetDetail.getFixedAssetDetailAll().then((data) => { response.send(data[0]); }) })
app.route('/fixedassetdetail/:id').get((request, response) => { FixedAssetDetail.getFixedAssetDetailId(request.params.id).then((data) => { response.send(data[0]); }) })
app.route('/fixedassetdetailby/:id').get((request, response) => { FixedAssetDetail.getFixedAssetDetailBYId(request.params.id).then((data) => { response.send(data[0]); }) })
app.route('/fixedassetcreate').post((request, response) => {
    let s = { ...request.body }
    FixedAssetDetail.insertFixedAsset_Dtl(s).then(data => { response.send("Completed") })
})
app.route('/fixedassetdetaildelete/:id').delete((request, response) => {
    FixedAssetDetail.delsFixedAsset_Dtl(request.params.id).then((data) => {
        response.send("Delete Completed").json(data);
    })
})

app.route('/updatedetail/:id').put((request, response) => {
    let parmlist = { ...request.body }
    FixedAssetDetail.updateFixedAsset_Dtl(parmlist,request.params.id).then((data) => {
        response.send("Update Completed").json(data);
    })
})
//Fern End End Table "FixedAsset_Dtl"//

//Fern Table "UM" , "Location"//
app.route('/um').get((request, response) => {
    Um.getUm().then((data) => { response.send(data[0]); })
})

app.route('/umcreate').post((request, response) => {
    let s = { ...request.body }
    Um.postUm(s).then(data => { response.send("Insert Completed").json(data); })
})
app.route('/umdelete/:id').delete((request, response) => {
    Um.delUm(request.params.id).then((data) => {
        response.send("Delete Completed").json(data);
    })
})
// End UM

app.route('/user').get((request, response) => {
    User.getuser().then((data) => { response.send(data[0]); })
})

app.route('/locations').get((request, response) => {
    Locationn.getlocation().then((data) => { response.send(data[0]); })
})

//Supplier Fern
router.route('/supplier').get((request, response) => {
    Supplier.getsupplier().then((data) => {
        response.send(data[0]);
    })
})
app.route('/suppliercreate').post((request, response) => {
    let s = { ...request.body }
    Supplier.creSupplier(s).then(data => { response.send("Completed").json(data); })
})
app.route('/supplierdelete/:id').delete((request, response) => {
    Supplier.delsupplier(request.params.id).then((data) => {
        response.send("Delete Completed").json(data);
    })
})
app.listen(5006, () => console.log('server run on port 5006'))

