var socket = io();

const playlist_generate_button = document.querySelector('.playlist_generate_button');
const playlist_url_input = document.querySelector('.playlist_url_input');
const playlist_container = document.querySelector('.playlist_container');


playlist_generate_button.addEventListener('click', () => {
    const playlistUrl = playlist_url_input.value;
    playlist_url_input.value = "";
    socket.emit("getPlaylistUrl", playlistUrl);
})
socket.on("generatePlayer", (playlistUrl) => {
    var sp_url = playlistUrl.split('?list=');
    var em_url = sp_url[sp_url.length - 1];
    var final_url = em_url.split('&')[0];
    console.log(final_url);
    var htmll = `<iframe width="534" height="300" src="https://www.youtube.com/embed/videoseries?list=${final_url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    playlist_container.innerHTML = htmll;
})

socket.on("generateSongsTitle", (songs_info) => {
    renderSongsTitle(songs_info);
})

var navBar = document.querySelector(".nav");
var homeSection = document.querySelector("#history");
var popularWrap = document.querySelector(".popular-wrap")

/*var albumCovers = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZGuHAbh6c-PkD_uaEnt7IqIX08kghWFYGl9lOYT7qIY9HIyJ',
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
];*/

const albumCollection = [{
        cover: 'https://i.ytimg.com/vi/gACUUzuBOU8/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBD5oSO0ZWp0NuhZ5NCa42oxe3DIA',
        url: 'https://www.youtube.com/playlist?list=PLDev3jvNNbr4LOrPK0jS_NtDJB6bqYvo_'
    }, {
        cover: 'https://i.ytimg.com/vi/x0zLjkbt_dw/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDVZjNmIkT1YSxjRX3VYnwvFy4tlg',
        url: 'https://www.youtube.com/playlist?list=PLMI0X_0iX6mp5Y4yjIuWwaDwqvDFTBBs3'
    }, {
        cover: 'https://i.ytimg.com/vi/mfM2DVWPrJU/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB4byZDf0d9GqurawPYyQbEo6KLCw',
        url: 'https://www.youtube.com/playlist?list=PLZf9XXbK2hZWzlQjn72dBizkNrsCLYDf4'
    }, {
        cover: 'https://i.ytimg.com/vi/QznBis-VT6Q/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBQZe_w7Er0_Vtghm16KfvhdEF-Lg',
        url: 'https://www.youtube.com/playlist?list=PLx8X6gKcEQzParIANOgeuVclyl6Y1eO8q'
    }, {
        cover: 'https://i.ytimg.com/vi/aCrOi7vaWRE/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCzOt4_UHvnj0s_l-tvJ4c4upV1Ug',
        url: 'https://www.youtube.com/playlist?list=PLbIhf4uSd-jelZh_wX4p920cncfoUYfdd'
    }, {
        cover: 'https://i.ytimg.com/vi/C8AQPGKcZOk/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCRC4yrEvF3MqRQicRwzIgNtTA0BQ',
        url: 'https://www.youtube.com/playlist?list=PLo30Gy5IvXQ_iWUQhjEfP6A2QgO6fkanH'
    },
    {
        cover: 'https://i.ytimg.com/vi/k2qgadSvNyU/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBjquG6Np4YKRAx74H6HbVX0nLSTw',
        url: 'https://www.youtube.com/playlist?list=PLNrotoZZ8Baoy7UXzs7DOAV17ciPSpXGg'
    },
    {
        cover: 'https://i.ytimg.com/vi/zRHNi3QfFlE/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBv5hXr2Xb3ukH2MHAy3XBE2k8IqQ',
        url: 'https://www.youtube.com/playlist?list=PL_z2rRJd3xt4pdxj-Poa_lChQXY3yOk05'
    }, {
        cover: 'https://i.ytimg.com/vi/qp1JOAdF4kM/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBFmoSBXKf0Uxx0ZxEzxx_Pmwawig',
        url: 'https://www.youtube.com/playlist?list=PL8B7A3CFFEBE9CCD8'
    }, {
        cover: 'https://i.ytimg.com/vi/iIyE3EDCigE/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLArgVWU2BSslsXPqbYLQGPwRLk_Bg',
        url: 'https://www.youtube.com/playlist?list=PL80A243D9C542F276'
    }, {
        cover: 'https://i.ytimg.com/vi/KXdW0g6jAxE/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDOO1MH9BRn8QH7ezB7DpPvuDMajQ',
        url: 'https://www.youtube.com/playlist?list=PLkLZNGcjKAQ_T6e9HD9YRiUcE85vouttE'
    }, {
        cover: 'https://i.ytimg.com/vi/z07Zm0jk6XA/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLClxQVYXv2euhI4ZG3C6in65hAWwA',
        url: 'https://www.youtube.com/playlist?list=PLn8lpQwVMAVuh2ds-Q8Hu4ygs_5aziJMi'
    }, {
        cover: 'https://i.ytimg.com/vi/djscsRpjGc4/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLARJ5N5NoO6MeKwyrjr6NJ8wJGmCw',
        url: 'https://www.youtube.com/playlist?list=PLC1uUM4twa8ihGXl3a3hEC7baryJ5kU9_'
    }, {
        cover: 'https://i.ytimg.com/vi/Tm8LGxTLtQk/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAAh_hNRw_Se8RJH02PhXOYiwGlqw',
        url: 'https://www.youtube.com/playlist?list=PLlqZM4covn1GspPLr5DCHTtafLkAHxUid'
    }, {
        cover: 'https://i.ytimg.com/vi/3BXDsVD6O10/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCpn5P_a_qw2SLd1Dfl6GTH4_81TA',
        url: 'https://www.youtube.com/playlist?list=PL3-sRm8xAzY8FmvSc0GpRFcWqgL2EpuRT'
    }, {
        cover: 'https://i.ytimg.com/vi/HSyKd5-_yjY/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA7mD7ZJllVf7MGDcp53xtBGEADIQ',
        url: 'https://www.youtube.com/playlist?list=PL_nlqDZHeAYP6rjTxOprTV3k9q8qiHxO5'
    }, {
        cover: 'https://i.ytimg.com/vi/4LFGqokvOwI/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDtVUAga0Rv6DNyV4R97vDOhyX8ew',
        url: 'https://www.youtube.com/playlist?list=PL1j5Txu5FZPCsu6OEmf_TbfRZS6uGngMr'
    }, {
        cover: 'https://i.ytimg.com/vi/b45rzwIBS_Y/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBJW1W8O5Q-Ce80zmg9wQyfp90-_g',
        url: 'https://www.youtube.com/playlist?list=PL81_CtYCym2_indonS249kcDhb04JVSy6'
    }, {
        cover: 'https://i.ytimg.com/vi/vthI-xwwvQ0/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCM0YuythfRTQU-7ZF3PJ_vua1TQQ',
        url: 'https://www.youtube.com/playlist?list=PLWnVxuqvY7JhVvW831x9XyhMry0ZaCkxs'
    }, {
        cover: 'https://i.ytimg.com/vi/-MvfPBAJCrw/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBZ1pHFmaM1wp7DxrxRz3pq6N6JqA',
        url: 'https://www.youtube.com/playlist?list=PLCd1VmF_W0mzDbbIpJh7pBm26H663Yn37'
    }, {
        cover: 'https://i.ytimg.com/vi/AZ1pHmWhIuY/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA2AREGwTYWRkJTganL52LA8pNkYg',
        url: 'https://www.youtube.com/playlist?list=PLCd1VmF_W0mzsac1aEM03cFfmav3WJeGi'
    },
]

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

for (let i = 0; i < albumCollection.length; i++) {
    var album = document.createElement("A");
    album.className = "album";
    var css_top = random(0, 80);
    var css_right = random(0, 80);
    album.style.top = css_top + "%";
    album.style.right = css_right + "%";
    album.style.backgroundImage = `url(${albumCollection[i].cover})`
    album.setAttribute("href", "#playlist");
    var delay = random(-6, 0)
    album.style.animationDelay = delay + "s";
    popularWrap.appendChild(album);
    album.addEventListener("click", () => {
        socket.emit("getPlaylistUrl", albumCollection[i].url);
    })
}




function renderSongsTitle(songs_info) {
    const class_list = document.querySelector('.class-list');
    const list_member = document.querySelector('.list-member');
    list_member.innerHTML = "";
    class_list.style.display = "block";
    for (let i = 0; i < songs_info.titles.length; i++) {
        var title = document.createElement("DIV");
        title.className = "song-name";
        title.innerHTML = songs_info.titles[i];
        list_member.appendChild(title);

    }
}