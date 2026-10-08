    // ─── LOADING ──────────────────────────────────────────────────────────────
    // Oculta a tela de loading 2 segundos após o load completo da página.
    // Para aumentar/diminuir o tempo, altere o valor "2000" (em milissegundos).
    window.addEventListener('load', () => {
      setTimeout(() => { document.getElementById('loading').classList.add('hidden'); document.body.classList.remove('is-loading'); }, 2000);
    });

    // ─── CURSOR PERSONALIZADO ─────────────────────────────────────────────────
    // Segue o mouse com um ponto e um anel. Expande ao passar em links/botões.
    const cur = document.getElementById('cursor'), ring = document.getElementById('cursor-ring');
    document.addEventListener('mousemove', e => {
      cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
      ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', () => { cur.style.transform = 'translate(-50%,-50%) scale(2)'; ring.style.opacity = '0' });
      el.addEventListener('mouseleave', () => { cur.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.opacity = '1' });
    });

    // ─── EFEITO DIGITAÇÃO ─────────────────────────────────────────────────────
    // Alterna entre as frases abaixo com animação de digitação/apagamento.
    // Para adicionar/remover frases, edite o array "phrases".
    const phrases = ['Python Developer', 'Django Developer', 'Java Developer', 'Front-End Developer', 'Back-End Developer', 'Full Stack em formação'];
    let pi = 0, ci = 0, del = false, paused = false;
    const typedEl = document.getElementById('typed-text');
    /**
     * Executa a animação de digitação (efeito de máquina de escrever) no Hero Section.
     * Alterna recursivamente entre as frases definidas no array 'phrases'.
     */
    function type() {
      if (paused) { setTimeout(type, 1500); paused = false; return }
      const phrase = phrases[pi];
      if (!del) {
        typedEl.textContent = phrase.slice(0, ++ci);
        if (ci === phrase.length) { del = true; paused = true }
      } else {
        typedEl.textContent = phrase.slice(0, --ci);
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length }
      }
      setTimeout(type, del ? 60 : 100);
    }
    type();

    // ─── ALTERNÂNCIA DE TEMA ──────────────────────────────────────────────────
    // Troca entre dark e light; a preferência é salva no localStorage do navegador.
    const themBtn = document.getElementById('theme-btn'), thIcon = document.getElementById('theme-icon');
    let theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    thIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    themBtn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      thIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });

    // ─── MENU MOBILE ──────────────────────────────────────────────────────────
    /**
     * Fecha o menu mobile removendo a classe 'open'.
     */
    function closeMobile() { document.getElementById('mobile-menu').classList.remove('open') }
    document.getElementById('hamburger').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('open');
    });

    // ─── BOTÃO VOLTAR AO TOPO ─────────────────────────────────────────────────
    // Aparece após 400px de scroll. Altere o valor para mudar o ponto de exibição.
    const btop = document.getElementById('back-top');
    window.addEventListener('scroll', () => { btop.classList.toggle('show', window.scrollY > 400) });

    // ─── SCROLL REVEAL + BARRAS DE SKILL ─────────────────────────────────────
    // Anima elementos com .reveal, .reveal-left e .reveal-right ao entrarem na tela.
    // Também aciona o preenchimento das barras de proficiência da Stack.
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.querySelectorAll('.tech-fill').forEach(bar => { bar.style.width = bar.dataset.level + '%' });
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => observer.observe(el));

    // Observer adicional para as barras quando a seção Stack fica visível
    document.querySelectorAll('.tech-fill').forEach(bar => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) bar.style.width = bar.dataset.level + '%' });
      }, { threshold: 0.2 });
      const stackSection = document.getElementById('qualificacoes');
      if (stackSection) obs.observe(stackSection);
    });

    // ─── EFEITO DE BRILHO (GLOW) NAS LINHAS DE SEÇÃO ─────────────────────────
    // Faz com que as .section-line brilhem por 2s sempre que entram na tela.
    const lineObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('glow');
          // Remove a classe após a animação de 2s para que possa ser ativada novamente na próxima vez
          setTimeout(() => e.target.classList.remove('glow'), 2000);
        }
      });
    }, { threshold: 1.0 });
    document.querySelectorAll('.section-line').forEach(line => lineObserver.observe(line));

    // ─── CÁLCULO DE IDADE ─────────────────────────────────────────────────────
    // Calcula a idade atual com base na data de nascimento definida abaixo.
    // Para alterar a data de nascimento: new Date(ANO, MÊS-1, DIA)
    (function () {
      const dob = new Date(1996, 0, 24);
      const now = new Date();
      let age = now.getFullYear() - dob.getFullYear();
      if (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate())) age--;
      document.getElementById('age-display').textContent = age;
    })();

    // ─── ANO DO FOOTER ────────────────────────────────────────────────────────
    document.getElementById('year').textContent = new Date().getFullYear();

    /**
     * Copia o endereço de e-mail para a área de transferência do usuário
     * e exibe um feedback visual temporário no botão que disparou o evento.
     */
    function copyEmail() {
      navigator.clipboard.writeText('ads.renandepaula@gmail.com').then(() => {
        const btn = event.target.closest('button');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        btn.style.borderColor = 'var(--green)'; btn.style.color = 'var(--green)';
        setTimeout(() => { btn.innerHTML = orig; btn.style.borderColor = ''; btn.style.color = '' }, 2000);
      });
    }

    // ─── LINK ATIVO NA NAVBAR ─────────────────────────────────────────────────
    // Destaca em azul o link correspondente à seção visível durante o scroll.
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const sy = window.scrollY + 80;
      sections.forEach(sec => {
        const id = sec.getAttribute('id');
        const link = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (link) link.style.color = sy >= sec.offsetTop && sy < sec.offsetTop + sec.offsetHeight ? 'var(--blue)' : 'var(--muted)';
      });
    });

    // ─── CARROSSEL DE PROJETOS ────────────────────────────────────────────────
    // Exibe 3 cards em desktop, 2 em tablet (≤900px) e 1 em mobile (≤580px).
    // Suporta navegação por setas, dots e swipe touch.
    /**
     * Inicializa um carrossel interativo.
     * @param {string} trackId - ID do contêiner que segura os slides.
     * @param {string} viewportId - ID da área visível do carrossel.
     * @param {string} prevBtnId - ID do botão de "voltar".
     * @param {string} nextBtnId - ID do botão de "avançar".
     * @param {string} dotsId - ID do contêiner onde as "bolinhas" de navegação serão geradas.
     * @param {boolean} [isCourses=false] - Define se o carrossel é o de cursos (comportamento específico de responsividade).
     */
    function initCarousel(trackId, viewportId, prevBtnId, nextBtnId, dotsId, isCourses = false) {
      const track = document.getElementById(trackId);
      const viewport = document.getElementById(viewportId);
      const btnPrev = document.getElementById(prevBtnId);
      const btnNext = document.getElementById(nextBtnId);
      const dotsEl = document.getElementById(dotsId);

      if (!track || !viewport || !btnPrev || !btnNext || !dotsEl) return;

      const slides = Array.from(track.querySelectorAll('.carousel-slide'));
      const total = slides.length;
      let current = 0;

      function visibleCount() {
        if (isCourses) return 1;
        const w = viewport.offsetWidth;
        if (w <= 580) return 1;
        if (w <= 900) return 2;
        return 3;
      }

      function buildDots() {
        dotsEl.innerHTML = '';
        const pages = Math.ceil(total / visibleCount());
        for (let i = 0; i < pages; i++) {
          const d = document.createElement('button');
          d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
          d.setAttribute('aria-label', 'Página ' + (i + 1));
          d.addEventListener('click', () => goTo(i * visibleCount()));
          dotsEl.appendChild(d);
        }
      }

      function goTo(i) {
        const vc = visibleCount();
        const max = Math.max(0, total - vc);
        current = Math.min(Math.max(i, 0), max);

        const slideW = slides[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(track).gap) || 24;
        track.style.transform = `translateX(-${current * (slideW + gap)}px)`;

        const activePage = Math.floor(current / vc);
        dotsEl.querySelectorAll('.carousel-dot').forEach((d, idx) => {
          d.classList.toggle('active', idx === activePage);
        });

        btnPrev.disabled = current === 0;
        btnNext.disabled = current >= max;
      }

      btnPrev.addEventListener('click', () => goTo(current - visibleCount()));
      btnNext.addEventListener('click', () => goTo(current + visibleCount()));

      let touchX = 0;
      viewport.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
      viewport.addEventListener('touchend', e => {
        const diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
      }, { passive: true });

      window.addEventListener('resize', () => { buildDots(); goTo(0); });

      // Only initialize if there are multiple pages
      if (total > visibleCount()) {
          buildDots();
          goTo(0);
      } else {
          btnPrev.style.display = 'none';
          btnNext.style.display = 'none';
      }
    }

    function init3DCarousel(trackId, viewportId, prevBtnId, nextBtnId, dotsId) {
      const track = document.getElementById(trackId);
      const viewport = document.getElementById(viewportId);
      const btnPrev = document.getElementById(prevBtnId);
      const btnNext = document.getElementById(nextBtnId);
      const dotsEl = document.getElementById(dotsId);

      if (!track || !viewport || !btnPrev || !btnNext) return;

      viewport.classList.add('carousel-viewport-3d');
      track.classList.add('carousel-track-3d');

      const slides = Array.from(track.querySelectorAll('.carousel-slide'));
      const total = slides.length;
      if (total === 0) return;

      slides.forEach(slide => {
        slide.classList.remove('carousel-slide');
        slide.classList.add('carousel-slide-3d');
      });

      let current = 0;
      let theta = 360 / total;
      let radius = 0;

      function update3D() {
        const width = track.offsetWidth;
        radius = Math.round((width / 2) / Math.tan(Math.PI / total)) + 20; 
        
        slides.forEach((slide, i) => {
          const angle = theta * i;
          slide.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });
        
        rotateCarousel();
      }

      function rotateCarousel() {
        const angle = theta * current * -1;
        track.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
        
        let activeIndex = ((current % total) + total) % total;
        slides.forEach((slide, i) => {
          slide.classList.toggle('active-slide', i === activeIndex);
        });
        
        if(dotsEl) {
          Array.from(dotsEl.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
          });
        }
      }

      if(dotsEl) {
        dotsEl.innerHTML = '';
        for (let i = 0; i < total; i++) {
          const d = document.createElement('button');
          d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
          d.setAttribute('aria-label', 'Projeto ' + (i + 1));
          d.addEventListener('click', () => {
             let activeIndex = ((current % total) + total) % total;
             let diff = i - activeIndex;
             if (diff > total/2) diff -= total;
             if (diff < -total/2) diff += total;
             current += diff;
             rotateCarousel();
          });
          dotsEl.appendChild(d);
        }
      }

      btnPrev.addEventListener('click', () => { current--; rotateCarousel(); });
      btnNext.addEventListener('click', () => { current++; rotateCarousel(); });

        let autoPlay = setInterval(() => { current++; rotateCarousel(); }, 3000);
        viewport.addEventListener('mouseenter', () => clearInterval(autoPlay));
        viewport.addEventListener('mouseleave', () => autoPlay = setInterval(() => { current++; rotateCarousel(); }, 3000));
        viewport.addEventListener('touchstart', () => clearInterval(autoPlay), {passive: true});
        viewport.addEventListener('touchend', () => autoPlay = setInterval(() => { current++; rotateCarousel(); }, 3000));

      let startX = 0;
      let isDragging = false;
      viewport.addEventListener('mousedown', e => { isDragging = true; startX = e.clientX; });
      viewport.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) current--; else current++;
          rotateCarousel();
          isDragging = false;
        }
      });
      viewport.addEventListener('mouseup', () => isDragging = false);
      viewport.addEventListener('mouseleave', () => isDragging = false);

      viewport.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive: true});
      viewport.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) current--; else current++;
          rotateCarousel();
        }
      }, {passive: true});

      window.addEventListener('resize', update3D);
      setTimeout(update3D, 100);
    }

    init3DCarousel('carousel-track', 'carousel-viewport', 'carousel-prev', 'carousel-next', 'carousel-dots');
    initCarousel('courses-track', 'courses-viewport', 'courses-prev', 'courses-next', 'courses-dots', true);
// ====== Experiencia Modal ======
/**
 * Abre o modal de detalhes de experiência educacional/profissional.
 * @param {string} role - O título da vaga ou do curso.
 * @param {string} company - O nome da empresa ou instituição.
 * @param {string} date - O período (ex: "2023 - Atual").
 * @param {string} desc - A descrição detalhada das atividades ou conhecimentos.
 */
function openExpModal(role, company, date, desc) {
  document.getElementById('exp-modal-role').innerText = role;
  document.getElementById('exp-modal-company').innerText = company;
  document.getElementById('exp-modal-date').innerText = date;
  document.getElementById('exp-modal-desc').innerText = desc;
  document.getElementById('exp-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Fecha o modal de experiência se o usuário clicar no botão de fechar
 * ou fora da área do conteúdo do modal.
 * @param {Event} event - O evento de clique gerado pelo navegador.
 */
function closeExpModal(event) {
  if (event && event.target !== event.currentTarget) {
    if(!event.target.classList.contains('exp-modal-close')) {
      return;
    }
  }
  document.getElementById('exp-modal').classList.remove('active');
  document.body.style.overflow = '';
}


// ====== CARTESIAN BADGE MAP ======

const cartesianBadges = [
  // Q1: I.A e Dados (Top Right)
  { name: 'AI Fundamentals', level: 'IBM', q: 1, color: '#3b82f6', tx: 180, ty: -60, icon: 'fas fa-brain', url: 'https://www.credly.com/badges/ef2abd7c-8d98-44a6-a6dd-349fe0a470c9/public_url' },
  { name: 'Gemini for Cloud Arch.', level: 'Google', q: 1, color: '#3b82f6', tx: 400, ty: -100, icon: 'fab fa-google', url: 'https://www.skills.google/public_profiles/39ad1ca5-987a-4f2f-b077-50f9585590a9/badges/25920933' },
  { name: 'Gemini for App Dev.', level: 'Google', q: 1, color: '#3b82f6', tx: 120, ty: -180, icon: 'fab fa-google', url: 'https://www.skills.google/public_profiles/39ad1ca5-987a-4f2f-b077-50f9585590a9/badges/25920911' },
  { name: 'Intro to AI Agents', level: 'Google', q: 1, color: '#3b82f6', tx: 300, ty: -220, icon: 'fab fa-google', url: 'https://www.skills.google/public_profiles/39ad1ca5-987a-4f2f-b077-50f9585590a9/badges/25738321' },

  // Q3: Cybersegurança (Bottom Left)
  { name: 'Cybersecurity Intro', level: 'Cisco', q: 3, color: '#ef4444', tx: -150, ty: 80, icon: 'fas fa-shield-alt', url: 'https://www.credly.com/badges/fbd124b0-b8b1-4207-99e7-177ed866408e/public_url' },

  // Q4: Back-end (Bottom Right)
  { name: 'Python Essentials 1', level: 'Cisco', q: 4, color: '#f97316', tx: 160, ty: 100, icon: 'fab fa-python', url: 'https://www.credly.com/badges/3e2067e7-dc97-4220-8547-c9f3a28dbb99/public_url' },
];

function openCartesianOverlay() {
  const mapSection = document.getElementById('cartesian-badges');
  if (!mapSection) return;

  mapSection.style.display = 'block';
  // Pequeno delay para a transição de opacity funcionar
  setTimeout(() => {
    mapSection.style.opacity = '1';
    
    // Dispara a animação dos neurônios (linhas SVG + Badges)
    if (!badgesExploded) {
      explodeBadges();
    }
  }, 50);
}

function closeCartesianOverlay() {
  const mapSection = document.getElementById('cartesian-badges');
  if (!mapSection) return;

  mapSection.style.opacity = '0';
  setTimeout(() => {
    mapSection.style.display = 'none';
    
    // Retrai as badges abertas e limpa as linhas SVG para o próximo clique
    if (badgesExploded) {
      explodeBadges(); 
    }
  }, 600);
}

let badgesExploded = false;

function explodeBadges() {
  const layer = document.getElementById('badges-layer');
  const svgLayer = document.getElementById('connections-layer');
  if (!layer || !svgLayer) return;

  if (badgesExploded) {
    // Retract
    const pills = layer.querySelectorAll('.cartesian-pill');
    pills.forEach(p => {
      p.style.transform = 'translate(-50%, -50%) scale(0)';
      p.style.opacity = '0';
    });
    
    // Esconder as linhas SVG
    const lines = svgLayer.querySelectorAll('.connection-line');
    lines.forEach(l => {
      l.classList.remove('drawn');
      l.style.opacity = '0';
    });

    setTimeout(() => { 
      layer.innerHTML = ''; 
      svgLayer.innerHTML = '';
      badgesExploded = false; 
    }, 600);
    return;
  }

  // Explode
  badgesExploded = true;
  layer.innerHTML = '';
  svgLayer.innerHTML = '';

  const shuffled = [...cartesianBadges].sort(() => 0.5 - Math.random());
  
  // Pegar dimensões para o centro exato do SVG
  const mapRect = document.getElementById('cartesian-map').getBoundingClientRect();
  const centerX = mapRect.width / 2;
  const centerY = mapRect.height / 2;

  shuffled.forEach((b, index) => {
    // ---- 1. Criar a Badge (Nó) ----
    const pill = document.createElement('a');
    pill.href = b.url || '#';
    if (b.url && b.url !== '#') {
      pill.target = '_blank';
      pill.rel = 'noopener noreferrer';
    } else {
      pill.onclick = (e) => { e.preventDefault(); };
    }
    pill.className = 'cartesian-pill';
    pill.style.borderColor = b.color;
    
    pill.innerHTML = `
      <div class="pill-icon" style="color: ${b.color}; border: 1px solid ${b.color}; box-shadow: 0 0 10px ${b.color}80;">
        <i class="${b.icon || 'fas fa-certificate'}"></i>
      </div>
      <div class="pill-text-col">
        <span class="pill-text">${b.name}</span>
        <span class="pill-level">${b.level}</span>
      </div>
    `;

    layer.appendChild(pill);

    // ---- 2. Criar a Linha SVG ----
    let factor = window.innerWidth <= 768 ? 0.6 : 1;
    let finalTx = b.tx * factor;
    let finalTy = b.ty * factor;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', centerX);
    line.setAttribute('y1', centerY);
    line.setAttribute('x2', centerX + finalTx);
    line.setAttribute('y2', centerY + finalTy);
    line.setAttribute('stroke', b.color);
    line.classList.add('connection-line');
    svgLayer.appendChild(line);

    // Calcular o comprimento da linha para a animação do dash
    const length = Math.sqrt(finalTx*finalTx + finalTy*finalTy);
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;

    // ---- 3. Aplicar Animações com Stagger ----
    setTimeout(() => {
      pill.style.setProperty('--tx', `${finalTx}px`);
      pill.style.setProperty('--ty', `${finalTy}px`);
      pill.classList.add('exploded');
      pill.style.opacity = '1';
      
      // Animar linha
      line.classList.add('drawn');
    }, 100 * index); // 100ms delay para ficar mais dramático
  });
}

// ====== DRAG TO SCROLL (TIMELINE) ======
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.cyber-timeline-wrapper');
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    // Disable smooth scroll during drag
    slider.style.scrollBehavior = 'auto';
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
    slider.style.scrollBehavior = 'smooth';
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
    slider.style.scrollBehavior = 'smooth';
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    slider.scrollLeft = scrollLeft - walk;
  });
});

// Expand Timeline Function
function expandTimeline() {
  const timeline = document.getElementById('cyber-timeline');
  if (timeline) {
    timeline.classList.remove('collapsed');
  }
}

// === TERMINAL RAIN EFFECT ===
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'terminal-rain';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '-2',
    pointerEvents: 'none'
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()<>{}[]';
  const fontSize = 16;
  let columns = Math.floor(width / fontSize);
  let drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * -100; // start offscreen randomly
  }

  window.addEventListener('resize', () => {
    columns = Math.floor(window.innerWidth / fontSize);
    while (drops.length < columns) {
      drops.push(Math.random() * -100);
    }
  });

  function drawRain() {
    // Check theme for trail background color
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLight ? 'rgba(240, 244, 255, 0.1)' : 'rgba(8, 12, 20, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      
      // Use theme colors
      if (Math.random() > 0.5) {
        ctx.fillStyle = '#38bdf8'; // blue
      } else {
        ctx.fillStyle = '#8b5cf6'; // purple
      }

      // Draw char
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawRain, 40);
})();

