
let nomeFaseAtual = "";

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  // tempo real do pc
  let h = hour();
  let m = minute();
  let s = second();

  // ciclo das horas
  let horasTotais = h + (m / 60.0) + (s / 3600.0);
  
  // horas para o circulo
  let anguloFim = map(horasTotais, 0, 24, 0, 360);

  // fundo escuro 
  background(10, 12, 18);

  push();
  translate(width / 2, height / 2);

  // Cor com base nas horas do pc
  let dadosFase = obterCorEFaseDoDia(h);
  let corSol = dadosFase.cor;
  nomeFaseAtual = dadosFase.nome;

  // brilho do circulo(efeito led)
  for (let i = 5; i > 0; i--) {
    noFill();
    stroke(red(corSol), green(corSol), blue(corSol), 25 / i);
    strokeWeight(4 + i * 6);
    arc(0, 0, 240, 240, -90, -90 + anguloFim);
  }

  // sol/lua
  fill(red(corSol), green(corSol), blue(corSol), 220);
  noStroke();
  arc(0, 0, 220, 220, -90, -90 + anguloFim, PIE);

  // Anel exterior de contorno com opacidade
  noFill();
  stroke(255, 255, 255, 40);
  strokeWeight(2);
  ellipse(0, 0, 220, 220);

  pop();

  // interface das horas
  desenharInterfaceInfo(h, m, s, horasTotais);
}

// cores de acordo com as fases do dia
function obterCorEFaseDoDia(hora) {
  let resultado = { cor: color(255), nome: "" };

  if (hora >= 6 && hora < 12) {
    // Manha (06:00 - 12:00): Amarelo
    resultado.cor = color(255, 220, 50);
    resultado.nome = "Manhã (Sol Amarelo)";
  } else if (hora >= 12 && hora < 20) {
    // Entardecer / Tarde (12:00 - 20:00): Laranja
    resultado.cor = color(255, 130, 30);
    resultado.nome = "Entardecer (Sol Laranja)";
  } else {
    // Noite / Madrugada (20:00 - 06:00): Branco
    resultado.cor = color(240, 245, 255);
    resultado.nome = "Noite (Luz Branca)";
  }
  return resultado;
}

function desenharInterfaceInfo(h, m, s, horasTotais) {
  let horaStr = nf(h, 2) + ":" + nf(m, 2) + ":" + nf(s, 2);
  let percentagemDia = nf((horasTotais / 24.0) * 100, 2, 1) + "%";

  noStroke();
  fill(255, 255, 255, 160);
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text("Hora do PC: " + horaStr + " (" + percentagemDia + " do dia)", 30, height - 55);
  text("Fase Atual: " + nomeFaseAtual, 30, height - 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}