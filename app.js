const canvas = document.querySelector("canvas");
const select = document.querySelector("select");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

let playerState = "idle";

select.addEventListener("change", e => {
    playerState = e.target.value;
});

const playerImage = new Image();
playerImage.src = "./images/player.png";
const spriteWidth = 100;
const spriteHeight = 91.3;
let gameFrame = 0;
const staggerFrames = 5;  
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    },
];
animationStates.forEach((state, idx) => {
    let frames = {
        loc: []
    };

    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = idx * spriteHeight;
        frames.loc.push({
            x: positionX,
            y: positionY
        });
        spriteAnimations[state.name] = frames;
    }
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, CANVAS_WIDTH / 2.5, CANVAS_HEIGHT / 2.5, spriteWidth * 1.2, spriteHeight * 1.2);

    // if (gameFrame % staggerFrames === 0) {
    //     if (frameX < 6) {
    //         frameX++;
    //     } else {
    //         frameX = 0;
    //     }
    // }
    
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();