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
    let status = {...request.body}

    Db.createStatus(status).then(data => {
        response.status(201).send(data);
    })
})

app.listen(5004, () => console.log('server run on port 5004'))