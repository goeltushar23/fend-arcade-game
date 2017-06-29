/**
 * Enemy Class:
 * for defining Enemies our player must avoid
 */
var Enemy = function() {
    // Enemy Image Resource
    this.sprite = 'images/enemy-bug.png';

    // Setting Enemy Location
    this.setLocation();

    // Setting Enemy speed
    this.setSpeed();
};

Enemy.prototype.setLocation = function() {
    // Randomly choosing y for the 3 brick rows
    this.initialLocation = { x: -101, y: 41.5 + Math.floor((Math.random() * 3)) * 83 };

    // Setting Enemy x and y Coordinates
    this.x = this.initialLocation.x;
    this.y = this.initialLocation.y;
};

Enemy.prototype.setSpeed = function() {
    // Randomly Choosing Speeds
    this.speed = 120 + Math.floor((Math.random() * 4) + 1) * 30;
};

/**
 * Update the enemy's position, required method for game
 * @param {float} dt: a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // Update the enemy location:
    // Multiplying any movement by the dt parameter which will ensures 
    // that the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.setLocation();
        this.setSpeed();
    }

    // Handle collision with the Player
    checkCollisions(this);
};

/**
 * Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.setLocation();
    this.setSpeed();
};

/**
 * Player Class:
 * Our main Player will be instantiated using this Class
 */
var Player = function() {
    // Player Image Resource
    this.sprite = 'images/char-boy.png';

    // Setting Player Location
    this.setLocation();
};

Player.prototype.setLocation = function() {
    // this variable helps in resetting
    this.initialLocation = { x: 202.5, y: 373.5 };

    // setting the Player's intial location
    this.x = this.initialLocation.x;
    this.y = this.initialLocation.y;
};

Player.prototype.update = function() {
    // pass: Not needed
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Receives the pressed keyCode and move the Player according to that
 * @param  {integer} keyCode
 */
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
        this.x -= 101; // move left
    } else if (keyCode === 'up') {
        this.y -= 83; // move up
    } else if (keyCode === 'right') {
        this.x += 101; // move right
    } else if (keyCode === 'down') {
        this.y += 83; // move down
    } else if (keyCode === 'reset') {
        resetGame(); // resets the game
        return;
    }

    // Checking that Player should not go off Screen
    this.x = this.x < 0 ? 0 : this.x;
    this.x = this.x > 404 ? 404 : this.x;
    this.y = this.y > this.initialLocation.y ? this.initialLocation.y : this.y;

    // If player reached water then reset the game
    if (this.y < 41.5) {
        this.reset();
        pauseGame();
        setTimeout(function() {
            displayMessage('You Won!', 'success');
        }, 100);
    }
};

/**
 * Resets the Player to Start Point
 */
Player.prototype.reset = function() {
    this.setLocation();
};

var checkCollisions = function(enemyObj) {
    if (enemyObj.y === player.y && enemyObj.x + 75 >= player.x && enemyObj.x <= player.x + 75) {
        player.reset();
        pauseGame();

        setTimeout(function() {
            displayMessage('You Lost!', 'error');
        }, 100);
    }
};

/**
 * Displays the message on the canvas
 * @param  {string} message:Message to be displayed
 * @param  {string} type: success/error
 */
var displayMessage = function(message, type) {
    ctx.font = '40px Comic Sans MS';
    ctx.textAlign = 'center';

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 50, 505, 535);

    ctx.globalAlpha = 1.0;

    if (type === 'success')
        ctx.fillStyle = 'orange';
    else if (type === 'error')
        ctx.fillStyle = 'red';
    else
        ctx.fillStyle = 'white';

    ctx.fillText(message, 252.5, 303);
    ctx.fillText('Press `r` to restart', 252.5, 353);
};


// Now instantiating our objects.
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        82: 'reset'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
