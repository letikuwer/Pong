//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18
let raio = diametro / 2;

//velocidade da bolinha
let velocidadexBolinha = 7;
let velocidadeyBolinha = 4;

//variaveis raquete
let xRaquete = 5
let yRaquete = 150
let compRaquete = 10
let altRaquete = 100

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar =0;

let colidiu = false;

//placar do jogo
let meusPontos = 0
let pontosOponente =0

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload (){
  trilha = loadSound("trilha.mp3");
  ponto= loadSound ("ponto.mp3")
  var pirulito = "teste"
  raquetada= loadSound ("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrabolinha();
  movimentabolinha();
  verificacolisaoborda ();
  mostraRaquete (xRaquete,yRaquete);
  movimentaminharaquete ();
  verificacolisaoRaquete (xRaquete,yRaquete);
  verificacolisaoRaquete (xRaqueteOponente, yRaqueteOponente);
  mostraRaquete (xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente ();
  incluiplacar ();
  marcaPonto ();
  
}

function mostrabolinha (){
  circle(xBolinha,yBolinha, diametro);
}

function movimentabolinha (){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificacolisaoborda (){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height || 
      yBolinha - raio<0){
    velocidadeyBolinha *=-1
  }
}

function mostraRaquete (x,y){
  rect(x, y, compRaquete, altRaquete)
}


function movimentaminharaquete (){
  if (keyIsDown(UP_ARROW)){
   yRaquete -= 10 
  }
  if (keyIsDown( DOWN_ARROW )){
   yRaquete += 10
}
}

function colisaoMinhaRaquete (){
  if(xBolinha -raio  < xRaquete + compRaquete && yBolinha - raio < yRaquete + altRaquete && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
    raquetada.play ();
  }
}

function verificacolisaoRaquete(x,y) {
  colidiu =
collideRectCircle(x, y, compRaquete, altRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
 velocidadeYOponente = yBolinha - yRaqueteOponente - compRaquete/2 -30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
}

function incluiplacar (){
  stroke (255)
  textAlign (CENTER);
  textSize (18);
  fill (color (255,140,0));
  rect (130,10,40,20);
  fill (255);
  text(meusPontos, 150,26);
  fill (color (255,140,0));

  rect (450,10,40,20)
  fill (255);
  text(pontosOponente, 470,26);
}

function marcaPonto (){
  if (xBolinha >590 ){
    meusPontos += 1;
    ponto.play ();
  }
  if (xBolinha < 10){
    pontosOponente +=1
    ponto.play ();
  }
}

function calculaChanceDeErrar(){
  if (pontosDoOponente >= meusPontos){
    chanceDeErrar += 1
    if(chanceDeErrar >= 39){
      chanceDeErrar=40
    }
    else {
      chanceDeErrar -= 1
      if (chanceDeErrar <=35) {
        chanceDeErrar =35
      }
    }
  }
}