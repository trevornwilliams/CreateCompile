let glitchRects = [];
let lastGlitchTime = 0;
let textGlitchOffset = 0;
var consolasFont;
let cursorDirection = { x: 0, y: 0 };

function preload() {
  consolasFont = loadFont('Consolas.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  textFont(consolasFont);
  textSize(24);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);
  
  // Update cursor direction
  cursorDirection.x = mouseX - width/2;
  cursorDirection.y = mouseY - height/2;
  let magn = sqrt(cursorDirection.x * cursorDirection.x + cursorDirection.y * cursorDirection.y);
  if (magn > 0) {
    cursorDirection.x /= magn;
    cursorDirection.y /= magn;
  }
  
  // Draw glitch rectangles
  for (let i = glitchRects.length - 1; i >= 0; i--) {
    let glitchRect = glitchRects[i];
    fill(150, glitchRect.alpha);
    noStroke();
    rectMode(CORNER);
    rect(glitchRect.x, glitchRect.y, glitchRect.w, glitchRect.h);
    glitchRect.alpha -= 2;
    
    // Move glitch rectangles in cursor direction
    glitchRect.x += cursorDirection.x * 2;
    glitchRect.y += cursorDirection.y * 2;
    
    if (glitchRect.alpha <= 0) {
      glitchRects.splice(i, 1);
    }
  }
  
  // Add glitch effect
  if (random() < 0.05 && millis() - lastGlitchTime > 500) {
    addGlitch();
    lastGlitchTime = millis();
    textGlitchOffset = random(-5, 5);
  }
  
  // Draw glitching text
  push();
  translate(width/2, height/2);
  fill(125);
  
  // Draw original text
  text("create_compute", 0, -16);
  
  // Draw glitched text
  fill(75, 128); // Semi-transparent for overlap
  text("create_compute", textGlitchOffset * cursorDirection.x, -16 + textGlitchOffset * cursorDirection.y);
  
  // Add "coming soon" text
  textSize(16);
  text("coming soon", 0, 20);
  
  // Gradually reduce text glitch
  textGlitchOffset *= 0.9;
  
  pop();
  
  // Draw geometric shapes
  drawGeometricShapes();
}

function addGlitch() {
  for (let i = 0; i < 10; i++) {
    glitchRects.push({
      x: random(width),
      y: random(height),
      w: random(20, 100),
      h: random(5, 20),
      alpha: 100
    });
  }
}

function drawGeometricShapes() {
  noFill();
  stroke(0, 30);
  strokeWeight(1);
  
  // Draw rectangles
  rectMode(CENTER);
  for (let i = 0; i < 5; i++) {
    rect(random(width), random(height), random(50, 150), random(50, 150));
  }
  
  // Draw triangles
  for (let i = 0; i < 5; i++) {
    triangle(
      random(width), random(height),
      random(width), random(height),
      random(width), random(height)
    );
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}