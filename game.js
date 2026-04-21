const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
let score = 0;
let playerTop = window.innerHeight * 0.35;

// Player Movement
function move(dir) {
    if (dir === 'up' && playerTop > 10) playerTop -= 25;
    if (dir === 'down' && playerTop < gameContainer.offsetHeight - 50) playerTop += 25;
    player.style.top = playerTop + 'px';
}

document.getElementById('upBtn').addEventListener('touchstart', (e) => { e.preventDefault(); move('up'); });
document.getElementById('downBtn').addEventListener('touchstart', (e) => { e.preventDefault(); move('down'); });

// Shooting Logic
function shoot() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.top = (playerTop + 18) + 'px';
    bullet.style.left = '60px';
    gameContainer.appendChild(bullet);

    let bulletMove = setInterval(() => {
        let left = parseInt(bullet.style.left);
        bullet.style.left = (left + 10) + 'px';

        // Check for collision with enemies
        let enemies = document.getElementsByClassName('enemy');
        for (let enemy of enemies) {
            if (isColliding(bullet, enemy)) {
                enemy.remove();
                bullet.remove();
                clearInterval(bulletMove);
                score += 10;
                scoreElement.innerText = score;
            }
        }

        if (left > window.innerWidth) {
            clearInterval(bulletMove);
            bullet.remove();
        }
    }, 10);
}

document.getElementById('shootBtn').addEventListener('touchstart', (e) => { e.preventDefault(); shoot(); });

// Enemy Spawning
function spawnEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.top = Math.random() * (gameContainer.offsetHeight - 40) + 'px';
    enemy.style.right = '-50px';
    gameContainer.appendChild(enemy);

    let enemyMove = setInterval(() => {
        let right = parseInt(enemy.style.right);
        enemy.style.right = (right + 4) + 'px';

        if (right > window.innerWidth) {
            clearInterval(enemyMove);
            enemy.remove();
        }
    }, 20);
}

setInterval(spawnEnemy, 1500);

// Collision Detection Helper
function isColliding(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(aRect.top > bRect.bottom || aRect.bottom < bRect.top || aRect.right < bRect.left || aRect.left > bRect.right);
                                                  }
