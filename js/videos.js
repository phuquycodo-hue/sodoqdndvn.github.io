/*
 * Video: 5 giai đoạn riêng, không thay đổi dữ liệu Timeline.
 * Hỗ trợ đồng thời MP4/WebM/Ogg trong thư mục và video YouTube nhúng.
 * Gói vá 2026-11-17. Không cần sửa videos.html hay style.css.
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

// Mã hóa tên tệp, kể cả dấu nháy, dấu cách và dấu ngoặc đơn.
const encodeFileName = name => encodeURIComponent(String(name ?? ''))
  .replace(/[!'()*]/g, ch => '%' + ch.charCodeAt(0).toString(16).toUpperCase());
const filePath = (periodIndex, fileName) =>
  `videos/${VIDEO_PERIODS[periodIndex].folder}/${encodeFileName(fileName)}`;

// Chỉ công nhận YouTube để tránh nhúng liên kết đến trang lạ.
function youtubeId(value) {
  const input = String(value ?? '').trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  let url;
  try { url = new URL(input); } catch (error) { return null; }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  const host = url.hostname.toLowerCase();
  let id = '';
  if (host === 'youtu.be' || host === 'www.youtu.be') {
    id = url.pathname.split('/').filter(Boolean)[0] || '';
  } else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com',
              'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)) {
    const parts = url.pathname.split('/').filter(Boolean);
    id = parts[0] === 'watch' ? (url.searchParams.get('v') || '')
      : ['embed', 'shorts', 'live', 'v'].includes(parts[0]) ? (parts[1] || '')
      : '';
  }
  return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}

function youtubeValue(video) {
  return String(video.youtube || video.youtubeUrl || video.youtube_url || '').trim();
}

// Hỗ trợ cả cách dán URL YouTube vào thuộc tính file, nhưng khuyên dùng youtube: ...
function videoYoutubeId(video) {
  return youtubeId(youtubeValue(video)) || youtubeId(video.file);
}

if (root) {
  root.innerHTML = VIDEO_PERIODS.map((period, i) => {
    const vids = Array.isArray(files[i]) ? files[i] : [];
    const cards = vids.length ? vids.map((video, j) => {
      const ytId = videoYoutubeId(video);
      const poster = video.poster ? filePath(i, video.poster)
        : (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : '');
      const thumb = poster ? ` style="background-image:linear-gradient(#0000000a,#0000003a),url('${poster}')"` : '';
      const caption = youtubeValue(video) || ytId ? '▶ Xem video YouTube' : '▶ Xem video';
      return `<button type="button" class="video-card" data-period="${i}" data-index="${j}" aria-label="Phát video ${esc(video.title)}">
        <span class="video-thumbnail"${thumb}>
          <span class="video-play" aria-hidden="true">▶</span>
          ${poster ? '' : '<span class="video-thumb-caption">ẢNH BÌA VIDEO</span>'}
        </span>
        <span class="video-title">${esc(video.title)}</span>
        <span class="video-caption">${caption}</span>
      </button>`;
    }).join('') : `<div class="video-empty-large">
      <span class="video-empty-symbol" aria-hidden="true">▶</span>
      <h3>Chưa có video cho giai đoạn này</h3>
      <p>Thêm link YouTube hoặc tệp MP4 và khai báo trong data/videos.js.</p>
      <small>Thư mục ảnh bìa/video: <code>videos/${period.folder}/</code></small>
    </div>`;
    return `<section class="video-period">
      <div class="video-period-head">
        <span class="period-number">${String(i + 1).padStart(2, '0')}</span>
        <div><h2>${esc(period.title)}</h2><small>${esc(period.period)}</small></div>
        <span class="video-total">${vids.length} video</span>
      </div>
      <div class="video-grid">${cards}</div>
    </section>`;
  }).join('');
}

const dialog = document.getElementById('videoViewer');
const player = document.getElementById('videoPlayer');
const closeButton = document.getElementById('closeVideo');
let embed = null;
let errorMessage = null;

function clearPlayback() {
  // Khi đóng cửa sổ, phải hủy iframe để YouTube ngừng phát âm thanh.
  if (embed) { embed.removeAttribute('src'); embed.remove(); embed = null; }
  if (errorMessage) { errorMessage.remove(); errorMessage = null; }
  if (player) {
    player.pause();
    player.removeAttribute('src');
    player.removeAttribute('poster');
    player.load();
    player.style.display = '';
  }
}

function closeVideo() {
  if (dialog?.open) dialog.close();
  else clearPlayback();
}

if (root && dialog && player && closeButton) {
  root.addEventListener('click', event => {
    const card = event.target.closest('.video-card');
    if (!card) return;
    const i = Number(card.dataset.period);
    const j = Number(card.dataset.index);
    const video = files[i]?.[j];
    if (!video || !VIDEO_PERIODS[i]) return;

    clearPlayback();
    document.getElementById('videoTitle').textContent = video.title || 'Video lịch sử';
    document.getElementById('videoSub').textContent =
      `${VIDEO_PERIODS[i].title} (${VIDEO_PERIODS[i].period})`;

    const requestedYoutube = youtubeValue(video);
    const id = videoYoutubeId(video);
    const fileIsYoutube = String(video.file || '').includes('youtu');
    if (id) {
      player.style.display = 'none';
      embed = document.createElement('iframe');
      embed.title = 'Phát video YouTube: ' + (video.title || 'Video lịch sử');
      embed.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      embed.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      embed.allowFullscreen = true;
      embed.referrerPolicy = 'strict-origin-when-cross-origin';
      Object.assign(embed.style, {
        display: 'block', width: '100%', aspectRatio: '16 / 9',
        maxHeight: 'calc(100vh - 190px)', border: '0', borderRadius: '9px', background: '#000'
      });
      player.insertAdjacentElement('afterend', embed);
    } else if (requestedYoutube || fileIsYoutube) {
      player.style.display = 'none';
      errorMessage = document.createElement('p');
      errorMessage.textContent = 'Đường link YouTube không hợp lệ. Hãy kiểm tra trường "youtube" trong data/videos.js.';
      errorMessage.style.cssText = 'padding:22px;border:1px solid #c9a85b;border-radius:8px;line-height:1.5';
      player.insertAdjacentElement('afterend', errorMessage);
    } else if (video.file) {
      // Video lưu trực tiếp trên máy / máy chủ (MP4, WebM, Ogg)
      player.src = filePath(i, video.file);
      if (video.poster) player.poster = filePath(i, video.poster);
    } else {
      player.style.display = 'none';
      errorMessage = document.createElement('p');
      errorMessage.textContent = 'Chưa khai báo video. Hãy điền link YouTube hoặc file MP4 trong data/videos.js.';
      player.insertAdjacentElement('afterend', errorMessage);
    }

    dialog.showModal();
    if (!id && video.file && !requestedYoutube && !fileIsYoutube) {
      player.play().catch(() => {});
    }
  });
  closeButton.addEventListener('click', closeVideo);
  dialog.addEventListener('close', clearPlayback);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeVideo();
  });
}
