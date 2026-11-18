/*
 * Trang VIDEO có 5 chuyên mục riêng.
 * Không sử dụng PERIODS từ Timeline để tránh thay đổi/lỗi hiển thị.
 */
const VIDEO_PERIODS = [
  { title: "Các tổ chức tiền thân", period: "1930–1944", folder: "01-to-chuc-tien-than" },
  { title: "Cách mạng tháng Tám", period: "1944–1945", folder: "02-cach-mang-thang-tam" },
  { title: "Kháng chiến chống thực dân Pháp", period: "1945–1954", folder: "02-khang-chien-chong-phap" },
  { title: "Kháng chiến chống Mỹ, cứu nước", period: "1954–1975", folder: "03-khang-chien-chong-my" },
  { title: "Bảo vệ Tổ quốc và xây dựng nền quốc phòng toàn dân", period: "1975–nay", folder: "04-bao-ve-to-quoc-doi-moi" }
];

const root = document.getElementById('videoSections');
const files = Array.isArray(window.VIDEO_FILES) ? window.VIDEO_FILES : [[], [], [], [], []];
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[ch]));
const filePath = (periodIndex, fileName) =>
  `videos/${VIDEO_PERIODS[periodIndex].folder}/${encodeURIComponent(fileName)}`;

if (root) {
  root.innerHTML = VIDEO_PERIODS.map((p, i) => {
    const vids = Array.isArray(files[i]) ? files[i] : [];
    const cards = vids.length ? vids.map((v, j) => {
      const poster = v.poster ? filePath(i, v.poster) : '';
      const thumb = poster
        ? ` style="background-image:linear-gradient(#0000000a,#0000003a),url('${poster}')"`
        : '';
      return `<button type="button" class="video-card" data-period="${i}" data-index="${j}" aria-label="Phát video ${esc(v.title)}">
        <span class="video-thumbnail"${thumb}>
          <span class="video-play" aria-hidden="true">▶</span>
          ${poster ? '' : '<span class="video-thumb-caption">ẢNH BÌA VIDEO</span>'}
        </span>
        <span class="video-title">${esc(v.title)}</span>
        <span class="video-caption">Nhấn để xem toàn bộ video</span>
      </button>`;
    }).join('') : `<div class="video-empty-large">
      <span class="video-empty-symbol" aria-hidden="true">▶</span>
      <h3>Chưa có video cho giai đoạn này</h3>
      <p>Thêm video và ảnh bìa vào thư mục rồi khai báo trong data/videos.js.</p>
      <small>Thư mục: <code>videos/${p.folder}/</code></small>
    </div>`;
    return `<section class="video-period">
      <div class="video-period-head">
        <span class="period-number">${String(i + 1).padStart(2, '0')}</span>
        <div><h2>${esc(p.title)}</h2><small>${esc(p.period)}</small></div>
        <span class="video-total">${vids.length} video</span>
      </div>
      <div class="video-grid">${cards}</div>
    </section>`;
  }).join('');
}

const dialog = document.getElementById('videoViewer');
const player = document.getElementById('videoPlayer');
const closeButton = document.getElementById('closeVideo');

function closeVideo() {
  if (!player || !dialog) return;
  player.pause();
  player.removeAttribute('src');
  player.load();
  if (dialog.open) dialog.close();
}

if (root && dialog && player && closeButton) {
  root.addEventListener('click', evt => {
    const card = evt.target.closest('.video-card');
    if (!card) return;
    const i = Number(card.dataset.period);
    const j = Number(card.dataset.index);
    const vid = files[i]?.[j];
    if (!vid) return;
    document.getElementById('videoTitle').textContent = vid.title;
    document.getElementById('videoSub').textContent =
      `${VIDEO_PERIODS[i].title} (${VIDEO_PERIODS[i].period})`;
    player.src = filePath(i, vid.file);
    if (vid.poster) player.poster = filePath(i, vid.poster);
    else player.removeAttribute('poster');
    dialog.showModal();
    player.play().catch(() => {});
  });
  closeButton.addEventListener('click', closeVideo);
  dialog.addEventListener('close', () => {
    player.pause();
    player.removeAttribute('src');
    player.load();
  });
  dialog.addEventListener('click', evt => {
    if (evt.target === dialog) closeVideo();
  });
}
