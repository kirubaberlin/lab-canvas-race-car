window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

function startGame() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const carWidth = 50;
  const carHeight = 100;
  const offsetY = 50;
  let carX = canvas.width / 2;
  let carY = canvas.height - carHeight - 10;

  const car = new Car("./images/car.png", carWidth, carHeight, offsetY, ctx);

  const background = new Image();
  background.src = "./images/road.png";
  background.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    car.draw(car.x, carY);

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        car.setDirection(-1);
      } else if (event.key === "ArrowRight") {
        car.setDirection(1);
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        car.setDirection(0);
      }
    });

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      car.update();
      car.draw(car.x, carY);
      requestAnimationFrame(gameLoop);

    }
    gameLoop();
  };
}

class Car {
  constructor(imageSrc, width, height, offsetY, ctx) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = width;
    this.height = height;
    this.offsetY = offsetY;
    this.speed = 5;
    this.direction = 0;
    this.ctx = ctx;
    this.x = 0;
  }

  draw(x, y) {
    this.x = x;
    this.ctx.drawImage(
      this.image,
      this.x - this.width / 2,
      y - this.height / 2,
      this.width,
      this.height
    );
  }

  setDirection(direction) {
    this.direction = direction;
  }

  update() {
    this.x += this.direction * this.speed;
  }
}
class Obstacle {//creating obstacle constructor
  constructor(x, width, height, speed) {
    this.x = x;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  draw() {//styling obstacle
    ctx.fillStyle = red;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed;
  }
}

const obstacleWidth = 100;//obstacle dimensions
const obstacleHeight = 20;
const obstacleSpeed = 2;
let obstacles = [];

function createObstacle() {//obstacle random movement
  const x = Math.random() * (canvas.width - obstacleWidth);
  const obstacle = new Obstacle(x, obstacleWidth, obstacleHeight, obstacleSpeed);
  obstacles.push(obstacle);
}
setInterval(createObstacle, 2000);//interval for movement of obstacles

//i need to make the canvas move continuously and why can I mot see the obstacles
