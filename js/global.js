(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
var spelldata;
marmottajax("js/spelldata.json").then(function(content) {
    spelldata = JSON.parse(content);
    spelldata = spelldata.spelldata;
    // console.log(spelldata);
});
var player;
var Players = [];
var VERSION = "Alpha 0.1.6",
    WIDTH = 1280,
    HEIGHT = 720,
    GROUND = {
        x: -5000,
        y: HEIGHT - 50,
        width: 10000,
        height: 50
    };
var Spells = [],
    screens = [true, false, false],
    Speed = 6;
var spellTimer = 0;
var world = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
var stage = new pixicam.World({
    screenWidth: WIDTH,
    screenHeight: HEIGHT,
    width: 50000,
    height: 720,
    x: 0
  });
var camera = stage.camera;

var container = document.createElement('div');
var text = new PIXI.Text(VERSION, {
    font: '48px VT323',
    fill: 0xff1010,
    align: 'center'
});
text.x = 10;
text.y = 10;
var splashscreen = new PIXI.Sprite(splash);

document.body.appendChild(container);
container.appendChild(renderer.view);
renderer.view.style.cssText = "border: 1px solid black; width: " + 64 + "%; height: " + 36 + "%;";
container.style.cssText = "text-align: center;";
world.addChild(splashscreen);
world.addChild(text);
setInterval(function() {
    if (screens[1]) player.regen();
}, 1000);
var multi;
var filterStrength = 10;
var frameTime = 0,
    lastLoop = new Date,
    thisLoop;
var biasStrength = 0.003;
var spellIconMap;
var shotTaken = false;
