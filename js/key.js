var spellString = "";
var lastSpellKey = 0;
var spellID = 0;
var keyUp = [];
var map = [];
onkeydown = onkeyup = function (e) {
    e = e || event; //IE
    map[e.keyCode] = e.type == 'keydown';
    keyUp[e.keyCode] = e.type == 'keyup';
    if (screens[0]) {
        if (map[13]) {
            screens[0] = false;
            screens[1] = true;
        }
    } else {
        if (map[83] && !player.inShot && map[87] && map[68] && player.g) { //Shoot + Jump + Right
            player.shoot();
            player.inShot = true;
            player.right = true;
            player.dx = 5;
            player.g = false;
            player.dy = 10;
        } else if (map[83] && !player.inShot && map[87] && map[65] && player.g) { //Shoot + Jump + Left
            player.shoot();
            player.inShot = true;
            player.dx = -5;
            player.right = false;
            player.dy = 10;
            player.g = false;
        } else if (map[83] && !player.inShot && map[68]) { //Shoot + Right
            player.shoot();
            player.inShot = true;
            player.dx = 5;
            player.right = true;
        } else if (map[83] && !player.inShot && map[65]) { //Shoot + Left
            player.shoot();
            player.inShot = true;
            player.dx = -5;
            player.right = false;
        } else if (map[87] && map[68] && player.g) { //Jump + Right
            player.dx = 5;
            player.right = true;
            player.dy = 10;
            player.g = false;
            player.inShot = false;
        } else if (map[87] && map[65] && player.g) { //Jump + Left
            player.dx = -5;
            player.right = false;
            player.dy = 10;
            player.g = false;
            player.inShot = false;
        } else if (map[83] && !player.inShot && map[87] && player.g) { //Shoot + Jump
            player.shoot();
            player.inShot = true;
            player.dy = 10;
            player.g = false;
            player.dx = 0;
        } else if (map[68]) { //Right
            player.dx = 5;
            player.right = true;
            player.inShot = false;
        } else if (map[65]) { //Left
            player.dx = -5;
            player.right = false;
            player.inShot = false;
        } else if (map[87] && player.g) { //Jump
            player.dy = 10;
            player.g = false;
            player.dx = 0;
            player.inShot = false;
        } else if (map[83] && !player.inShot) { //Shoot
            player.shoot();
            player.inShot = true;
            player.dx = 0;
        } else {
            player.dx = 0;
            player.inShot = false;
        }
    }
    
    if (screens[1]) {
        if (spellString.length >= 6 ) {
            spellID = getSpell(spellString);
            spellString = "";
            lastSpellKey = 0;
        } else {
            if (keyUp[85] && lastSpellKey == 1) {
                lastSpellKey = 0;
            } else if (keyUp[73] && lastSpellKey == 2) {
                lastSpellKey = 0;
            } else if (keyUp[79] && lastSpellKey == 3) {
                lastSpellKey = 0;
            } else if (keyUp[80] && lastSpellKey == 4) {
                lastSpellKey = 0;
            }

            if (map[85] && (lastSpellKey != 1)) {
                spellString += "U ";
                lastSpellKey = 1;
            } else if (map[73] && (lastSpellKey != 2)) {
                spellString += "I ";
                lastSpellKey = 2;
            } else if (map[79] && (lastSpellKey != 3)) {
                spellString += "O ";
                lastSpellKey = 3;
            } else if (map[80] && (lastSpellKey != 4)) {
                spellString += "P ";
                lastSpellKey = 4;
            } 
        }

        if (keyUp[16]) {
            spellString = "";
            lastSpellKey = 0;
            for (i in icons) { icons[i].texture = PIXI.Texture.EMPTY; }
            keyUp[16] = false;
        }
    }
}
