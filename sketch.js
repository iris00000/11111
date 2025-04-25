let balls = [];
let fishes = [];
let song;
let amplitude;

function preload() {
  song = loadSound('midnight-quirk-255361.mp3'); // 載入音樂檔案
}

function setup() { //設定
  createCanvas(windowWidth, windowHeight); //建立畫布, 寬高為視窗的寬高
  amplitude = new p5.Amplitude(); // 創建振幅分析器
  song.play(); // 播放音樂
  for (let i = 0; i < 10; i++) {
    balls.push(new Ball(random(width), random(height), random(2, 5), random(2, 5)));
    fishes.push(new Fish(random(width), random(height), random(1, 3), random(1, 3)));
  }

  // 增加五支魚
  for (let i = 0; i < 10; i++) {
    fishes.push(new Fish(random(width), random(height), random(1, 3), random(1, 3)));
  }
}

function draw() {
  drawAquariumBackground(); // 畫水族箱背景
  let level = amplitude.getLevel(); // 獲取當前音樂的振幅
  for (let ball of balls) {
    ball.move();
    ball.display(level); // 傳遞振幅
  }
  for (let fish of fishes) {
    fish.move();
    fish.display(level); // 傳遞振幅
  }
}

function drawAquariumBackground() {
  background("#457b9d"); // 天藍色背景
  noStroke();
  fill("#8B4513"); // 棕色
  rect(0, height - 50, width, 50); // 底部沙子
  fill("#228B22"); // 森林綠
  for (let i = 0; i < width; i += 50) {
    triangle(i, height - 50, i + 25, height - 100, i + 50, height - 50); // 水草
  }
  // 添加陰影效果
  fill(0, 50);
  for (let i = 0; i < width; i += 50) {
    triangle(i + 5, height - 45, i + 30, height - 95, i + 55, height - 45); // 水草陰影
  }
}

class Fish {
  constructor(x, y, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.angle = 0;
    this.color = this.randomColor(); // 初始化顏色
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.x > width || this.x < 0) {
      this.xspeed *= -1;
      this.color = this.randomColor(); // 碰到邊界時改變顏色
    }

    if (this.y > height || this.y < 0) {
      this.yspeed *= -1;
      this.color = this.randomColor(); // 碰到邊界時改變顏色
    }

    this.angle = atan2(this.yspeed, this.xspeed);
  }

  display(level) {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    stroke(0);
    fill(this.color); // 使用隨機顏色
    beginShape();
    vertex(0, -50 * (1 + level * 2)); // 根據振幅調整魚身
    vertex(100 * (1 + level * 2), 0); // 根據振幅調整魚身
    vertex(0, 50 * (1 + level * 2)); // 根據振幅調整魚身
    vertex(-20, 20); // 魚尾
    vertex(-50, 0); // 魚尾
    vertex(-20, -20); // 魚尾
    vertex(0, -50 * (1 + level * 2)); // 根據振幅調整魚身
    endShape(CLOSE);

    // 畫魚的尾巴
    beginShape();
    vertex(-50, 0); // 魚尾
    vertex(-80, -20); // 魚尾上
    vertex(-100, 0); // 魚尾尖
    vertex(-80, 20); // 魚尾下
    vertex(-50, 0); // 魚尾
    endShape(CLOSE);

    // 畫魚的眼睛
    fill(0);
    ellipse(70, 0, 10, 10); // 魚眼

    // 添加陰影效果
    fill(0, 50);
    ellipse(70, 5, 10, 10); // 魚眼陰影
    pop();
  }

  randomColor() {
    return color(random(255), random(255), random(255)); // 隨機顏色
  }
}

class Ball {
  constructor(x, y, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.color = this.randomColor();
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.x > width || this.x < 0) {
      this.xspeed *= -1;
      this.color = this.randomColor();
    }

    if (this.y > height || this.y < 0) {
      this.yspeed *= -1;
      this.color = this.randomColor();
    }
  }

  display(level) {
    fill(this.color);
    ellipse(this.x, this.y, 60 * (1 + level * 2), 60 * (1 + level * 2)); // 將基礎直徑從 40 增加到 60

    // 添加陰影效果
    fill(0, 50);
    ellipse(this.x + 5, this.y + 5, 60 * (1 + level * 2), 60 * (1 + level * 2)); // 陰影也同步調整
  }

  randomColor() {
    return color(random(255), random(255), random(255));
  }
}