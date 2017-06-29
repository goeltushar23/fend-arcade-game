// Enemies our player must avoid
var Enemy = function() {
    // Enemy Image Resource
    this.sprite = 'images/enemy-bug.png';

    // setting the enemy intial location
    this.initialLocation = { x: 0, y: 101 }; // this variable helps in resetting

    this.x = this.initialLocation.x;
    this.y = this.initialLocation.y;

    // setting the enemy speed
    // this.speed = 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // updates the enemy location
    this.x *= dt;

    // handles collision with the Player
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    // setting the enemy intial location
    this.initialLocation = { x: 250, y: 505 }; // this variable helps in resetting

    this.x = this.initialLocation.x;
    this.y = this.initialLocation.y;
};

Player.prototype.update = function(dt) {
    // TODO: 
    // similar to Enemy Update method
    this.x *= dt

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Receives the pressed keyCode and move the Player according to that
 * @param  {integer} keyCode
 */
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 37)
        this.x -= 101; // move left
    else if (keyCode === 38)
        this.y -= 101; // move up
    else if (keyCode === 39)
        this.x += 101; // move right
    else if (keyCode === 40)
        this.y += 101; // move down

    // Checking that Player should not go off Screen
    this.x = this.x < 0 ? 0 : this.x;
    this.x = this.x > 404 ? 404 : this.x;
    this.y = this.y > 505 ? 505 : this.y;

    // if player reached water then reset the game
    this.y = this.y < 202 ? this.reset() ? this.y;
}

/**
 * Resets the Player to Start Point
 */
Player.protype.reset = function() {
    this.x = this.initialLocation.x;
    this.y = this.initialLocation.y;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// TODO:


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
