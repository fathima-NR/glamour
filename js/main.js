const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About Us" },
  { href: "services.html", label: "Services" },
  { href: "gallery.html", label: "Gallery" },
  { href: "offers.html", label: "Offers" },
  { href: "reviews.html", label: "Reviews" },
  { href: "contact.html", label: "Contact" },
];

const LOGO = `
  <a href="index.html" class="logo">
    <span class="logo-icon"><i class="fa-solid fa-spa"></i></span>
    <span class="logo-text">Glamour<small>Beauty Salon</small></span>
  </a>`;

function renderHeader() {
  const current = location.pathname.split("/").pop() || "index.html";
  const links = NAV_LINKS.map(
    (l) => `<li><a href="${l.href}" class="${l.href === current ? "active" : ""}">${l.label}</a></li>`
  ).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="topbar">
      <div class="container">
        <div class="topbar-info">
          <span><i class="fa-solid fa-phone"></i>+971 50 123 4567</span>
          <span><i class="fa-solid fa-envelope"></i>hello@glamourbeauty.com</span>
          <span><i class="fa-regular fa-clock"></i>Mon - Sun: 10:00 AM - 9:00 PM</span>
        </div>
        <div class="topbar-social">
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
          <a href="#" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
    </div>
    <header class="header">
      <div class="container">
        ${LOGO}
        <nav class="nav" id="nav">
          <button class="nav-close" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
          <ul>
            ${links}
            <li><a href="contact.html#booking" class="btn">Book Appointment</a></li>
          </ul>
        </nav>
        <button class="menu-toggle" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>
      </div>
    </header>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  document.getElementById("site-footer").innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          ${LOGO}
          <p>Where beauty meets elegance. We help you look and feel your best with premium hair, makeup, bridal and skincare services.</p>
          <div class="social">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
            <a href="#" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>${NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Contact Info</h4>
          <ul>
            <li><i class="fa-solid fa-location-dot"></i>Al Wasl Road, Jumeirah, Dubai</li>
            <li><i class="fa-solid fa-phone"></i>+971 50 123 4567</li>
            <li><i class="fa-solid fa-envelope"></i>hello@glamourbeauty.com</li>
            <li><i class="fa-regular fa-clock"></i>Daily 10:00 AM - 9:00 PM</li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p>Subscribe to get exclusive offers and beauty tips.</p>
          <form class="newsletter" data-success="Thanks for subscribing!">
            <input type="email" placeholder="Your email" required />
            <button type="submit" aria-label="Subscribe"><i class="fa-solid fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">&copy; ${year} Glamour Beauty Salon &amp; Spa. All rights reserved.</div>
    </footer>
    <a href="#" class="back-top" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></a>`;
}

function initNav() {
  const nav = document.getElementById("nav");
  document.querySelector(".menu-toggle").addEventListener("click", () => nav.classList.add("open"));
  document.querySelector(".nav-close").addEventListener("click", () => nav.classList.remove("open"));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

  const backTop = document.querySelector(".back-top");
  window.addEventListener("scroll", () => backTop.classList.toggle("show", window.scrollY > 400));
}

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

function initGallery() {
  const items = [...document.querySelectorAll(".gallery-item")];
  if (!items.length) return;

  document.querySelectorAll(".filters button").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelector(".filters .active").classList.remove("active");
      btn.classList.add("active");
      const f = btn.dataset.filter;
      items.forEach((i) => i.classList.toggle("hide", f !== "all" && i.dataset.cat !== f));
    })
  );

  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `
    <button class="close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    <button class="prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
    <img alt="" />
    <button class="next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>`;
  document.body.appendChild(box);
  const img = box.querySelector("img");
  let index = 0;

  const visible = () => items.filter((i) => !i.classList.contains("hide") && i.offsetParent);
  const show = (i) => {
    const list = visible();
    index = (i + list.length) % list.length;
    img.src = list[index].querySelector("img").src.replace(/w=\d+/, "w=1400");
  };

  items.forEach((item) =>
    item.addEventListener("click", () => {
      show(visible().indexOf(item));
      box.classList.add("open");
    })
  );
  box.querySelector(".close").onclick = () => box.classList.remove("open");
  box.querySelector(".prev").onclick = () => show(index - 1);
  box.querySelector(".next").onclick = () => show(index + 1);
  box.addEventListener("click", (e) => e.target === box && box.classList.remove("open"));
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") box.classList.remove("open");
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
}

function initSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;
  const track = slider.querySelector(".slider-track");
  const cards = track.children;
  let pos = 0;

  const perView = () => (innerWidth <= 600 ? 1 : innerWidth <= 1024 ? 2 : 3);
  const go = (p) => {
    const max = cards.length - perView();
    pos = p > max ? 0 : p < 0 ? max : p;
    const step = cards[0].offsetWidth + 30;
    track.style.transform = `translateX(-${pos * step}px)`;
  };

  document.querySelector(".slider-prev").onclick = () => go(pos - 1);
  document.querySelector(".slider-next").onclick = () => go(pos + 1);
  window.addEventListener("resize", () => go(pos));
  setInterval(() => go(pos + 1), 5000);
}

function initCountdown() {
  const el = document.querySelector(".countdown");
  if (!el) return;
  const end = new Date();
  end.setDate(end.getDate() + (7 - end.getDay()));
  end.setHours(23, 59, 59, 0);

  const tick = () => {
    const diff = Math.max(0, end - new Date());
    const parts = {
      days: Math.floor(diff / 864e5),
      hours: Math.floor((diff / 36e5) % 24),
      mins: Math.floor((diff / 6e4) % 60),
      secs: Math.floor((diff / 1e3) % 60),
    };
    Object.entries(parts).forEach(([k, v]) => {
      el.querySelector(`[data-${k}]`).textContent = String(v).padStart(2, "0");
    });
  };
  tick();
  setInterval(tick, 1000);
}

function initForms() {
  document.querySelectorAll("form[data-success]").forEach((form) =>
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector(".form-msg");
      if (msg) {
        msg.textContent = form.dataset.success;
        msg.classList.add("show");
        setTimeout(() => msg.classList.remove("show"), 6000);
      } else {
        alert(form.dataset.success);
      }
      form.reset();
    })
  );

  const service = new URLSearchParams(location.search).get("service");
  const select = document.querySelector("#booking select[name='service']");
  if (service && select) select.value = service;

  const date = document.querySelector("#booking input[type='date']");
  if (date) date.min = new Date().toISOString().split("T")[0];
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  initNav();
  initReveal();
  initGallery();
  initSlider();
  initCountdown();
  initForms();
});
