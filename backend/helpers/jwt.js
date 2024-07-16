const {expressjwt} = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    return expressjwt({ 
        secret, 
        algorithms: ['HS256']
     })
    .unless({ 
        path: [
            { url: /\/public\/uploads\/(.*)/ , methods:['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/uploads(.*)/ , methods:['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/ , methods:['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/ , methods:['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/contacts(.*)/ , methods:['POST', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`
        ]
        })
}
/*
validate isAdmin function is not working properly so I commented it out for now 
async function isRevoked(req, payload, done){
    if(!payload.isAdmin){
        done(null, true)
    }
    done();
}
*/
module.exports = authJwt;


