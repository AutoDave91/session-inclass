const express = require('express');
const app = express();
const controller = require('./controller');
const session = require('express-session');

app.use(express.json());
app.use(session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*60*24*7
    }
}))

// function auth(req, res, next){
//     const {username, password}=req.body;
//     if(username === 'admin' && password === 'admin'){
//         next();
//     }
//     else {
//         res.status(403).json({error: 'UNAUTHORIZED_USER'})
//     }
// }

function auth(req, res, next){
        if(req.session.username === 'admin'){
            next();
        }
        else {
            res.status(403).json({error: 'UNAUTHORIZED_USER'})
        }
    }

app.post('/auth/login', controller.login)
app.post('/auth/logout', controller.logout)

//gets all of my songs
app.get('/api/songs', controller.getSongs)
// app.use(function(req, res, next){
//     const {username, password}=req.body;
//     if(username === 'admin' && password === 'admin'){
//         next();
//     }
//     else {
//         res.status(403).json({error: 'UNAUTHORIZED_USER'})
//     }
// })

//add a song
//name, artist, album, autoAssignedID
app.post('/api/song', auth, controller.addSong);
//delete a song given an id
app.delete('/api/song/:id', controller.removeSong)

const PORT = 5050;

app.listen(PORT, () => console.log(`Listening on Server Port ${PORT}`))