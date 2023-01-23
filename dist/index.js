"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user = require('./routes/user');
const songs = require('./routes/songs');
const playlist = require('./routes/playlist');
const app = (0, express_1.default)();
const port = process.env.PORT;
//const prisma = new PrismaClient();
app.use(express_1.default.json());
// app.use(TokenValidation)
app.get('/', (req, res) => {
    res.send('<h1>Express server</h1>');
});
// ------------- Methods User ----------------
// Create the user
app.post('/api/v1/users', user.create_user);
// Show all the users with token
app.get('/api/v1/users', user.get_users);
// Verify token
app.get('/api/v1/users/verifyToken', user.verify_token);
// User login
app.post('/api/v1/users/login', user.login);
// ------------- Methods Playlist ----------------
// Create the playlist with the user 
app.post('/api/v1/playlist', playlist.create_playlist);
// Show all the playlists with the songs
app.get('/api/v1/playlist', playlist.get_playlists);
// ------------- Methods Songs ----------------
// Create the song with and is inserted the playlist
app.post('/api/v1/songs', songs.create_song);
// Show all the songs 
app.get('/api/v1/songs', songs.get_songs);
// Show the songs for id
app.get('/api/v1/songs/:id', songs.get_songs_id);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
