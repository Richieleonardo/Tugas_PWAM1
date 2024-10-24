

//Make level span 
const divleft = document.querySelector('#left-side');
const divLevel = document.querySelector('#left-side .header .level');
const levelSpan = document.createElement("span");
levelSpan.innerText = "Level";
levelSpan.className = "level-indicator";



//Description for level
const description = document.createElement("p");
description.className = "description";
description.innerText = "Berikut merupakan tempat untuk meletakkan deskripsi dari tiap level";
divleft.appendChild(description);

//Code editor for user to input
const codeblock = document.createElement("div");
codeblock.className = "code-editor";

const dummyNavbar = document.createElement("nav");
dummyNavbar.className = "file-name"
dummyNavbar.innerText = "main.js";
codeblock.appendChild(dummyNavbar);
divleft.appendChild(codeblock);

function storeTextAreaInput() {
    let val = textArea;
    console.log(val);
}


const textArea = document.createElement("textarea");
textArea.id = "code-input";
textArea.oninput = "storeTextAreaInput()"
textArea.placeholder = "Type your code...";
textArea.spellcheck = false;
codeblock.appendChild(textArea);

//IMPORTANT FOR EACH LEVEL
const beforeArea = document.createElement("p");
beforeArea.id = "before-template";
beforeArea.innerText = "ini text sebelum text textArea";
codeblock.insertBefore(beforeArea, textArea);

const afterArea = document.createElement("p");
afterArea.id = "after-template";
afterArea.innerText = "}";
codeblock.appendChild(afterArea);

const divButton = document.createElement("div");
divButton.className = "button-container";
codeblock.appendChild(divButton);

const childDivButton1 = document.createElement("div");
childDivButton1.className = "button-container-kiri";
divButton.appendChild(childDivButton1); 

const childDivButton2 = document.createElement("div");
childDivButton2.className = "button-container-kanan";
divButton.appendChild(childDivButton2); 

//Make button to go to next level
const button1 = document.createElement("button");
button1.className = "next-level";
button1.innerText = "Next";
button1.disabled = true;

//Make button to submit the code created by user
const button2 = document.createElement("button");
button2.className = "submit";
button2.innerText = "Submit";
childDivButton1.appendChild(button2);

const button3 = document.createElement("button");
button3.className = "reset";
button3.innerText = "Reset";
childDivButton2.appendChild(button3)
childDivButton2.appendChild(button1);

button3.addEventListener('click', function() {
    location.reload();
});


/* GAME LOGIC */

//Canvas for animation (gameplay logic)
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d"); //Canvas context
canvas.style.background = "black";
canvas.width = 64*10;
canvas.height= 64*10;


class Boundary{
    static width = 64;
    static height = 64;
    constructor({position, image}, type) {
        this.position = position;
        this.width = 64;
        this.height = 64;
        this.image = image;
        this.type = type;
    }

    draw() {
        if(this.image == null){ //not working remove morning
            ctx.fillStyle = "blue";
            ctx.fillRect(this.position.x, this.position.y, 
                this.width, this.height);
        }
        else{
            ctx.drawImage(this.image, this.position.x, this.position.y, 64, 64);
        }
        
    }
}

//Crate Player
class Player{
    constructor({position, targetPosition, velocity}) {

        this.position = position;
        this.targetPosition = targetPosition;
        this.velocity = velocity;
        this.radius = 20;
        this.energy = 0;
        this.moving = false;
        this.movementQueue = [];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 
                this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }
    
    update() {
        this.draw();
        console.log("ble")
        if (player.moving) {
            console.log("bla")
            // Move horizontally
            if (player.velocity.x !== 0) {
                if (Math.abs(player.targetPosition.x - player.position.x) <= Math.abs(player.velocity.x)) {
                    player.position.x = player.targetPosition.x; // Snap to target
                    player.velocity.x = 0; // Stop horizontal movement
                } else {
                    player.position.x += player.velocity.x; // Continue moving
                }
            }
    
            // Move vertically
            if (player.velocity.y !== 0) {
                if (Math.abs(player.targetPosition.y - player.position.y) <= Math.abs(player.velocity.y)) {
                    player.position.y = player.targetPosition.y; // Snap to target
                    player.velocity.y = 0; // Stop vertical movement
                } else {
                    player.position.y += player.velocity.y; // Continue moving
                }
            }
    
            // Check if both velocities are zero (meaning the player has reached the target)
            if (player.velocity.x === 0 && player.velocity.y === 0) {
                player.moving = false; // Allow the player to move again
                processNextMove(); // Start the next move if available
            }
        }
    }

    setEnergy(value){
        this.energy = value;
        console.log("This energy", this.energy);
    }
}

//Collectible for conditional
class Pellet{
    constructor({position}) {
        this.position = position;
        this.radius = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 
                this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}


//Sample map Level 1 (Tileset 1 = Barrier, Tileset 0 = path[walkable])
const map1 = [
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','1','1','1','1','1',' ',' ',' '],
    [' ',' ','1','p',' ','2','1',' ',' ',' '],
    [' ',' ','1','1','1','1','1',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
]

const map2 = [
    ['1','1','1','1','1','1','1','1','1','1'],
    ['1','p',' ',' ',' ',' ',' ',' ','1','1'],
    ['1',' ','.',' ',' ',' ',' ',' ','1','1'],
    ['1',' ',' ',' ',' ',' ',' ',' ','1','1'],
    ['1','1','1','1','1','1',' ',' ','1','1'],
    ['1',' ',' ',' ',' ',' ',' ',' ','1','1'],
    ['1',' ',' ',' ',' ',' ',' ',' ','1','1'],
    ['1',' ','.','.',' ',' ',' ',' ',' ','1'],
    ['1','1','1','1','1','1','1','1','2','1'],
    ['1','1','1','1','1','1','1','1','1','1'],
];

//LEVEL OBJECT
const levels = [
    {
        levelNumber: 1,
        map: map1,
        description: 
        `Selamat datang di Deco-Think, sebuah virtual lab kecil yang menggunakan permainan sebagai media pembelajaran sederhana agar kalian dapat memahami pemrograman dasar. 
        Sebelum kita memulai, saya akan mengajarkan anda cara bermain. 
        Kalian dapat menggunakan kolom input dibawah untuk mengetikkan instruksi agar bola kuning disebelah kanan dapat berpindah.
        Gunakan instruksi <code>move(direction)</code> untuk menggerakkan bola.
        Harap diperhatikan kalau kamu memiliki batas energi untuk bergerak, jika energi kamu 0, kamu tidak akan bisa bergerak.
        Jadi kamu harus berhati-hati. Untuk fungsi lebih lengkap akan diberikan di bawah:\n
        <ul>
        <li><code>move('right')</code>: Bola bergerak ke kanan</li>
        <li><code>move('left')</code>: Bola bergerak ke kiri</li>
        <li><code>move('up')</code>: Bola bergerak ke atas</li>
        <li><code>move('down')</code>: Bola bergerak ke bawah</li>
        <li><code>player.setEnergy(value)</code>: Value merupakan integer(boleh berupa ekspresi). Mengubah nilai energy player.
        </ul>
        `,
        beforetemplate: 
        `a=1\nb=1\n//Ketikan player.setEnergy(a+b) untuk menbambahkan energi\nfunction main() {
        `,
        aftertemplate:
        `\nsetEnergy(c)\n}
        `

    },
    {
        levelNumber: 2,
        map: map2,
        description: `Nah, sekarang kamu sudah mengetahui cara untuk bergerak, 
        untuk level 2 ini kamu akan diberikan energy yang banyak, silahkan bereksperimen dengan command move().
        Sebagai perhatian box biru disekitar player (bola kuning) jika tertabrak akan menyebabkan player kalah
        dan mengubah level menjadi level 1. Jadi berhati-hatilah saat memberikan instruksi <code>move()</code>.
        Berikut instruksi yang dapat kamu gunakan :
        <ul>
        <li><code>move('right')</code>: Bola bergerak ke kanan</li>
        <li><code>move('left')</code>: Bola bergerak ke kiri</li>
        <li><code>move('up')</code>: Bola bergerak ke atas</li>
        <li><code>move('down')</code>: Bola bergerak ke bawah</li>
        <li><code>player.setEnergy(value)</code>: Value merupakan integer(boleh berupa ekspresi). Mengubah nilai energy player.
        </ul>
        Sebagai tambahan opsional, kamu bisa mengambil pellet berwarna putih yang tersebar di map.
        Selamat berekplorasi.
        `,
        beforetemplate: 
        `function main() {
        `,
        aftertemplate:
        `}
        `
    }
]

const pellets = []
const boundaries = [];
const player = new Player({
    position: {
        x: 0,
        y: 0
    },
    targetPosition: {
        x: (Boundary.width) + Boundary.width/2,
        y: (Boundary.height*2) + Boundary.width/2
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const energyCount = document.createElement("p");
energyCount.innerText = "Initial Energy = " + player.energy;
divleft.insertBefore(energyCount, codeblock);
energyCount.style.fontSize = "1.25em";
energyCount.style.fontWeight = "bold";

function createImage(src){
    const image = new Image();
    image.src = src;
    return image;
}

//Draw map (FIRST LEVEL)
let idx = 0
let currlevel = levels[idx]; //Initial level
button1.addEventListener('click', function (){
    console.log('ceklek' + idx);
    if(idx < levels.length-1){
        idx += 1;
    }
    else{
        idx = 0;
    }
    loadLevel(idx);
});

//Counter level 
const levelLabel = document.createElement("span");
levelLabel.className = "levelLabel";
let levelNum = currlevel.levelNumber;

//Change layout
function loadLevel(idx) {
    const existingWinText = divleft.querySelector('#win-text');
    if (existingWinText) {
        existingWinText.remove();
    }
    boundaries.length = 0;
    pellets.length = 0;

    //LAYOUT LEFT-SIDE
    currlevel = levels[idx];
    description.innerHTML = currlevel.description;
    beforeArea.innerText = currlevel.beforetemplate;
    afterArea.innerText = currlevel.aftertemplate;
    
    levelNum = idx+1;
    levelLabel.innerText = " " + levelNum;
    divLevel.appendChild(levelSpan);
    levelSpan.appendChild(levelLabel);
    if(idx+1 === 1){
        player.setEnergy(0);
        energyCount.innerText = "Initial Energy = " + player.energy;
        textArea.value = "//Tulis kodemu disini\n\nmove('right')\nmove('right')";
    }
    if(idx+1 === 2){
        textArea.value = null;
        textArea.style.height = "350px";
        player.setEnergy(100);
        energyCount.innerText = "Initial Energy = " + player.energy;
    }
    currlevel.map.forEach((row, i) => {
        row.forEach((tileset, j) => {
            switch (tileset){
                case '1':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./img/block.png'),
                        }, 1)
                    )
                    break;
                
                case '2': // not working
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./img/finish.png'),
                        }, 2)
                    )
                    break;
                
                case '.':
                    pellets.push(
                        new Pellet({
                            position: {
                                x: Boundary.width * j + Boundary.width/2,
                                y: Boundary.height * i + Boundary.height/2
                            }
                        })
                    )
                    break;
                case 'p':
                    player.position.x = Boundary.width * j + Boundary.width/2;
                    player.position.y = Boundary.height * i + Boundary.height/2
                    break;
            }
        })
    })
}

loadLevel(0);


//GET COMMAND AND PUSH TO MOVEMENT QUEUE
function move(direction){
    if(player.energy > 0){
        player.movementQueue.push(direction);
        console.log(player.movementQueue);
    }
    processNextMove();
}

//MAIN MOVE LOGIN
function processNextMove() {
    // console.log("This shit is running");
    if (player.energy > 0 && !player.moving) {
        const direction = player.movementQueue.shift();
        player.moving = true; // Prevent further movement until the current move is finished
        switch (direction) {
            case 'left':
                player.targetPosition.x = player.position.x - 64;
                player.velocity.x = -4; // 4 pixels per frame, adjust as needed
                player.energy--;
                break;
            case 'right':
                player.targetPosition.x = player.position.x + 64;
                player.velocity.x = 4;
                player.energy--;
                break;
            case 'up':
                player.targetPosition.y = player.position.y - 64;
                player.velocity.y = -4;
                player.energy--;
                break;
            case 'down':
                player.targetPosition.y = player.position.y + 64;
                player.velocity.y = 4;
                player.energy--;
                break;
        }
        
    }
}

//LEVEL 1
let a = 1;
let b = 1;
//GET USER INPUT 
let input;
button2.addEventListener('click', function getText(){
    input = textArea.value;
    let func = new Function(input);
    func();
    energyCount.innerText = "Final Energy = " + player.energy;
})

//ALERT 
function gameover(){
    const existingLoseText = divleft.querySelector('#lose-text');
    if (existingLoseText) {
        existingLoseText.remove();
    }

    const losetext = document.createElement('h1');
    losetext.id="lose-text";
    losetext.innerText = "Kamu kalah";
    divleft.appendChild(losetext);
    setTimeout(() => {location.reload()}, 3000);
}

function win(){
    // Remove existing win text (if any)
    const existingWinText = divleft.querySelector('#win-text');
    if (existingWinText) {
        existingWinText.remove();
    }

    // Add new win text
    const wintext = document.createElement('h1');
    wintext.id ="win-text"
    wintext.innerText = "Kamu menang, tekan next untuk continue";
    divleft.appendChild(wintext);
    button1.disabled = false;
}

// ANIMATION
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // updatePlayerPosition();
    pellets.forEach((pellet, i) => {
        pellet.draw();

        //COLLISION CHECK 
        if (Math.hypot(
            pellet.position.x - player.position.x, 
            pellet.position.y - player.position.y) < 
            pellet.radius + player.radius
        ){
            console.log("peletletlet")
            pellets.splice(i, 1);
        }
    })

    boundaries.forEach((boundary) =>{
        boundary.draw();

        //COLLISION CHECK
        if(
            player.position.y - player.radius <= boundary.position.y + boundary.height &&
            player.position.x + player.radius >= boundary.position.x && 
            player.position.y + player.radius >= boundary.position.y &&
            player.position.x - player.radius <= boundary.position.x + boundary.width){
                console.log("circle collide");
                if(boundary.type == 2){
                    console.log('win');
                    win();
                }
                else{
                    gameover();
                }
        }
    })
    //Draw player
    player.update();
    
}
animate();


