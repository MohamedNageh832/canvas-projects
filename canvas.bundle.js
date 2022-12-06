const canvas = document.querySelector(".canvas");
const mouse = {
  x: undefined,
  y: undefined,
};

const ctx = canvas.getContext("2d");
let ballsArray = [];
const colors = ["#F2F7A1", "#46C2CB", "#6D67E4"];
const gravity = 0.4;
const friction = 0.95;

/************************************** Canvas elements *********************************************/

class Circle {
  constructor(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.y + this.radius + this.vy > canvas.height) {
      this.vy = -this.vy * friction;
    } else {
      this.vy += gravity;
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.vx = -this.vx * friction;
    }

    this.x += this.vx;
    this.y += this.vy;

    this.draw();
  }
}

/************************************** Window events *********************************************/

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("resize", () => {
  init();
});

window.addEventListener("click", () => {
  init();
});

/************************************** Main functions *********************************************/

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  drawBalls();
}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ballsArray.forEach((ball) => ball.update());
}

function drawBalls() {
  ballsArray = [];

  for (let i = 0; i < 200; i++) {
    const radius = randomIntFromRange(1, 20);
    const x = randomIntFromRange(1, canvas.width - radius);
    const y = randomIntFromRange(1, canvas.height - radius);
    const vx = randomIntFromRange(-1, 1);
    const vy = randomIntFromRange(-1, 1);
    const color = randomColor(colors);
    ballsArray.push(new Circle(x, y, vx, vy, radius, color));
  }
}

/************************************** Utility functions *********************************************/

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min));
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

/************************************** Execution *********************************************/
init();
animate();
