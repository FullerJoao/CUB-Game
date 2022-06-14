let context = document.querySelector("canvas").getContext("2d");

//ARCADE CUB game runner size.
context.canvas.height = 400;
context.canvas.width = 1220;

// Start the frame count at 1.
let frameCount = 1;

// Set the number of obstacles to match the current "level".
let obCount = frameCount;

// Create a collection to hold the generated x coordinates.
let obTriangles = [];

//Size of CUB.
let player = {
  height: 83,
  jumping: true,
  width: 23,
  x: 1300,
  xVelocity: 3,
  y: 3,
  yVelocity: 3
};

// Create the obstacles for each frame.
let nextFrame = () => {
// increase the frame / "level" count.
  frameCount++;
  
  for (let i = 0; i < obCount; i++) {
// Randomly generate the x coordinate for the top corner start of the triangles.
    obTriangle = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    obTriangles.push(obTriangle);
  }
}

let controller = {

  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    let key_state = (event.type == "keydown") ? true : false;
    switch (event.keyCode) {
      case 37:
        controller.left = key_state;
        break;
      case 38:
        controller.up = key_state;
        break;
      case 39:
        controller.right = key_state;
        break;
    }
  }
};

let loop = function () {

  if (controller.up && player.jumping == false) {
    player.yVelocity -= 35;
    player.jumping = true;
  }

  if (controller.left) {
    player.xVelocity -= 0.7;
  }

  if (controller.right) {
    player.xVelocity += 0.7;
  }

  player.yVelocity += 1.3;// gravity.
  player.x += player.xVelocity;
  player.y += player.yVelocity;
  player.xVelocity *= 0.9;// friction.
  player.yVelocity *= 0.9;// friction.

// if CUB is falling below floor line.
  if (player.y > 386 - 16 - 32) {
    player.jumping = false;
    player.y = 386 - 16 - 32;
    player.yVelocity = 0;
  }

// if CUB is going off the left of the screen.
  if (player.x < -20) {
    player.x = 1220;
  } else if (player.x > 1220) {// if CUB goes past right boundary.
    player.x = -20;
    nextFrame();
  }

// Creates the background sky for each frame.
  context.fillStyle = "#049CB8";
  context.fillRect(0, 0, 1220, 400); // x, y, width, height

//thin line top.
  context.fillStyle = "black";
  context.fillRect(0, 0, 1220, 8);

//thin line top.
  context.fillStyle = "white";
  context.fillRect(0, 3, 1220, 2);

//background.
  context.fillStyle = "green";
  context.fillRect(0, 360, 1220, 1000);

//sun.
  context.fillStyle = "black";
  context.fillRect(458, 28, 79, 76);

//sun.
  context.fillStyle = "red";
  context.fillRect(460, 30, 75, 72);

//sun.
  context.fillStyle = "orange";
  context.fillRect(460, 30, 73, 70);

//sun.
  context.fillStyle = "yellow";
  context.fillRect(460, 30, 65, 65);

//sun shadow.
  context.fillStyle = "grey";
  context.fillRect(460, 30, 15, 5);
// Posicao,Altura,Comprimento,Largura

//clouds.
  context.fillStyle = "black";
  context.fillRect(150, 30, 162, 32);
  context.fillStyle = "white";
  context.fillRect(150, 30, 160, 30);

//clouds.
  context.fillStyle = "black";
  context.fillRect(700, 30, 162, 32);
  context.fillStyle = "white";
  context.fillRect(700, 30, 160, 30);

//clouds.
  context.fillStyle = "black";
  context.fillRect(900, 85, 102, 32);
  context.fillStyle = "white";
  context.fillRect(900, 85, 100, 30);

//clouds.
  context.fillStyle = "black";
  context.fillRect(80, 85, 102, 32);
  context.fillStyle = "white";
  context.fillRect(80, 85, 100, 30);

//clouds.
  context.fillStyle = "black";
  context.fillRect(1050, 95, 52, 32);
  context.fillStyle = "white";
  context.fillRect(1050, 95, 50, 30);

  //clouds.
  context.fillStyle = "black";
  context.fillRect(1100, 33, 68, 32);
  context.fillStyle = "white";
  context.fillRect(1100, 33, 66, 30);

    //clouds.
    context.fillStyle = "black";
    context.fillRect(520, 77, 112, 32);
    context.fillStyle = "white";
    context.fillRect(520, 77, 110, 30);
  

  //clouds.
  context.fillStyle = "black";
  context.fillRect(300, 95, 52, 32);
  context.fillStyle = "white";
  context.fillRect(300, 95, 50, 30);

// Creates and fills the cube for each frame.
  context.fillStyle = "purple";
  context.beginPath();
  context.rect(player.x, player.y, player.width, player.height);
  context.fill();

// Create the obstacles for each frame.
// Set the standard obstacle height.
  let height = 225 * Math.cos(Math.PI / 6);
  
//First triangle.
  context.fillStyle = "black"; //for triangle color - the Alien.
  obTriangles.forEach((obTriangle) => {
    context.beginPath();
    context.moveTo(obTriangle, 380); // x = random, y = coor. on "ground"
    context.lineTo(obTriangle + 35, 385); // x = ^random + 20, y = coor. on "ground"
    context.lineTo(obTriangle + 17, 503 - height); // x = ^random + 10, y = peak of triangle
    
    context.closePath();
    context.fill();
  })
  
//Middle Triangle.
  context.fillStyle = "red"; //for triangle color - the Alien.
  obTriangles.forEach((obTriangle) => {
    context.beginPath();
    context.moveTo(obTriangle, 385); // x = random, y = coor. on "ground"
    context.lineTo(obTriangle + 35, 385); // x = ^random + 20, y = coor. on "ground"
    context.lineTo(obTriangle + 17, 510 - height); // x = ^random + 10, y = peak of triangle
  
    context.closePath();
    context.fill();
  })

//Last Triangle.
  context.fillStyle = "#c83349"; //for triangle color - the Alien.
  obTriangles.forEach((obTriangle) => {
    context.beginPath();
    context.moveTo(obTriangle, 385); // x = random, y = coor. on "ground"
    context.lineTo(obTriangle + 35, 385); // x = ^random + 20, y = coor. on "ground"
    context.lineTo(obTriangle + 17, 525 - height); // x = ^random + 10, y = peak of triangle
  
    context.closePath();
    context.fill();
  })

//Creates ground for every frame.
//Grass.
  context.strokeStyle = "#7E481C";
  context.lineWidth = 30;
  context.beginPath();
  context.moveTo(0, 385);
  context.lineTo(1220, 385);
  context.stroke();

//Ground.
  context.strokeStyle = "#43B047";
  context.lineWidth = 22;
  context.beginPath();
  context.moveTo(0, 377);
  context.lineTo(1220, 377);
  context.stroke();

//Thin line for details.
  context.strokeStyle = "black";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(0, 385);
  context.lineTo(1220, 385);
  context.stroke();

//Thin lines for details.
  context.strokeStyle = "white";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, 385);
  context.lineTo(1220, 385);
  context.stroke();

//Call para dar update no browser para desenhar novamente.
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

    