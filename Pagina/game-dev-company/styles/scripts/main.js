// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// IntersectionObserver para reveals (respeta prefer-reduced-motion)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (prefersReduced) {
  reveals.forEach(r => r.classList.add('show'));
} else {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        obs.unobserve(e.target);
      }
    });
  }, {threshold:.14});
  reveals.forEach(el => io.observe(el));
}

// Newsletter demo + copiar cupón
const form = document.getElementById('form-news');
const msg = document.getElementById('msg');
const copyBtn = document.getElementById('copy');

if (form) {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const email = new FormData(form).get('email') || '';
    msg.textContent = email ? `¡Listo, ${email}! Revisa tu bandeja de entrada ✉️` : '¡Gracias! Revisa tu bandeja de entrada ✉️';
    msg.style.color = '#c7f5ff';
    form.reset();
    msg.setAttribute('role','status');
  });
}

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const code = 'GG-20-JKEICEDEV';
    try {
      await navigator.clipboard.writeText(code);
      copyBtn.textContent = '¡Copiado ✔';
      setTimeout(() => copyBtn.textContent = 'Copiar código -20%', 1800);
    } catch (e){
      alert(`Tu código: ${code}`);
    }
  });
}

// accesibilidad: saltar al main con tecla "/"
window.addEventListener('keydown', (e)=>{
  if(e.key === '/'){
    const main = document.getElementById('main');
    if(main){
      e.preventDefault();
      main.focus({preventScroll:false});
      window.scrollTo({top: main.offsetTop - 16, behavior: 'smooth'});
    }
  }
});