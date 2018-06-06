var socket = io();

const playlist_generate_button = document.querySelector('.playlist_generate_button');
const playlist_url_input = document.querySelector('.playlist_url_input');
const playlist_container = document.querySelector('.playlist_container');


playlist_generate_button.addEventListener('click', () => {
    const playlistUrl = playlist_url_input.value;
    socket.emit("getPlaylistUrl", playlistUrl);





    /*
    var sp_url = playlist_url_input.value.split('?list=');
    var em_url = sp_url[sp_url.length - 1];
    var final_url = em_url.split('&')[0];
    console.log(final_url);

    var htmll = `<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=${final_url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    playlist_container.innerHTML = htmll;
    */
})
socket.on("generatePlayer", (playlistUrl) => {
    var sp_url = playlistUrl.split('?list=');
    var em_url = sp_url[sp_url.length - 1];
    var final_url = em_url.split('&')[0];
    console.log(final_url);
    var htmll = `<iframe width="356" height="200" src="https://www.youtube.com/embed/videoseries?list=${final_url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    playlist_container.innerHTML = htmll;
})

socket.on("generateSongsTitle", (songs_titles) => {
    console.log(songs_titles);
})