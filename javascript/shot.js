var shot = false;
var canUnholster = false;
var roundOver = false;
var holsterTimer;
var shootTimer;

function clear_state(){
  clearTimeout(shootTimer);
  clearTimeout(holsterTimer);
  shootout = false;
  shot = false;
  canUnholster = false;
  roundOver = false;

  $("#gunShotFlash").hide();
  $("#gun").hide();
  $("#blood").hide();
  $("#gunInPosition").hide();
  $("#premature").hide();

  $("#bill").removeClass("test");

  $("#flash_red").hide();
}

function begin_shootout(pointable, pointables){
  if( !is_premature(pointable) && is_gun(pointables) ){
    // clear_state();
    $("#gunInPosition").show();
    return true;
  }
  else{
    return false;
  }
}

function update(pointable, pointables){
  if(!is_gun(pointables)){
    $("#not_gun").show()
    $("#not_gun").fadeOut(2000);
  }
  else if(!canUnholster && is_premature(pointable) ){
    $("#premature").show();
    roundOver = true;
    // $("#premature").fadeOut(2000);
  }
  else if(canUnholster && gun_shot(pointable)){
    shot = true;
    $("#flash").show();
    $("#flash").fadeOut(200);
    // $("#fire_gun").show();
    // $("#fire_gun").fadeOut(5000);
    $("#bill").addClass("test");
  }
}

function is_gun(pointable){
  if(pointable.length <= 2){
    $("#gunInPosition").show();
    return true;
  }
  else{
    $("#gunInPosition").hide();
    return false;
  }

}

function is_premature(pointable) {
  if(pointable.direction[1] <= -0.5){
    $("#premature").hide();
    return false;
  }
  else{
    return true;
  }
}

function gun_shot(pointable) {
  if(pointable.direction[1] >= -0.105){
    shot = true;
    roundOver = true;
    return true;
  }
  else{
    return false;
  } 
}

function enemyShoot(){
  if (!shot){
    roundOver = true;
    $("#gunShotFlash").show();
    $("#gunShotFlash").fadeOut(800);
    
    // $("#flash").show();
    $("#flash_red ").fadeIn(1200);

    console.log("ENEMY would have shot you right meow!")
  }
  else{
    console.log("ENEMY shot you!")
  }
}

function enemyUnholster(){
  console.log("Enemy unholstered his gun!")
  canUnholster = true;
  $("#gun").show();
  rand = Math.ceil(Math.random()*1000) + 200;
  shootTimer = window.setTimeout(function() {enemyShoot()}, rand);
}