let currentsong;
let audio;
let name = [];
let songUl;
let songlist;

let sg= [];
function playmusic(song) {
    currentsong.src = song;
    currentsong.play();
    document.querySelector(".pgmain").style.display = "block";
    document.querySelector(".pgmain").style.position = "sticky";
    document.querySelector(".playbar").setAttribute("src", "image/pause-button-svgrepo-com.svg");
    document.querySelector(".songsrc").innerHTML = `${song.replaceAll("%20", "").replace("/songs1/", "")}`
    
}

function convertSecondsToTimeFormat(seconds) {
    // Check if the input is a valid number
    if (typeof seconds !== 'number') {
        return 'Please provide a valid number for seconds.';
    }

    // Calculate minutes and remaining seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    // Ensure that the minutes and seconds are formatted with leading zeros
    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    var formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Combine minutes and seconds in the "minute:seconds" format
    var timeFormat = formattedMinutes + ':' + formattedSeconds;
    return timeFormat;
}

async function main(folder) {


    let fol = await fetch(`/songs1/${folder}`);
    let resf = await fol.text();


    let div = document.createElement("div");
    div.innerHTML = resf;

    let s = div.querySelectorAll(".view-tiles li a")
    let obj = Array.from(s)
    let songs = [];
    let songName = [];
    name = [];
        sg=[];
    for (let i = 1; i < obj.length; i++) {
        atr = obj[i].getAttribute("href");
        let son = atr.replaceAll('%20', '')
        let sf = son.replace("/songs1/", "")
        sg.push(atr)
        name.push(sf)

        songName.push(sf);

        let btr = obj[i].href;
        // console.log(btr)
        if (btr.includes(".mp3")) {
            songs.push(btr)
        }
    }
    console.log(sg)
    playmusic(""+sg[2])
    // return name;
    // }
    // async function nam_call(){
    // let nm=await nam()
    // console.log(name)
    songUl = document.querySelector(".mainsong");
    // let item = []
    
    for (let i = 0; i < name.length; i++) {
        let item = name[i].replace(`${folder}/`)
        item = item.replace("undefined", "")
        let foldername = folder.replace("Newfolder", "")
        if (item.includes(".mp3")) {
            songUl.innerHTML = songUl.innerHTML + `
                 <div class="songlist">
                <img src="image/music-svgrepo-com (1).svg" class="invert">
                <div class="pimg">
                    <div class="musicname">${item} </div>
                </div>
                <img src="image/play-circle-svgrepo-com.svg" alt="pIcon" class="invert play">
            </div>`;
        }
    }
    let pl = document.querySelectorAll(".play")
    for (let j = 0; j < pl.length; j++) {
        pl[j].addEventListener("click", () => {
            let songplay = []
            songplay.push(songlist[j])
            playmusic(songlist[j])
        })
    }

    return songs;

};

async function getbox() {
    let box_container = document.querySelector(".box_container");

    let fol = await fetch(`/songs1/`);
    let resf = await fol.text();
    let div = document.createElement("div")
    div.innerHTML = resf;

    let s = div.querySelectorAll("#files li a")
    console.log(Array.from(s))
    for (let i = 1; i < s.length; i++) {
        let title = s[i].title;
        let j = await fetch(`/songs1/${title}/response.json`);
        let jtext = await j.json();

        box_container.innerHTML = box_container.innerHTML + ` <div data-folder="${title}" class="box">
        <div data-folder="first"class="box_image"> <img
                src="songs1/${title}/cover.jpg"
                alt="img1">
            <div><span>${jtext.title}</span></div>
        </div>
        <div class="mainn">
            <div class="pBox"><img src="image/play-1001-svgrepo-com.svg" alt="pIcon" class="PIcon"></div>
        </div>
        <div class="footer">${jtext.description}</div>
    </div>`
    }

};


async function main_call() {
    currentsong = new Audio()

    //load the playlist-------
    let gb = await getbox();

    let arr = Array.from(document.querySelectorAll(".box"))
    console.log(arr)
    for (let j = 0; j < arr.length; j++) {
        arr[j].addEventListener("click", async () => {
            let foldername = arr[j].getAttribute("data-folder")
            songUl = document.querySelector(".mainsong");
            songUl.innerHTML = ``
            songlist = await main(foldername);
        })

    }

    // play_pausethe song------------------------

    let playbtn = document.querySelector(".playbar");
    document.querySelector(".playbar").addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            playbtn.src = "image/pause-button-svgrepo-com.svg"
        }
        else {
            currentsong.pause()
            playbtn.src = "image/play-1000-svgrepo-com.svg"
        }
    })
    // time update-----------------
    myseekbar = document.querySelector("#seekbar")

    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime,currentsong.duration)

        let seconds1 = currentsong.currentTime;
        let seconds2 = currentsong.duration;

        document.querySelector("#seekbar").value = (currentsong.currentTime / seconds2) * 100
        var timeFormatResult2 = convertSecondsToTimeFormat(seconds2);
        var timeFormatResult1 = convertSecondsToTimeFormat(seconds1)
        document.querySelector(".songduration").innerHTML = `${timeFormatResult1}/${timeFormatResult2}`
        if (seconds1 == seconds2) {
            document.querySelector(".songduration").innerHTML = `00:00/${timeFormatResult2}`
            document.querySelector(".playbar").setAttribute("src", "play-1000-svgrepo-com.svg")
            myseekbar.value = 0

        }
    });



    myseekbar.addEventListener("click", e => {
        // console.log(e.offsetX,e.target,e.target.getBoundingClientRect().width)
        let v = e.offsetX / e.target.getBoundingClientRect().width * 100;
        // myseekbar.value=v;
        currentsong.currentTime = v * currentsong.duration / 100;
        // console.log(e)
    })
    let x = 0;

    let hamberger = document.querySelector(".hamberger")
    async function humber() {
        if (x) {
            document.querySelector(".box_container").addEventListener("click", () => {
                document.querySelector(".left").style.margin = "-150%"
                document.querySelector(".left").style.width = "276px"
                x = 0;
            });
        }
    }

    hamberger.addEventListener("click", (e) => {
        document.querySelector(".left").style.margin = "0px";
        x = 1;
        humber()
        console.log("x", x)
        document.querySelector(".left").style.width = "276px"
        document.querySelector(".left").style.height = "70%"
        console.log(Array.from(document.querySelectorAll(".songlist")))
        let classlist = Array.from(document.querySelectorAll(".songlist"))
        // document.getElementsByClassName("songlist").style.width = "386px"
        // console.log(e)

        for (const element of classlist) {
            element.style.width = "264px";
            element.style.height = "46px";
        }

    })

    let cross = document.querySelector(".cross")
    cross.addEventListener("click", () => {
        document.querySelector(".left").style.margin = "-150%"
        document.querySelector(".left").style.width = "326px"
        x = 0;
    });
    // console.log("x=" + x)

    document.querySelector(".previous").addEventListener("click", () => {
        let src = currentsong.src;
        let index = songlist.indexOf(src)
        if (index > 0) {
            playmusic(songlist[index - 1])
        }
    })
    document.querySelector(".next").addEventListener("click", () => {
        let src = currentsong.src;
        let index = songlist.indexOf(src);
        if (index < songlist.length) {
            playmusic(songlist[index + 1])
        }
    })


    
}

main_call();