let songs = [];
let id = 1;

module.exports = {
    getSongs: function(req, res) {
        res.status(200).json(songs);
    },
    addSong: function(req,res) {
        const {title, artist, album} = req.body;
        let song = {
            title,
            artist,
            album,
            id,
            user: req.session.username
        };
        songs.push(song);
        id++;
        res.status(200).json(songs);
    },
    removeSong: function(req, res) {
        const index = songs.findIndex((val) => val.id == req.params.id);
        songs.splice(index, 1);
    },
    login: function(req, res){
        req.session.username = req.body.username;
        res.sendStatus(200);
        // console.log(req.session)
    },
    logout: function(req, res){
        req.session.destroy();
        res.sendStatus(200);
    }
}