// โหลด YouTube IFrame API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// ตัวแปรสำหรับเก็บตัวเล่น
var player;

// ฟังก์ชันที่ YouTube API จะเรียกเมื่อพร้อม
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'VN7NAOcMpl0', // แทนที่ VIDEO_ID ด้วย ID ของวิดีโอ YouTube
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

// เมื่อตัวเล่นพร้อม
function onPlayerReady(event) {
    console.log("Player is ready!");
    event.target.playVideo(); // เล่นวิดีโอ
    event.target.setVolume(20);
}

document.addEventListener('click', function() {
    if (player && player.playVideo) {
        player.unMute(); // เปิดเสียง
        player.playVideo(); // เล่นวิดีโอ
    }
});