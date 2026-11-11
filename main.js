// Skapar variabel och lägger in från pixi-biblioteket
const app = new PIXI.Application();
// Gör canvasen lika stor som fönstret och lägger till bakgrundsfärg
await app.init({ resizeTo: window, background: "#222222" });
// lägger till canvasen som en child till body-elementet
document.body.appendChild(app.canvas);

// Gör variabel för prickarna, som kommer från pixi-biblioteket 
const dots = new PIXI.Graphics();
app.stage.addChild(dots);

// Gör variabel för musens x- och y-position
// Använder en eventlistener för att lyssna in var musen är och hur den rör sig
const mouse = { x: 0, y: 0 };
window.addEventListener("pointermove", (e) => {
  // Lägger in den nya x- och y-positionen för musen i variabeln
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});


// Två for-loopar som ökar med 30, som jag antar är avståndet mellan prickarna (30px) så länge x är mindre än skärmens bredd och y är mindre än skärmens höjd
app.ticker.add(() => {
  dots.clear();
  for (let x = 0; x < app.screen.width; x += 30) {
    for (let y = 0; y < app.screen.height; y += 30) {
      // Räknar avståndet mellan musen och varje prick med hjälp av hypotenusan
      const distance = Math.hypot(x - mouse.x, y - mouse.y);
      // Prickarna ska bli större/mindre beroende på hur nära musen är. Jag antar att 1 står för minst 1px stor och "8-distance/30" är maxstorleken
      dots.circle(x, y, Math.max(1, 8 - distance / 30));
    }
  }
  // Ger prickarna en färg
  dots.fill("#4c0f2a");
});
