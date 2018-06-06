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

var navBar = document.querySelector(".nav");
var homeSection = document.querySelector("#history");
var popularWrap = document.querySelector(".popular-wrap")

var albumCovers = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZGuHAbh6c-PkD_uaEnt7IqIX08kghWFYGl9lOYT7qIY9HIyJ',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4XJZ1Che_iC4JlyCoYpBh2Lqxc-dk1nLtBfeN4vhOtmdqisYnaA',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyv8-EUSQdGQBWWPcqKT4OeNcBN2iIZgE9yf90MnYZNxtN_-BY_Q',
    'https://images-na.ssl-images-amazon.com/images/I/71LiPpRKmhL._SY355_.jpg',
    'https://www.billboard.com/files/styles/900_wide/public/media/Green-Day-American-Idiot-album-covers-billboard-1000x1000.jpg',
    'https://assets.heart.co.uk/2013/33/the-most-iconic-album-covers-ever11-1376923401-view-1.jpg',
    'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/5/13/1399990966665/Picture_246.png?w=300&q=55&auto=format&usm=12&fit=max&s=0201cd98a0f48b6a1e61dfaf10b38a28',
    'https://mattbusha2media.weebly.com/uploads/4/4/0/6/44064193/1036833.jpg',
    'http://ksassets.timeincuk.net/wp/uploads/sites/55/2013/03/2013nirvanapaint040313-1-920x584.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9l5GghxydFigkTpdYsgRED_AE3mOSSwPT-OKKMvnmOqxuj8Rwwg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtQC7NgK-_H8UtjW_kD-twbUmaOGxI2AhqzfsokyadxFoLv0Yuw', 'https://uicradio.files.wordpress.com/2017/03/030617-music-khalid-american-teen-album-cover-art.jpg?w=445&h=445',
    'http://i470.photobucket.com/albums/rr65/mikehouston82/81ef1a54081f8f3535cb8450247_zps97da4bc9.jpg',
    'https://www.billboard.com/files/styles/900_wide/public/media/Metallica-Master-of-Puppets-album-covers-billboard-1000x1000.jpg',
    'http://image.linotype.com/fontmagazine/fontfeatures/rockmusiccoverfonts/FooFighters.jpg',
    'http://musicmedia.ign.com/music/image/article/117/1171117/25-most-iconic-album-covers-of-all-time-20110527043620334-000.jpg',
    'https://ephemeralnewyork.files.wordpress.com/2011/04/simonandgarfunkelcover.jpg',
    'https://sep.yimg.com/ay/gallerydirectart/the-beatles-rock-album-cover-art-on-stretched-archival-canvas-walking-2.jpg',
    'https://res.cloudinary.com/jerrick/image/upload/c_fit,f_auto,fl_progressive,q_auto,w_680/wjmxqkvzhoulv1jpyqi0',
    'https://img.discogs.com/0OVnlwBkwZjHrU2rjM-ef8s2kwc=/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-458505-1381950347-1001.jpeg.jpg',
    'https://i.ytimg.com/vi/cXboXZohKK4/maxresdefault.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtJ20fk8bdU3sVh4_n81etl4HnbOvFqofy10wco-mO57oU9Nvs',
    'https://inspiredology.com/wp-content/uploads/2008/02/2258924230_6f9995e2ae_o.jpg',
    'https://wegraphics.net/wp-content/uploads/2010/12/mission_15b.jpg',
    'https://shortlist.imgix.net/app/uploads/2015/01/24184408/the-50-greatest-rock-albums-ever-41.jpg?w=1200&h=1&fit=max&auto=format%2Ccompress',
    'http://bestrocklist.com/files/Album%20Covers/brl%2025.jpg',
    'https://images.rapgenius.com/1ea3ec7f9117443a7ad0f3655d1fa856.567x566x1.jpg'
];

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

for (let i = 0; i < albumCovers.length; i++) {
    var album = document.createElement("DIV");
    album.className = "album";
    var css_top = random(0, 80);
    var css_right = random(0, 80);
    album.style.top = css_top + "%";
    album.style.right = css_right + "%";
    album.style.backgroundImage = `url(${albumCovers[i]})`
    var delay = random(-6, 0)
    album.style.animationDelay = delay + "s";
    popularWrap.appendChild(album);
}