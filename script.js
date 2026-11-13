
const body=document.body;
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.innerHTML=open?'✕':'☰';});}
const themeBtn=document.querySelector('[data-theme-toggle]');
const savedTheme=localStorage.getItem('elder-theme');
if(savedTheme)body.dataset.theme=savedTheme;
if(themeBtn){themeBtn.addEventListener('click',()=>{const next=body.dataset.theme==='dark'?'light':'dark';body.dataset.theme=next;localStorage.setItem('elder-theme',next);themeBtn.textContent=next==='dark'?'☀':'◐';});}
const rtlBtn=document.querySelector('[data-rtl-toggle]');
if(rtlBtn){rtlBtn.addEventListener('click',()=>{const rtl=body.dir!=='rtl';body.dir=rtl?'rtl':'ltr';rtlBtn.textContent=rtl?'LTR':'RTL';});}
document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const toast=form.querySelector('.toast');if(toast){toast.textContent='Thank you. Your enquiry has been captured in this demo. Please connect a secure form service before publishing.';toast.classList.add('show');}form.reset();}));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
