(()=>{
const defaults={theme:'olive',accent:'gold',fontSize:17,fontFamily:'system',lineHeight:'1.5',contentWidth:'normal',density:'normal',corners:'rounded',textAlign:'justify',motion:'normal'};
function read(){try{const s=JSON.parse(localStorage.getItem('vpaSiteSettings')||'{}');return {...defaults,...s}}catch{return {...defaults}}}
function apply(){const s=read(),h=document.documentElement;for(const k of ['theme','accent','fontFamily','contentWidth','density','corners','textAlign','motion'])h.dataset[k]=s[k];h.style.setProperty('--base-font',Math.max(14,Math.min(25,Number(s.fontSize)||17))+'px');h.style.setProperty('--reader-lineheight',(['1.5','1.65','1.8','2'].includes(String(s.lineHeight))?s.lineHeight:'1.5'));}
window.siteDefaults=defaults;
window.saveSiteSettings=changes=>{const newSettings={...read(),...changes};try{localStorage.setItem('vpaSiteSettings',JSON.stringify(newSettings))}catch{}apply()};
window.readSiteSettings=read;window.applySiteSettings=apply;
apply();document.querySelectorAll('[data-nav]').forEach(a=>{if(location.pathname.endsWith(a.dataset.nav)||location.pathname.endsWith('/')&&a.dataset.nav==='index.html')a.classList.add('active')});
})();

/*
 * BẢN VÁ GỘP – CÂN DÒNG TIMELINE + FONT ANH HÙNG / VIDEO
 * 17/11/2026
 * - Cân bằng xuống dòng tiêu đề và tránh từ lẻ cuối dòng.
 * - Thống nhất bộ chữ theo font đã chọn ở Cài đặt.
 * - Không can thiệp dữ liệu, ảnh, video, phân trang hoặc trình phát.
 * - Được tải trên mọi trang qua js/common.js.
 */
(()=>{
  const styleId='vpa-timeline-and-unified-type';
  if(document.getElementById(styleId)) return;

  // Đánh dấu riêng trang Anh hùng và trang Video để chỉ đổi font ở đúng nơi.
  const root=document.documentElement;
  if(document.getElementById('heroGrid')) root.classList.add('vpa-page-heroes');
  if(document.getElementById('videoSections')) root.classList.add('vpa-page-videos');

  const style=document.createElement('style');
  style.id=styleId;
  style.textContent=`
    /* 1. CÂN ĐỐI TIÊU ĐỀ TIMELINE: không thay đổi câu chữ. */
    #periodNav .period-name,
    #periodTitle,
    #timeline .event-card h3,
    #eventDetail .page-title,
    #eventDetail .article-subheading,
    .section-head h2 {
      text-wrap: balance;
      overflow-wrap: normal;
      word-break: normal;
      hyphens: none;
      letter-spacing: -0.018em;
    }
    #periodNav .period-name {
      font-size: clamp(.95rem, .91rem + .22vw, 1.04rem);
      line-height: 1.38;
      letter-spacing: -0.026em;
    }
    #timeline .event-card h3 {
      font-size: clamp(1.04rem, 1rem + .2vw, 1.17rem);
      line-height: 1.43;
      letter-spacing: -0.018em;
    }
    #periodTitle {
      font-size: clamp(1.45rem, 1.15rem + 1.1vw, 2rem);
      line-height: 1.35;
    }
    #eventDetail .page-title {
      font-size: clamp(1.55rem, 1.18rem + 1.55vw, 2.45rem);
      line-height: 1.33;
    }
    #eventDetail .article-subheading {
      font-size: 1.07em;
      line-height: 1.47;
      letter-spacing: 0;
    }

    /* 2. ANH HÙNG: mọi phần đều dùng cùng font với cài đặt toàn site.
       Loại bỏ Roboto Slab ở tiêu đề và font hệ thống mặc định của button. */
    html.vpa-page-heroes .page-title,
    html.vpa-page-heroes .lead,
    html.vpa-page-heroes .section-kicker,
    html.vpa-page-heroes .tabs .tab,
    html.vpa-page-heroes .hero-grid,
    html.vpa-page-heroes .hero-card,
    html.vpa-page-heroes .hero-card h3,
    html.vpa-page-heroes .hero-card p,
    html.vpa-page-heroes .hero-card b,
    html.vpa-page-heroes .hero-card small,
    html.vpa-page-heroes .modal-card,
    html.vpa-page-heroes #heroDetail,
    html.vpa-page-heroes #heroDetail h2,
    html.vpa-page-heroes #heroDetail p {
      font-family: inherit !important;
      font-style: normal;
      font-variant: normal;
      font-kerning: normal;
      letter-spacing: normal;
    }
    html.vpa-page-heroes .page-title {
      font-weight: 800;
      font-size: clamp(1.75rem, 3.5vw, 2.7rem);
      line-height: 1.35;
      text-wrap: balance;
    }
    html.vpa-page-heroes .tabs .tab {
      font-weight: 700;
      font-size: .9rem;
      line-height: 1.45;
    }
    html.vpa-page-heroes .hero-card h3 {
      font-weight: 750;
      font-size: 1.08rem;
      line-height: 1.42;
      text-wrap: balance;
    }
    html.vpa-page-heroes .hero-card p {
      font-size: .87rem;
      font-weight: 400;
      line-height: 1.55;
    }
    html.vpa-page-heroes .hero-card-body small,
    html.vpa-page-heroes .hero-card b {
      font-size: .75rem;
      line-height: 1.45;
      font-weight: 700;
      letter-spacing: 0;
    }
    html.vpa-page-heroes #heroDetail h2 {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 800;
      line-height: 1.4;
      text-wrap: balance;
    }
    html.vpa-page-heroes #heroDetail .article-paragraph {
      font-size: 1rem;
      font-weight: 400;
      line-height: var(--reader-lineheight, 1.5);
      letter-spacing: normal;
    }

    /* 3. VIDEO: tiêu đề giai đoạn, tên thẻ, phụ đề, trình phát.
       Cùng font với mục Anh hùng / cài đặt chung, không lẫn serif và sans. */
    html.vpa-page-videos .page-title,
    html.vpa-page-videos .lead,
    html.vpa-page-videos .section-kicker,
    html.vpa-page-videos .video-period,
    html.vpa-page-videos .video-period-head h2,
    html.vpa-page-videos .video-period-head small,
    html.vpa-page-videos .video-total,
    html.vpa-page-videos .video-card,
    html.vpa-page-videos .video-title,
    html.vpa-page-videos .video-caption,
    html.vpa-page-videos .video-empty-large,
    html.vpa-page-videos .video-dialog,
    html.vpa-page-videos .video-dialog h2 {
      font-family: inherit !important;
      font-style: normal;
      font-variant: normal;
      font-kerning: normal;
      letter-spacing: normal;
    }
    html.vpa-page-videos .page-title {
      font-size: clamp(1.75rem, 3.5vw, 2.7rem);
      font-weight: 800;
      line-height: 1.35;
      text-wrap: balance;
    }
    html.vpa-page-videos .video-period-head h2 {
      font-size: clamp(1.08rem, 1rem + .55vw, 1.28rem);
      font-weight: 750;
      line-height: 1.45;
      text-wrap: balance;
    }
    html.vpa-page-videos .video-period-head small,
    html.vpa-page-videos .video-total {
      font-size: .8rem;
      line-height: 1.5;
    }
    html.vpa-page-videos .video-title {
      font-size: 1.04rem;
      font-weight: 750;
      line-height: 1.45;
      text-wrap: balance;
    }
    html.vpa-page-videos .video-caption {
      font-size: .8rem;
      line-height: 1.5;
    }
    html.vpa-page-videos .video-dialog h2 {
      font-size: clamp(1.1rem, 2vw, 1.5rem);
      font-weight: 750;
      line-height: 1.45;
      text-wrap: balance;
    }

    /* 4. GIỮ BỐ CỤC GỌN, KHÔNG ÉP CHỮ QUÁ HẸP TRÊN ĐIỆN THOẠI. */
    @media(max-width:650px) {
      #periodNav .period-name { font-size: .98rem; }
      #timeline .event-card h3 { font-size: 1.04rem; }
      #eventDetail .page-title { font-size: clamp(1.45rem, 6vw, 1.85rem); }
      html.vpa-page-videos .video-period-head h2 { font-size: 1.03rem; }
      html.vpa-page-heroes .hero-card h3 { font-size: 1.06rem; }
    }
  `;
  document.head.appendChild(style);
})();

/*
 * BẢN VÁ KÍCH THƯỚC ẢNH ĐẠI DIỆN — 17/11/2026
 * Cập nhật bổ sung, vẫn giữ toàn bộ cân dòng tiêu đề và font chữ bản trước.
 * - Anh hùng: mọi ô ảnh cùng tỷ lệ, canh giữa, ảnh không bị cắt mép.
 * - Timeline: mọi ô ảnh đại diện cùng tỷ lệ/kích thước theo từng bố cục.
 * Không sửa dữ liệu, ảnh gốc, ảnh trong bài viết, video hay điều hướng.
 */
(()=>{
  if(document.getElementById('vpa-uniform-profile-and-event-images')) return;
  const style=document.createElement('style');
  style.id='vpa-uniform-profile-and-event-images';
  style.textContent=`
    /* ẢNH ĐẠI DIỆN CỦA CÁC ANH HÙNG: đồng nhất mọi thẻ hồ sơ. */
    .hero-grid .hero-card {
      min-width: 0;
    }
    .hero-grid .hero-card .portrait-placeholder {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: auto !important;
      min-height: 0 !important;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      padding: 0;
      background: var(--bg, #eee9dc);
      border-bottom: 1px solid var(--line, #ddd8cd);
    }
    .hero-grid .hero-card .portrait-placeholder img {
      display: block;
      position: absolute;
      inset: 0;
      width: 100% !important;
      height: 100% !important;
      max-width: none;
      max-height: none;
      object-fit: contain !important;
      object-position: center center !important;
      background: var(--bg, #eee9dc);
    }
    /* Ảnh trong hồ sơ mở rộng giữ nguyên tỷ lệ thật, không lệch qua một bên. */
    .hero-detail-grid .portrait-large {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      min-width: 0;
      padding: 12px;
    }
    .hero-detail-grid .portrait-large img {
      display: block;
      width: 100% !important;
      height: auto !important;
      max-width: 100%;
      max-height: 440px;
      object-fit: contain !important;
      object-position: center center !important;
      margin: auto;
    }
    /* ẢNH NGOÀI CÁC SỰ KIỆN TIMELINE: cố định bề ngang cột ảnh. */
    #timeline .event-card--with-cover {
      display: grid;
      grid-template-columns: 232px minmax(0, 1fr);
      align-items: center;
      gap: 24px;
    }
    #timeline .event-card--with-cover .event-card-thumb {
      position: relative;
      display: block;
      width: 100%;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      aspect-ratio: 4 / 3 !important;
      overflow: hidden;
      flex: none;
      background: var(--bg, #ebe5da);
    }
    #timeline .event-card--with-cover .event-card-thumb img {
      display: block;
      position: absolute;
      inset: 0;
      width: 100% !important;
      height: 100% !important;
      max-width: none;
      max-height: none;
      object-fit: cover !important;
      object-position: center center !important;
    }
    #timeline .event-card--with-cover .event-card-photo-placeholder {
      position: absolute;
      inset: 0;
      margin: 0;
    }
    #timeline .event-card--with-cover .event-card-content {
      min-width: 0;
    }
    @media (max-width: 760px) {
      #timeline .event-card--with-cover {
        grid-template-columns: minmax(0, 1fr);
        gap: 14px;
      }
      #timeline .event-card--with-cover .event-card-thumb {
        aspect-ratio: 16 / 9 !important;
        max-height: 320px !important;
      }
    }
  `;
  document.head.appendChild(style);
})();


/*
 * BẢN VÁ BỔ SUNG — CĂN ĐỒNG ĐỀU THẺ ANH HÙNG.
 * Các nút .hero-card vốn có thể tự căn giữa nội dung theo chiều dọc khi
 * chiều cao thẻ được kéo giãn bằng CSS Grid. Điều này tạo khoảng trống ở
 * phía trên ảnh ở những hồ sơ có ít dòng chữ.
 * Giải pháp: dùng Flex theo chiều dọc, luôn căn nội dung từ mép trên.
 * Không thay ảnh nguồn, không cắt khuôn mặt, không đổi các trường dữ liệu.
 */
(()=>{
  if (document.getElementById('vpa-align-hero-card-top-v3')) return;
  const style=document.createElement('style');
  style.id='vpa-align-hero-card-top-v3';
  style.textContent=`
    /* Các thẻ trong mỗi hàng được kéo cùng chiều cao, nhưng nội dung
       luôn bắt đầu từ đầu thẻ, không tự canh giữa theo chiều dọc. */
    #heroGrid.hero-grid { align-items: stretch; }
    #heroGrid.hero-grid .hero-card {
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      align-items: stretch !important;
      align-content: normal !important;
      min-width: 0;
      height: 100%;
      padding: 0 !important;
      margin: 0 !important;
      text-align: left;
      vertical-align: top;
    }
    #heroGrid.hero-grid .hero-card > .portrait-placeholder {
      flex: 0 0 auto;
      align-self: stretch;
      margin: 0 !important;
      padding: 0 !important;
      aspect-ratio: 4 / 3 !important;
      width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      overflow: hidden;
      position: relative;
    }
    #heroGrid.hero-grid .hero-card > .portrait-placeholder > img {
      position: absolute;
      inset: 0;
      display: block;
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center center !important;
    }
    #heroGrid.hero-grid .hero-card > .hero-card-body {
      flex: 1 1 auto;
      width: 100%;
      min-width: 0;
      margin: 0 !important;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
    #heroGrid.hero-grid .hero-card > .hero-card-body > b {
      margin-top: auto;
      padding-top: .7rem;
    }
  `;
  document.head.appendChild(style);
})();
