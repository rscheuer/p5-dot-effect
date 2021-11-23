let img;
let pixelation_level = 40;
let slider;
let pixelSlider;
let fileInput;

let w = 800;
let h = 800;

let x = 45;
let y = w / pixelation_level;
let sz = pixelation_level * 0.8;

let threshold = 50;

function preload() {
  img = loadImage("z.png"); //https://thispersondoesnotexist.com/
}

function setup() {
  let c = createCanvas(w, h);
  pixelDensity(1);
  slider = createSlider(0,101,16);
  pixelSlider = createSlider(10,100,16);
  // noLoop();
  fileInput = createFileInput(handleFile);
  pixelSlider.input(updatePixelLevel)
  slider.input(updateSize);
  // saveCanvas(c, 'myCanvas', 'jpg');
  noLoop();
}

function keyTyped() {
  if (key === 's') {
    // photo.save('photo', 'png');
    saveCanvas();
  }
}

function updateSize(){
  // paragraph.style("font-size", slider.value() + "pt");
  threshold = slider.value()
}
function updatePixelLevel(){
  // paragraph.style("font-size", slider.value() + "pt");
  pixelation_level = pixelSlider.value()
  sz = pixelation_level * 0.8;
  console.log(pixelSlider.value())
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}

function mousePressed() {
  loop();
}

function mouseReleased() {
  noLoop();
}


function draw() {
  
  if(img){
    image(img, 0, 0, width, height);
    loadPixels();
    //print(pixels[0], pixels[1], pixels[2], pixels[3]);
    noStroke();
    
    
    for (let x = 0; x < width; x += pixelation_level) {
      for (let y = 0; y < height; y += pixelation_level) {
        
        let i = (x + y * width) * 4;

        let r = pixels[i + 0];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let a = pixels[i + 3];
        fill(r, g, b, a);

        let c = color(r,g,b,a);
        let value = brightness(c)
        // console.log(value)
        // console.log(sz)

        // noFill();
        fill(r, g, b, a);
        fill('white')
        square(x, y, pixelation_level);

        var offset = pixelation_level/2
        if(value < threshold ){
          noStroke();
          fill(255);
          fill(r, g, b, a);
          ellipse(x+offset, y+offset, sz, sz);
        } else {
          noFill();
          stroke(255);
          strokeWeight(pixelation_level/7);
          stroke(r, g, b, a);
          ellipse(x+offset, y+offset, sz*.6, sz*.6);
        }
        noStroke();
      }
    }
  }
  
}