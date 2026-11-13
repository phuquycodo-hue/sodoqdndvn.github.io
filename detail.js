(function () {
  const root = document.getElementById("detailContent");
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const event = EVENTS.find(item => item.id === id);
  const period = event && PERIODS.find(item => item.id === event.period);

  if (!event) {
    root.innerHTML = `<div class="not-found"><h2>Không tìm thấy sự kiện</h2><p>Sự kiện có thể đã được đổi mã hoặc xóa khỏi dữ liệu.</p><a href="index.html">Quay lại dòng thời gian</a></div>`;
    return;
  }

  document.title = `${event.title} | Dòng thời gian lịch sử`;
  const image = event.image
    ? `<img src="${event.image}" alt="${escapeHTML(event.imageAlt || event.title)}" onerror="this.remove()">`
    : `<div class="image-placeholder">KHUNG ẢNH TƯ LIỆU<br><small>Thêm ảnh vào thư mục assets</small></div>`;

  root.innerHTML = `
    <section class="detail-hero">
      <div class="detail-heading">
        <div class="detail-kicker">${escapeHTML(period ? period.title : "")} · ${escapeHTML(event.date)}</div>
        <h1>${escapeHTML(event.title)}</h1>
        <p class="lead">${escapeHTML(event.summary)}</p>
      </div>
      <div class="detail-image">${image}</div>
    </section>
    <article class="detail-content">
      <h2>${escapeHTML(event.tag || "Nội dung sự kiện")}</h2>
      ${event.content.map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join("")}
      <div class="detail-meta">
        <span class="meta-chip">GIAI ĐOẠN: ${escapeHTML(period ? period.title : "")}</span>
        <span class="meta-chip">THỜI GIAN: ${escapeHTML(event.date)}</span>
        <span class="meta-chip">TƯ LIỆU LỊCH SỬ</span>
      </div>
    </article>`;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
})();