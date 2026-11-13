(function () {
  const timeline = document.getElementById("timeline");
  const nav = document.getElementById("periodNav");
  const count = document.getElementById("eventCount");
  if (!timeline || !Array.isArray(EVENTS) || !Array.isArray(PERIODS)) return;

  count.textContent = EVENTS.length;
  nav.innerHTML = PERIODS.map(p =>
    `<a class="period-link" href="#period-${p.id}" data-period="${p.id}"><b>${p.title}</b></a>`
  ).join("");

  timeline.innerHTML = PERIODS.map(period => {
    const items = EVENTS.filter(e => e.period === period.id);
    if (!items.length) return "";
    return `
      <section class="period-block" id="period-${period.id}">
        <div class="period-title">
          <span class="period-dot"></span>
          <div><h3>${period.title}</h3><span>${period.label}</span></div>
        </div>
        ${items.map(event => `
          <article class="event-card">
            <div class="event-copy">
              <div class="event-date">${event.date}</div>
              <h4>${event.title}</h4>
              <p>${event.summary}</p>
              <span class="event-tag">${event.tag}</span><br>
              <a class="detail-link" href="detail.html?id=${encodeURIComponent(event.id)}">Chi tiết sự kiện <span>↗</span></a>
            </div>
            <div class="event-visual">
              ${event.image
                ? `<img src="${event.image}" alt="${escapeHTML(event.imageAlt || event.title)}" onerror="this.remove()">`
                : `<div class="image-placeholder">TƯ LIỆU LỊCH SỬ<br><small>${escapeHTML(event.date)}</small></div>`}
            </div>
          </article>
        `).join("")}
      </section>`;
  }).join("");

  const links = [...document.querySelectorAll(".period-link")];
  const blocks = [...document.querySelectorAll(".period-block")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => link.classList.toggle("active", link.dataset.period === entry.target.id.replace("period-","")));
        }
      });
    }, { rootMargin: "-25% 0px -60% 0px" });
    blocks.forEach(block => observer.observe(block));
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
})();