var dog, happyDog, foodS,foodStock, dogImg
var dogImage, database
var feed, addFood
var foodObj
var readState, changeGameState
var gardenImg, bedroomImg, washroomImg
function preload()
{
  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
  gardenImg = loadImage("images/virtual pet images/Garden.png")
  bedroomImg = loadImage("images/virtual pet images/Bed Room.png")
  washroomImg = loadImage("images/ virtual pet images/Wash Room.png")
}

function setup() {
	createCanvas(500, 500);
dog = createSprite(250,250);
  dog.addImage(dogImage)
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  
  feed=createButton("Feed the Dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
readState=database.ref('gameState')
readState.on("value",function(data){
  gamestate=data.val();
})
 
}


function draw() {  
background(46,139,87);



Food.js.display();

fill(255,255,254);
textSize(15);
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});
if(latFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM", 350,30);
  
}
else if(lastFed==0){
  text("Last Feed : 12 AM", 350, 30);

}
else{
  text("Last Feed : "+ lastFed + " AM", 350,30);
}

currentTime=hour();
if(currentTime==(lastFed+1)){
  update("Playing")
  foodObj.garden();
}else if(currentTime==(lastfed+2)){
  update("Sleeping")
  foodObj.bedroom();
}else{
  update("Hungry")
  foodObj.display();
}
if(gamestate!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog)
}
writeStock();
readStock();
  drawSprites();
  
  Text("Note: Press UP_ARROW Key To Feed Drago Milk!")
fill("white");
stroke("black");
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
