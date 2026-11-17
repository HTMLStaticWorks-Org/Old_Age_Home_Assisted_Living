const root=document.documentElement;
const body=document.body;
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menu&&nav){
  const closeNav=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.innerHTML='☰';};
  menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.innerHTML=open?'✕':'☰';});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open'))closeNav();});
}
const themeBtns=document.querySelectorAll('[data-theme-toggle]');
const rtlBtns=document.querySelectorAll('[data-rtl-toggle]');
let savedTheme=null;
let savedDir=null;
try{savedTheme=localStorage.getItem('elder-theme');savedDir=localStorage.getItem('elder-dir');}catch(e){}
const applyTheme=mode=>{
  const dark=mode==='dark';
  body.dataset.theme=dark?'dark':'light';
  themeBtns.forEach(btn=>{
    const ico=btn.querySelector('[data-theme-icon]');
    const lbl=btn.querySelector('[data-theme-label]');
    if(ico){ico.textContent=dark?'☀':'◐';}else{btn.textContent=dark?'☀':'◐';}
    if(lbl){lbl.textContent=dark?'Light':'Dark';}
    btn.setAttribute('aria-pressed',String(dark));
  });
};
applyTheme(savedTheme==='dark'?'dark':'light');
themeBtns.forEach(btn=>btn.addEventListener('click',()=>{
  const next=body.dataset.theme==='dark'?'light':'dark';
  applyTheme(next);
  try{localStorage.setItem('elder-theme',next);}catch(e){}
}));
const applyDir=dir=>{
  const rtl=dir==='rtl';
  const val=rtl?'rtl':'ltr';
  root.dir=val;
  body.dir=val;
  rtlBtns.forEach(btn=>{
    btn.textContent=rtl?'LTR':'RTL';
    btn.setAttribute('aria-pressed',String(rtl));
    btn.setAttribute('aria-label',rtl?'Switch to left-to-right alignment':'Switch to right-to-left alignment');
  });
};
if(savedDir==='rtl'||savedDir==='ltr'){applyDir(savedDir);}else{applyDir(body.dir||root.dir||'ltr');}
rtlBtns.forEach(btn=>btn.addEventListener('click',()=>{
  const next=body.dir==='rtl'?'ltr':'rtl';
  applyDir(next);
  try{localStorage.setItem('elder-dir',next);}catch(e){}
}));
document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const toast=form.querySelector('.toast');if(toast){toast.textContent='Thank you. Your enquiry has been captured in this demo. Please connect a secure form service before publishing.';toast.classList.add('show');}form.reset();}));
const mapCanvas=document.querySelector('[data-map-canvas]');
if(mapCanvas){let zoom=1;const setZoom=v=>{zoom=Math.min(1.6,Math.max(1,Number(v.toFixed(2))));mapCanvas.style.transform=`scale(${zoom})`;};document.querySelectorAll('[data-map-zoom]').forEach(btn=>btn.addEventListener('click',()=>{const act=btn.dataset.mapZoom;setZoom(act==='in'?zoom+0.2:act==='out'?zoom-0.2:1);}));}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const backToTopBtn=document.querySelector('[data-back-to-top]');
if(backToTopBtn){
  const toggleBackToTop=()=>{backToTopBtn.classList.toggle('visible',window.scrollY>300);};
  window.addEventListener('scroll',toggleBackToTop,{passive:true});
  toggleBackToTop();
  backToTopBtn.addEventListener('click',()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top:0,behavior:reduced?'auto':'smooth'});
  });
}
const syncCardHeadings=()=>{
  const grids=document.querySelectorAll('.grid.three, .grid.four');
  if(!grids.length)return;
  grids.forEach(grid=>{
    const headings=Array.from(grid.querySelectorAll('.card h3'));
    if(!headings.length)return;
    headings.forEach(h=>{h.style.minHeight='';});
    const rows=new Map();
    headings.forEach(h=>{
      const card=h.closest('.card');
      if(!card)return;
      const top=Math.round(card.getBoundingClientRect().top);
      if(!rows.has(top))rows.set(top,[]);
      rows.get(top).push(h);
    });
    rows.forEach(group=>{
      if(group.length<2)return;
      const heights=group.map(h=>h.getBoundingClientRect().height);
      const maxH=Math.max(...heights);
      const minH=Math.min(...heights);
      if(maxH-minH>2){group.forEach(h=>{h.style.minHeight=`${Math.ceil(maxH)}px`;});}
    });
  });
};
if(document.querySelector('.grid.three .card h3, .grid.four .card h3')){
  syncCardHeadings();
  window.addEventListener('resize',syncCardHeadings,{passive:true});
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(syncCardHeadings);}
}
