var trex, trexCorrendo,trexFaliceu;

var estadoJogar ="iniciar";

var grupoDeCactos;

var grupoDeNuvens;

var solo, soloInvisivel, soloImagem;

var nuvem, nuvemImagem;

var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;

var pontuacao = 0;

var restart,restartImage;

var gameOver,gameOverImage;

var jump, gameOverSom, checkPoint;

var larguraJogo = window.innerWidth

function reset(){
  pontuacao = 0;
  gameOver.visible = false
  restart.visible = false
  estadoJogar = "jogar"
  grupoDeCactos.destroyEach()
  grupoDeNuvens.destroyEach()
  trex.changeAnimation("correndo", trexCorrendo)
}

function criaCacto(){
  if(frameCount%70 ===0){
  var cacto = createSprite(larguraJogo,169,10,40);
 
  cacto.velocityX = -(6+pontuacao/100);  
  
    
var numeroCacto = Math.round(random(1,6));
    
 switch(numeroCacto){
   case 1:cacto.addImage(cacto1);
   break
   case 2:cacto.addImage(cacto2);
   break
   case 3:cacto.addImage(cacto3);
   break
   case 4:cacto.addImage(cacto4);
   break
   case 5:cacto.addImage(cacto5);
   break
   case 6:cacto.addImage(cacto6);
   break
   
   default:break
}
   cacto.scale = 0.8;
   cacto.lifetime = larguraJogo;  
  
    grupoDeCactos.add(cacto);  
}    
}
  

function criaNuvem(){  
  
  if(frameCount%88 ===0) {
 nuvem = createSprite(larguraJogo,100,40,10); 
 nuvem.addImage(nuvemImagem);
 nuvem.velocityX = -4;   
 nuvem.scale = 0.6;
 nuvem.y = Math.round(random(10,100));
 nuvem.depth = trex.depth;
 trex.depth = trex.depth+1;  
 nuvem.lifetime = larguraJogo;
    
 grupoDeNuvens.add(nuvem);   
}
}

function preload() {
  trexCorrendo = loadAnimation('trex1.png', 'trex2.png', 'trex3.png')
  trexFaliceu = loadImage("trex_collided.png");
  
  soloImagem = loadImage("ground2.png");  
  
  nuvemImagem = loadImage("cloud.png");
  
  cacto1 = loadImage("obstacle1.png")
  cacto2 = loadImage("obstacle2.png")
  cacto3 = loadImage("obstacle3.png")
  cacto4 = loadImage("obstacle4.png")
  cacto5 = loadImage("obstacle5.png")
  cacto6 = loadImage("obstacle6.png")
  
  restartImage = loadImage("restart.png");
  
  gameOverImage = loadImage("gameOver.png");
  
  jump = loadSound("jump.mp3");
  checkPoint = loadSound("checkPoint.mp3");
  gameOverSom = loadSound("die.mp3");
}

function setup() {
  createCanvas(larguraJogo,200);
  
  var mensagem = "O meu"
  
  trex = createSprite(50, 150, 20, 50);
  trex.addAnimation("correndo", trexCorrendo);
  trex.addAnimation("FALICEU", trexFaliceu);
  trex.scale = 0.6;
  trex.setCollider("circle",0,0,40);
  trex.debug = false; 
  
  solo = createSprite(larguraJogo/2,180,larguraJogo,20);  
  solo.addImage("solo", soloImagem);
  solo.x = solo.width/2;
  
  soloInvisivel = createSprite(300,205,600,20);
  soloInvisivel.visible = false; 
  
  grupoDeCactos = new Group();
  grupoDeNuvens = new Group();
  
  restart = createSprite(larguraJogo/2,100,20,20);
  restart.addImage(restartImage);
  restart.scale = 0.55;
  
  gameOver = createSprite(larguraJogo/2,45,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1;
  
  restart.visible = false; 
    
  gameOver.visible = false;
}

function draw() {
  background("white");
  
  text("Pontuação: "+pontuacao,larguraJogo-100,10);
  
  trex.velocityY = trex.velocityY + 0.5;  
  if(estadoJogar ==="jogar"){
    solo.velocityX = -(6+pontuacao/100);
    
    pontuacao = pontuacao+ Math.round(frameRate()/60);
    
     if (solo.x<0){
    solo.x = solo.width/2; 
  }
    
    if ((keyDown("up")||keyDown("space")||touches.length>0 ) && trex.y>155) {
    trex.velocityY = -10;
    jump.play() 
    touches = [] 
  }
    
         
    criaNuvem();
    criaCacto();
    
    if(grupoDeCactos.isTouching(trex)){
    estadoJogar = "encerrar"
    gameOverSom.play() 
}
    
    if(pontuacao%100 ===0){
      checkPoint.play()   
       }
    
  } else if(estadoJogar ==="encerrar"){
    solo.velocityX = 0; 
    
    grupoDeCactos.setVelocityXEach(0);
    
    grupoDeCactos.setLifetimeEach(-1);
    
    grupoDeNuvens.setVelocityXEach(0);
    
    grupoDeNuvens.setLifetimeEach(-1);
    
    restart.visible = true;
    
    gameOver.visible = true;
    

    
    trex.changeAnimation("FALICEU",trexFaliceu);
    if(mousePressedOver(restart)|| touches.length>0){
reset()
touches = []
}
  } else if(estadoJogar ==="iniciar"){
    
    text ("APERTE SPACE PARA COMEÇAR",larguraJogo/2,100);  
    
    
    if(keyDown("space")){
    estadoJogar = "jogar"   
}
    
}
  
  trex.collide(soloInvisivel);
  
  drawSprites();
}