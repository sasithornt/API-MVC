var Db1 = require('./controllers/FixedAsset');
var Db = require('./controllers/Statuscontroller');
var status = require('./model/Status_Mst');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mssql = require('mssql');
var cors = require('cors');
const res = require('express/lib/response');
var router = express.Router();

const corsOptions = {
    origin: 'http://localhost:3001',
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




router.route('/fixedassetall').get((request, response) => {
    Db1.getFixedAssetAll().then((data) => {
        response.send(data[0]);
    })
})





router.route('/statuss').get((request, response) => {
    Db.getStatuss().then((data) => {
        response.send(data[0]);
    })
})


router.route('/status/:id').get((request, response) => {
    Db.getStatus(request.params.id).then((data) => {
        response.send(data[0]);
    })
})

router.route('/createstatus').post((request, response) => {
    const Name = request.body.Name;
 // let a = {...request.body}
    Db.createStatus('${Name}',"TTT").then(data => {
        response.send("Completed");
    }) 
})
app.route('/createstatusmaster').post((req, res) => {
    const Name = req.body.Name;
    const CreatedBy = req.body.CreatedBy;
    Db.createStatus(Name,CreatedBy).then(data => {
        res.send("Completed");
    })
})


app.listen(5004, () => console.log('server run on port 5004'))