//Create variables here
var dog, happyDog, database;
var foodS, foodStock;
var dogImg, happyDogImg


function preload() {
	dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(1000,1000);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);



  dog = createSprite(300,250,20,50);
  dog.addImage(happyDogImg);
  dog.scale = 0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background("blue");
  if(keyIsDown(DOWN_ARROW)){
    WriteStock(foodS);
    dog.addImage(happyDogImg);
   }
  if(keyWentUp(DOWN_ARROW)){
    dog.addImage(dogImg);
  }

  if(foodS === 0){
    foodS = 20;
  }

  drawSprites();
  textSize(25);
  fill("black");
  text("food remaining:"+ foodS,170,80);
  text("press DownArrow to feed the dog" ,170 , 120);
}

function WriteStock(petFOOD){
  if(petFOOD<=0){
      petFOOD=0
  }
  else{
      petFOOD=petFOOD-1;
  }
  database.ref('/').update({
      food:petFOOD
  })
}

function readStock(data){
  foodS = data.val();
  
}



