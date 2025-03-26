// โหลด YouTube IFrame Player API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    console.log("YouTube API is ready!");
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'VN7NAOcMpl0', // ใช้ videoId จากลิงก์ YouTube
        playerVars: {
            'autoplay': 1, // เล่นอัตโนมัติ
            'mute': 1, // ปิดเสียงเพื่อให้ autoplay ทำงาน
            'controls': 0, // ซ่อน controls
            'modestbranding': 1, // ซ่อน branding
            'rel': 0, // ไม่แสดงวิดีโอที่เกี่ยวข้อง
            'showinfo': 0, // ซ่อนข้อมูลวิดีโอ
            'loop': 1, // เล่นวนซ้ำ
            'playlist': 'VN7NAOcMpl0' // ระบุ videoId เดียวกันเพื่อให้ loop ทำงาน
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    console.log("Player is ready!");
    event.target.playVideo(); // เล่นวิดีโอ
    event.target.setVolume(10);
}

// ให้ผู้ใช้คลิกเพื่อเริ่มเล่นวิดีโอ (หากต้องการเล่นโดยไม่ปิดเสียง)
document.addEventListener('click', function() {
    if (player && player.playVideo) {
        player.unMute(); // เปิดเสียง
        player.playVideo(); // เล่นวิดีโอ
    }
});

// รอให้หน้าเว็บโหลดเสร็จ
// รอให้หน้าเว็บโหลดเสร็จ
document.addEventListener("DOMContentLoaded", function () {
    // เลือก content-section และ hidden-text
    const contentSection = document.querySelector(".content-section");
    const hiddenText = document.querySelector(".hidden-text");

    // รอจนอนิเมชันเสร็จสิ้น (5 วินาที ตาม CSS animation)
    setTimeout(() => {
        hiddenText.classList.add("visible"); // แสดงข้อความ
    }, 5000); // 5 วินาที (ตรงกับเวลาของอนิเมชัน)
});