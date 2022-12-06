const canvas = document.querySelector(".my-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const mouse = {
  x: undefined,
  y: undefined,
};

class Circle {
  constructor(x, y, radius, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.opacity = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(190, 190, 190, ${this.opacity})`;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  interacteWithMouse() {
    const range = 30;

    if (this.x - mouse.x < range) {
      this.x += 3;
    } else if (this.x - mouse.x > -range) {
      this.x -= 3;
    } else if (this.y - mouse.y < range) {
    }
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }

    if (this.x > innerWidth) this.x = innerWidth;
    if (this.y > innerHeight) this.y = innerHeight;

    this.x += this.vx;
    this.y += this.vy;

    this.draw();
  }
}

class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }

  update() {
    this.draw();
  }
}

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  updateCircles();
};

const circlesArray = [];

function createCircles() {
  for (let i = 0; i < 100; i++) {
    const radius = Math.random() + 1;
    const vx = Math.random() * 1;
    const vy = Math.random() * 1;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;

    circlesArray.push(new Circle(x, y, radius, vx, vy));
  }
}

createCircles();

function updateCircles() {
  circlesArray.forEach((circle) => {
    circle.update();
  });
}

function drawLines() {
  const x1 = circlesArray[i].x;
  const y1 = circlesArray[i].y;
  const x2 = circlesArray[i + 1].x;
  const y2 = circlesArray[i + 1].y;
  const line = new Line(x1, y1, x2, y2);
  line.draw();
}

animate();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseout", (e) => {
  mouse.x = undefined;
  mouse.y = undefined;
});
