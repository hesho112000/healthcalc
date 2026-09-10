document.addEventListener('DOMContentLoaded',()=>{
 const navbar=document.querySelector('.premium-navbar');
 const hamburger=document.querySelector('.nav-hamburger');
 const drawer=document.querySelector('.nav-drawer');
 const overlay=document.querySelector('.nav-overlay');
 function toggle(){drawer.classList.toggle('open');overlay.classList.toggle('open');hamburger.classList.toggle('open')}
 if(hamburger){hamburger.addEventListener('click',toggle)}
 if(overlay){overlay.addEventListener('click',toggle)}
 window.addEventListener('scroll',()=>{if(window.scrollY>20)navbar.classList.add('scrolled');else navbar.classList.remove('scrolled')});
 const path=window.location.pathname;document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a=>{if(a.getAttribute('href')===path||path.includes(a.getAttribute('href').replace('.html',''))){a.classList.add('active')}});
});