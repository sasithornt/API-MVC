var config = {
    user: 'sa',
    password: '*Adm@gset',
    server: 'GSET_044\\GSET_044',
    database: 'GS',
    synchronize: true,
    trustServerCertificate: true,
    enableArithAbort:  true,
    options: {
        // instancename: 'GSET_044',
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
    }
};

module.exports = config;