// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // Random number from 2 to 4 to determine speed of enemy
    this.speed = Math.floor((Math.random() * 4) + 2);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 101 * this.speed * dt;
    //collision detection
    if (this.y == player.y - 18 && (this.x > player.x - 70 && this.x < player.x + 70)) {
        if (player.lives > 1) {
            player.lives -= 1;
            player.reset();
        }
        else {
            player.gameOver();
        }
    }
    
    // when the bug goes off the screen move it back to the other side
    if (this.x > 505) {
        this.reset();    
    }
};

Enemy.prototype.reset = function() {
    this.x = -100;
    var enemyRow = [54, 137, 220];
    this.y = enemyRow[Math.floor((Math.random() * 3))];
    this.speed = Math.floor((Math.random() * 4) + 2);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.lives = 3;
    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
}

Player.prototype.handleInput = function(key) {
    if (this.y > 0 && key === "up") {
        this.y -= 83;
    }
    if (this.y < 404 && key === "down") {
        this.y += 83;
    }
    if (this.x > 0 && key === "left") {
        this.x -= 101;
    }
    if (this.x < 404 && key === "right") {
        this.x += 101;
    }
    if (this.y < 50) {
        this.reset();
        this.updateScore();
    }
};

Player.prototype.updateScore = function(score) {
    this.score += score;
    $('#score').text(this.score);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

/*var allEnemies = [
    new Enemy(-100, 59, 100),
    new Enemy(-100, 145, 150),
    new Enemy(-100, 230, 200)
];

for (var i = 0; i < 5; i++) {
    var enemy = new Enemy (-100, (i + 1) * 83);
    allEnemies.push(enemy);
}*/

var allEnemies = [];
var enemyRow = [54, 137, 220];
for (var i = 0; i < 5; i++) {
    // always start at the same spot off canvas left
    var x = -100;
    var y = enemyRow[Math.floor(Math.random() *3)];
    var enemy = new Enemy (x, y);
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
//player starting location

var player = new Player(202, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
