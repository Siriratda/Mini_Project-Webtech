const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

let playerPos = { x: 5, y: 5 }; // ตำแหน่งเริ่มต้นของตัวละคร
let obstacles = [];
let score = 0; // ตัวนับคะแนน
let greenObject = { x: -1, y: -1 }; // วัตถุสีเขียว
let greenObjectTimer = 0; // ตัวนับเวลาสำหรับวัตถุสีเขียว
const gridSize = 40;
let gameOver = false;
let startTime = Date.now(); // เวลาเริ่มเกม
let elapsedTime = 0; // เวลาที่ผ่านไป
let countdown = 3; // ตัวนับถอยหลัง 3 วินาที
let isCountingDown = true; // สถานะการนับถอยหลัง

// ความเร็วของสิ่งกีดขวาง (คงที่ตลอดเกม)
const obstacleSpeed = 0.05;

// สร้างสิ่งกีดขวางแบบสุ่ม
function generateRandomObstacles() {
    obstacles = [];
    for (let i = 0; i < 8; i++) { // สร้างสิ่งกีดขวาง 10 ชิ้น
        let x, y;
        do {
            x = Math.floor(Math.random() * 15); // สุ่มตำแหน่ง x (0-14)
            y = Math.floor(Math.random() * 10); // สุ่มตำแหน่ง y (0-9)
        } while (x === playerPos.x); // ตรวจสอบว่า x ไม่เท่ากับตำแหน่งเริ่มต้นของตัวละคร

        obstacles.push({
            x: x,
            y: y,
            dy: obstacleSpeed // ใช้ความเร็วคงที่
        });
    }
}

// สร้างวัตถุสีเขียวแบบสุ่ม
function generateGreenObject() {
    greenObject.x = Math.floor(Math.random() * 15); // สุ่มตำแหน่ง x (0-14)
    greenObject.y = Math.floor(Math.random() * 10); // สุ่มตำแหน่ง y (0-9)
    greenObjectTimer = 5; // ตั้งเวลา 5 วินาที
}

function clearGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function renderPlayer(pos) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(pos.x * gridSize, pos.y * gridSize, gridSize, gridSize);
}

function renderObstacle(obstacle) {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x * gridSize, obstacle.y * gridSize, gridSize, gridSize);
}

function renderGreenObject() {
    if (greenObject.x >= 0 && greenObject.y >= 0) {
        ctx.fillStyle = 'green';
        ctx.fillRect(greenObject.x * gridSize, greenObject.y * gridSize, gridSize, gridSize);
    }
}

function checkCollision() {
    for (let obstacle of obstacles) {
        // ตรวจสอบว่าผู้เล่นและสิ่งกีดขวางอยู่ในตำแหน่งใกล้กัน (ภายในระยะ 0.5 ช่อง)
        if (
            Math.abs(obstacle.x - playerPos.x) < 0.5 &&
            Math.abs(obstacle.y - playerPos.y) < 0.5
        ) {
            return true; // ชนสิ่งกีดขวาง
        }
    }
    return false; // ไม่ชน
}

function checkGreenObjectCollision() {
    // ตรวจสอบว่าผู้เล่นและวัตถุสีเขียวอยู่ในตำแหน่งเดียวกัน
    if (
        Math.abs(greenObject.x - playerPos.x) < 0.5 &&
        Math.abs(greenObject.y - playerPos.y) < 0.5
    ) {
        score += 1; // เพิ่มคะแนน
        generateGreenObject(); // สร้างวัตถุสีเขียวใหม่
    }
}

function updateGameArea() {
    if (gameOver) return;

    clearGameArea();

    // แสดงตัวนับถอยหลัง
    if (isCountingDown) {
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);

        // อัปเดตตัวนับถอยหลัง
        if (Date.now() - startTime >= 1000) {
            countdown -= 1;
            startTime = Date.now();
        }

        // เมื่อตัวนับถอยหลังหมด
        if (countdown <= 0) {
            isCountingDown = false;
            startTime = Date.now(); // รีเซ็ตเวลาเริ่มเกม
        }

        requestAnimationFrame(updateGameArea);
        return;
    }

    renderPlayer(playerPos);

    for (let obstacle of obstacles) {
        renderObstacle(obstacle);
    }

    // เคลื่อนที่สิ่งกีดขวางเฉพาะในแนวแกน Y
    for (let obstacle of obstacles) {
        obstacle.y += obstacle.dy; // เคลื่อนที่ในแกน y

        // ตรวจสอบขอบเขตและเปลี่ยนทิศทางหากชนขอบ
        if (obstacle.y < 0 || obstacle.y >= 10) {
            obstacle.dy *= -1; // เปลี่ยนทิศทางในแกน y
        }
    }

    // ตรวจสอบการชนกับสิ่งกีดขวาง
    if (checkCollision()) {
        gameOver = true;
        alert(`Game Over! Time survived: ${elapsedTime.toFixed(2)} seconds. Your score: ${score}. Press OK to restart.`);
        resetGame();
        return;
    }

    // อัปเดตวัตถุสีเขียว
    if (greenObjectTimer > 0) {
        greenObjectTimer -= 1 / 180; // ลดเวลาทุกเฟรม (180 เฟรมต่อวินาที)
    } else {
        generateGreenObject(); // สร้างวัตถุสีเขียวใหม่เมื่อหมดเวลา
    }

    // แสดงวัตถุสีเขียว
    renderGreenObject();

    // ตรวจสอบการชนกับวัตถุสีเขียว
    checkGreenObjectCollision();

    // อัปเดตเวลา
    elapsedTime = (Date.now() - startTime) / 1000; // คำนวณเวลาที่ผ่านไปในหน่วยวินาที

    // แสดงเวลาและคะแนน
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Time: ${elapsedTime.toFixed(2)}s`, 10, 30);
    ctx.fillText(`Score: ${score}`, 10, 60);

    requestAnimationFrame(updateGameArea);
}

function resetGame() {
    playerPos = { x: 5, y: 5 };
    generateRandomObstacles(); // สร้างสิ่งกีดขวางใหม่แบบสุ่ม
    generateGreenObject(); // สร้างวัตถุสีเขียวใหม่
    gameOver = false;
    startTime = Date.now(); // รีเซ็ตเวลาเริ่มเกม
    elapsedTime = 0; // รีเซ็ตเวลาที่ผ่านไป
    score = 0; // รีเซ็ตคะแนน
    countdown = 3; // รีเซ็ตตัวนับถอยหลัง
    isCountingDown = true; // เริ่มนับถอยหลังใหม่
    updateGameArea();
}

document.addEventListener('keydown', (event) => {
    if (gameOver || isCountingDown) return;

    switch (event.key) {
        case 'ArrowUp':
            if (playerPos.y > 0) playerPos.y -= 1;
            break;
        case 'ArrowDown':
            if (playerPos.y < 9) playerPos.y += 1;
            break;
        case 'ArrowLeft':
            if (playerPos.x > 0) playerPos.x -= 1;
            break;
        case 'ArrowRight':
            if (playerPos.x < 14) playerPos.x += 1;
            break;
    }
});

// document.getElementById('restartButton').addEventListener('click', resetGame);

// เริ่มเกมครั้งแรก
generateRandomObstacles();
generateGreenObject();
updateGameArea();