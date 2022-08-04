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
var app = express();
var router = express.Router();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/', router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

router.use((request, response, next) => {
    console.log('middleware');
    next();
});

app.route('/fixedassetall').get((request, response) => {
    Db1.getFixedAssetAll().then((data) => {
        response.send(data[0]);
    })
})

// app.route('/fixedassetall').post((request, response) => {
//     let  parm = { ...request.body }
//     Db1.insertFixedAsset_Mst(parm).then(data  => {
//       response.send("Completed").json(data);
//     })
//   })


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


// app.route('/createstatus').post((req, res) => {
//     const Name = req.body.Name;
//     const CreatedBy = req.body.CreatedBy;
//     Db.createStatus(Name,CreatedBy).then(data => {
//         res.send("Completed");
//     })
// })

app.route('/createstatus1').post((request, response) => {
    let  order = { ...request.body }
    Db.createStatus1(order).then(data  => {
      response.send("Completed").json(data);
    })
  })


router.route('/category').get((request,response)=>{
    D1.getcategory().then((data)=>{
        response.send(data[0]);
    })
})

router.route('/type').get((request,response)=>{
    T.gettype().then((data)=>{
        response.send(data[0]);
    })
})

// TABLE "MODEL"
app.route('/model').get((request,response) => {ModelController.getModels().then((data)  => {response.send(data[0]);})})
app.route('/model/:id').get((request,response) => {ModelController.getModel(request.params.id).then((data)  => {response.send(data[0]);})})
app.route('/modeldelete/:id').delete((request,response) => {ModelController.delModel(request.params.id).then((data)  => {response.send(data[0]);})})
app.route('/modelcreate').post((request, response) => {let parmlist = { ...request.body }
    ModelController.creModel(parmlist).then(data  => {response.send("Completed").json(data);})
})
// JAY

// TABLE "Manufacture" Brand
app.route('/munufactures').get((request,response) => {Manufacture.getManufactures().then((data)  => {response.send(data[0]);})})
app.route('/munufacture/:id').get((request,response) => {Manufacture.getManufacture(request.params.id).then((data)  => {response.send(data[0]);})})
app.route('/munufacturedelete/:id').delete((request,response) => {Manufacture.delManufacture(request.params.id).then((data)  => {response.send(data[0]);})})
app.route('/munufacturecreate').post((request, response) => {let parmlist = { ...request.body }
    Manufacture.creManufacture(parmlist).then(data  => {response.send("Completed").json(data);})
})
// Fern

// TABLE "FixedAsset_Mst"
app.route('/fixedasset/:id').get((request,response) => {FixedAsset_MstController.getFixedAsset(request.params.id).then((data)  => {response.send(data[0]);})})

// JAY

//Fern Table "FixedAsset_Mst"
app.route('/addfixedasset').post((request,response) => {
    let parm = { ...request.body }
    FixedAsset.insertFixedAsset_Mst(parm).then(data  => {response.send("Completed").json(data);})
})
//Fern End Table "FixedAsset_Mst"

//Fern Table "UM" , "Location"//
app.route('/um').get((request,response) => {
    Um.getUm().then((data) => {response.send(data[0]);})
})
app.route('/user').get((request,response) => { 
    User.getuser().then((data) => {response.send(data[0]);})
})

app.route('/locations').get((request,response) => {
    Locationn.getlocation().then((data) => {response.send(data[0]);})
})

app.listen(5004, () => console.log('server run on port 5004'))