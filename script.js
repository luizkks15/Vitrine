
const shoes = [
  {
    id:1, sceneName:'Nature Run',
    colorLabel:'Court Green / Lucid Red / Cloud White',
    colors:['#3a7d44','#d32f2f','#f5f5f5'],
    bg:'#09120a', bg2:'#0f1f10', bgL:'#eef5ef', bg2L:'#dceede',
    glow:'rgba(58,125,68,0.18)', glowL:'rgba(58,125,68,0.11)',
    shadow:'rgba(58,125,68,0.45)', shadowL:'rgba(58,125,68,0.28)',
    accent:'#3a7d44', imgSrc:'tenis1.png',
    desc:'O verde vibrante das pistas de grama encontra o vermelho da adrenalina. Feito para atletas que dominam qualquer terreno com precisão e estilo.',
  },
  {
    id:2, sceneName:'Golden Hour',
    colorLabel:'Cloud White / Matte Gold / Core Black',
    colors:['#f0f0f0','#b8942a','#111111'],
    bg:'#0d0c08', bg2:'#16140a', bgL:'#f8f5ea', bg2L:'#f0ead4',
    glow:'rgba(184,148,42,0.15)', glowL:'rgba(184,148,42,0.10)',
    shadow:'rgba(184,148,42,0.4)', shadowL:'rgba(184,148,42,0.22)',
    accent:'#c9a84c', imgSrc:'tenis2.png',
    desc:'Branco imaculado com acabamento ouro fosco — para quem corre no topo do pódio. Elegância que desafia o cronômetro e conquista olhares.',
  },
  {
    id:3, sceneName:'Fire & Ice',
    colorLabel:'Lucid Red / Bold Gold / Semi Lucid Blue',
    colors:['#e02020','#d4a017','#3a78c9'],
    bg:'#0e0404', bg2:'#1a0606', bgL:'#fdeef0', bg2L:'#f8dde0',
    glow:'rgba(224,32,32,0.15)', glowL:'rgba(224,32,32,0.08)',
    shadow:'rgba(224,32,32,0.5)', shadowL:'rgba(224,32,32,0.24)',
    accent:'#e02020', imgSrc:'tenis3.png',
    desc:'Uma explosão de cores que reflete velocidade máxima. O vermelho lúcido arde nas pistas enquanto o azul e o dourado marcam cada passada com autoridade.',
  },
  {
    id:4, sceneName:'Electric Storm',
    colorLabel:'Lucid Blue / Court Green / Lucid Red',
    colors:['#1565c0','#2e7d32','#e53935'],
    bg:'#03070f', bg2:'#060e1a', bgL:'#eaf0fb', bg2L:'#d8e4f5',
    glow:'rgba(21,101,192,0.18)', glowL:'rgba(21,101,192,0.10)',
    shadow:'rgba(21,101,192,0.5)', shadowL:'rgba(21,101,192,0.24)',
    accent:'#1976d2', imgSrc:'tenis4.png',
    desc:'Energia elétrica em cada stride. O azul lúcido domina enquanto o verde e o vermelho criam um contraste poderoso — para corredores que fogem do comum.',
  },
  {
    id:5, sceneName:'Sky Limit',
    colorLabel:'Cloud White / Clear Blue / Matte Gold',
    colors:['#f5f5f5','#29b6f6','#b8860b'],
    bg:'#030810', bg2:'#050d1a', bgL:'#eaf6fd', bg2L:'#d4eefa',
    glow:'rgba(41,182,246,0.14)', glowL:'rgba(41,182,246,0.09)',
    shadow:'rgba(41,182,246,0.4)', shadowL:'rgba(41,182,246,0.20)',
    accent:'#29b6f6', imgSrc:'tenis5.png',
    desc:'Limpo como o horizonte, ágil como o vento. Branco e azul etéreo com detalhes dourados — a combinação perfeita para quem busca leveza sem abrir mão do estilo.',
  },
  {
    id:6, sceneName:'Monochrome',
    colorLabel:'Cloud White / Core Black / Dash Grey',
    colors:['#ececec','#111111','#888888'],
    bg:'#0a0a0a', bg2:'#141414', bgL:'#f4f4f4', bg2L:'#e8e8e8',
    glow:'rgba(200,200,200,0.07)', glowL:'rgba(0,0,0,0.05)',
    shadow:'rgba(180,180,180,0.3)', shadowL:'rgba(100,100,100,0.18)',
    accent:'#888888', imgSrc:'tenis6.png',
    desc:'Menos é mais. O preto, branco e cinza formam uma tríade atemporal para o corredor que prefere que seus resultados falem mais alto do que as cores.',
  },
];

let current = 0, animLocked = false, isLight = false;

function drawTricolorCanvas(canvas, c1, c2, c3) {
  const ctx = canvas.getContext('2d');
  const r = canvas.width / 2;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.save();
  ctx.beginPath(); ctx.arc(r,r,r,0,Math.PI*2); ctx.clip();
  [c1,c2,c3].forEach((c,i)=>{
    const start = -Math.PI/2 + i*(Math.PI*2/3);
    const end   = start + (Math.PI*2/3);
    ctx.beginPath(); ctx.moveTo(r,r);
    ctx.arc(r,r,r,start,end); ctx.closePath();
    ctx.fillStyle=c; ctx.fill();
  });
  ctx.beginPath(); ctx.arc(r,r,r-1,0,Math.PI*2);
  ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=1.5; ctx.stroke();
  ctx.restore();
}


function buildSelector() {
  const sel = document.getElementById('selector');
  sel.innerHTML = '';
  shoes.forEach((shoe,idx)=>{
    const btn = document.createElement('button');
    btn.className = 'shoe-btn' + (idx===0?' active':'');
    btn.title = shoe.colorLabel;
    btn.setAttribute('aria-label', shoe.colorLabel);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 52;
    drawTricolorCanvas(canvas,...shoe.colors);
    btn.appendChild(canvas);
    btn.addEventListener('click', ()=>selectShoe(idx));
    sel.appendChild(btn);
  });
}


function updatePills(shoe) {
  const el = document.getElementById('colorPills');
  el.innerHTML = '';
  shoe.colors.forEach((c,i)=>{
    const p = document.createElement('div');
    p.className = 'pill';
    p.style.cssText = `background:${c};width:${i===0?14:11}px;height:${i===0?14:11}px;transform:${i===0?'scale(1.3)':'scale(1)'};border-color:rgba(128,128,128,${i===0?0.4:0.2})`;
    el.appendChild(p);
  });
}


function applyCSS(shoe) {
  const root = document.documentElement;
  const bg   = isLight ? shoe.bgL    : shoe.bg;
  const bg2  = isLight ? shoe.bg2L   : shoe.bg2;
  const glow = isLight ? shoe.glowL  : shoe.glow;
  const shad = isLight ? shoe.shadowL: shoe.shadow;

  root.style.setProperty('--c-bg',     bg);
  root.style.setProperty('--c-bg2',    bg2);
  root.style.setProperty('--c-accent', shoe.accent);
  root.style.setProperty('--c-glow',   glow);
  root.style.setProperty('--c-shadow', shad);

  document.getElementById('bgBase').style.background = bg;
  document.getElementById('bgMesh').style.background =
    `radial-gradient(ellipse 65% 65% at 72% 58%,${glow} 0%,transparent 100%),
     radial-gradient(ellipse 40% 40% at 18% 78%,${glow} 0%,transparent 100%)`;
  document.getElementById('shoeShadow').style.background =
    `radial-gradient(ellipse,${shad} 0%,transparent 70%)`;
}


function updateTexts(shoe) {
  document.getElementById('colorLabel').textContent  = shoe.colorLabel;
  document.getElementById('shoeDesc').textContent    = shoe.desc;
  document.getElementById('headerTag').textContent   = shoe.sceneName;
  document.getElementById('fiThemeName').textContent = shoe.sceneName;
  document.getElementById('shoeNum').textContent     = String(shoe.id).padStart(2,'0');
  updatePills(shoe);
}


function updateImage(shoe, instant) {
  const img = document.getElementById('shoeImg');
  const REST = 'rotate(-4deg) translateY(0px)';

  const showImg = () => {
    img.style.transition = 'opacity 0.45s, transform 0.45s';
    img.style.opacity = '1';
    img.style.transform = REST;
    setTimeout(()=>{ img.classList.add('do-float'); }, 500);
  };

  if (instant) {
    img.classList.remove('do-float');
    img.style.transition = 'none';
    img.style.opacity = '0';
    img.style.transform = REST;
    img.src = shoe.imgSrc;
    if (img.complete && img.naturalWidth > 0) {
      requestAnimationFrame(()=>requestAnimationFrame(showImg));
    } else {
      img.onload  = showImg;
      img.onerror = showImg;
    }
    return;
  }


  img.classList.remove('do-float');
  img.style.transition = 'opacity 0.25s, transform 0.25s';
  img.style.opacity = '0';
  img.style.transform = 'rotate(-4deg) translateY(12px)';

  setTimeout(()=>{
    img.src = shoe.imgSrc;
    img.style.transform = 'rotate(-4deg) translateY(-8px)';
    const show = () => {
      img.style.transition = 'opacity 0.38s, transform 0.38s';
      img.style.opacity = '1';
      img.style.transform = REST;
      setTimeout(()=>{ img.classList.add('do-float'); }, 420);
    };
    if (img.complete && img.naturalWidth > 0) { requestAnimationFrame(show); }
    else { img.onload = show; img.onerror = show; }
  }, 270);
}


function selectShoe(idx) {
  if (idx === current || animLocked) return;
  animLocked = true;
  const shoe = shoes[idx];
  const wipe = document.getElementById('wipe');
  wipe.style.background = shoe.accent;
  wipe.classList.remove('go');
  void wipe.offsetWidth;
  wipe.classList.add('go');

  setTimeout(()=>{
    applyCSS(shoe);
    updateTexts(shoe);
    updateImage(shoe, false);
    document.querySelectorAll('.shoe-btn').forEach((b,i)=>b.classList.toggle('active',i===idx));
    current = idx;
  }, 350);
  setTimeout(()=>{ animLocked = false; }, 750);
}


document.getElementById('themeToggle').addEventListener('click', ()=>{
  isLight = !isLight;
  document.documentElement.setAttribute('data-theme', isLight?'light':'dark');
  applyCSS(shoes[current]);
});


const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
(function loop(){ rx+=(mx-rx)*0.13; ry+=(my-ry)*0.13; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
document.addEventListener('mouseover', e=>{ if(e.target.closest('button,a,.shoe-btn')){ ring.style.width='50px'; ring.style.height='50px'; ring.style.opacity='0.85'; }});
document.addEventListener('mouseout',  e=>{ if(e.target.closest('button,a,.shoe-btn')){ ring.style.width='34px'; ring.style.height='34px'; ring.style.opacity='0.55'; }});

buildSelector();
applyCSS(shoes[0]);
updateTexts(shoes[0]);
updateImage(shoes[0], true);