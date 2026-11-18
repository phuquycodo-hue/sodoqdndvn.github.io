/*
 * BẢN VÁ: ẢNH ĐẠI DIỆN CÁC SỰ KIỆN TIMELINE.
 * Giữ tính năng gộp ba mốc Chiến dịch Biên giới vào mốc 6 từ bản vá trước.
 * Không thay đổi dữ liệu trong data/periods.js và không thay đổi trang chi tiết.
 */
(function mergeBienGioiCampaign(){
  const period = window.PERIODS?.[1];
  if (!period?.events || period.events.length < 9) return;
  const ev = period.events;
  if (!(ev[5]?.title || '').includes('Chiến dịch Biên giới')) return;
  if (!(ev[6]?.title || '').includes('Đông Khê')) return;
  if (!(ev[7]?.title || '').includes('Lepage')) return;
  if (!(ev[8]?.title || '').includes('Thất Khê')) return;

  const main = ev[5];
  const related = ev.slice(6, 9);
  if (!Array.isArray(main.paragraphs)) main.paragraphs = [];
  if (!Array.isArray(main.images)) main.images = main.image ? [main.image] : [];
  main.sectionHeadings = [...(main.sectionHeadings || [])];
  for (const section of related) {
    main.paragraphs.push(section.title, ...(section.paragraphs || []));
    main.sectionHeadings.push(section.title);
    const sectionImages = Array.isArray(section.images) && section.images.length
      ? section.images : (section.image ? [section.image] : []);
    main.images.push(...sectionImages);
    if (section.footnotes) main.footnotes = {...(main.footnotes || {}), ...section.footnotes};
  }
  ev.splice(6, 3);
})();

// Tải phần kiểu ảnh đại diện mà không cần thay style.css hay index.html.
(function loadTimelineCoverStyles(){
  if (document.getElementById('timeline-cover-styles')) return;
  const link=document.createElement('link');
  link.id='timeline-cover-styles';
  link.rel='stylesheet';
  link.href='css/timeline-card-images.css';
  document.head.appendChild(link);
})();

const nav=document.getElementById('periodNav');
const list=document.getElementById('timeline');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let active=0;

function shortTitle(p){
  return p.title.replace(/\s*\([^()]*\)\s*$/,'').replace(/^Thời kỳ\s*/i,'');
}

function isTimelineHeading(text){
  if (typeof text !== 'string') return false;
  const s=text.trim();
  return s.length>0 && s.length<=110 && !/[.!?…]$/.test(s) && !/\[\d+\]/.test(s);
}

// Có thể dùng "cover" (ảnh riêng của ô ngoài) hoặc "image" (ảnh đã khai báo cũ).
// Nếu hai trường đó đều trống, tự lấy ảnh đầu tiên trong "images" của trang chi tiết.
function getTimelineCover(event){
  const options=[event.cover,event.thumbnail,event.image];
  if(Array.isArray(event.images)) options.push(...event.images);
  const valid=options.find(s=>typeof s==='string' && s.trim().length>0);
  return valid ? valid.trim() : '';
}

function renderEventCard(event,index,periodIndex){
  const cover=getTimelineCover(event);
  const first=event.paragraphs?.[0] || 'Nội dung đang được cập nhật.';
  const summary=isTimelineHeading(first)
    ? `<strong>${esc(first)}</strong>`
    : `${esc(first.slice(0,320))}${first.length>320?'…':''}`;
  const thumb=`<div class="event-card-thumb ${cover?'has-photo':'no-photo'}">
      <div class="event-card-photo-placeholder" aria-hidden="true">
        <span class="event-card-photo-icon">▧</span>
        <span>ẢNH TƯ LIỆU</span>
        <small>Thêm ảnh sự kiện tại data/periods.js</small>
      </div>
      ${cover?`<img src="${esc(cover)}" alt="Ảnh tư liệu: ${esc(event.title)}" loading="lazy" decoding="async">`:''}
    </div>`;
  return `<article id="timeline-event-${periodIndex}-${index}" data-event-index="${index}" class="event-card event-card--with-cover">
    ${thumb}
    <div class="event-card-content">
      <div class="event-date">DẤU MỐC ${String(index+1).padStart(2,'0')}</div>
      <h3>${esc(event.title)}</h3>
      <p>${summary}</p>
      <a class="text-link" href="detail.html?p=${periodIndex}&e=${index}">Đọc nội dung sự kiện <span aria-hidden="true">→</span></a>
    </div>
  </article>`;
}

function renderPeriod(i){
  active=i;
  const p=PERIODS[i];
  nav.querySelectorAll('button').forEach((button,n)=>{
    button.classList.toggle('active',n===i);
    button.setAttribute('aria-pressed',String(n===i));
  });
  document.getElementById('periodTitle').textContent=shortTitle(p);
  document.getElementById('periodRange').textContent=p.range;
  document.getElementById('eventCount').textContent=p.events.length+' sự kiện';
  list.innerHTML=p.events.map((e,n)=>renderEventCard(e,n,i)).join('') ||
    '<p>Chưa có sự kiện trong giai đoạn này.</p>';

  // Nếu đường dẫn ảnh sai, giữ ô placeholder thay vì hiện biểu tượng ảnh vỡ.
  list.querySelectorAll('.event-card-thumb img').forEach(img=>{
    img.addEventListener('error',()=>{
      img.hidden=true;
      img.closest('.event-card-thumb')?.classList.add('missing-photo');
    },{once:true});
  });
}

nav.innerHTML=PERIODS.map((p,i)=>`<button type="button" class="period-button ${i===0?'active':''}"
    aria-pressed="${i===0}" data-i="${i}">
    <span class="period-number">${String(i+1).padStart(2,'0')}</span>
    <span class="period-name">${esc(shortTitle(p))}</span>
    <small class="period-years">${esc(p.range)}</small>
    <span class="period-count">${p.events.length} sự kiện <span aria-hidden="true">↗</span></span>
  </button>`).join('');

nav.querySelectorAll('button').forEach(button=>
  button.addEventListener('click',()=>renderPeriod(Number(button.dataset.i))));
// Lưu vị trí người đọc trước khi mở trang chi tiết.
// Truyền thêm vị trí qua URL để vẫn hoạt động khi trình duyệt chặn sessionStorage.
const RETURN_KEY = 'vpa-timeline-return-position-v2';
list.addEventListener('click', event => {
  const link = event.target.closest('a.text-link[href^="detail.html?"]');
  if (!link) return;
  const card = link.closest('.event-card[data-event-index]');
  if (!card) return;
  const selectedEvent = Number(card.dataset.eventIndex);
  const atY = window.scrollY;
  const topInViewport = card.getBoundingClientRect().top;
  const state = { period: active, event: selectedEvent, scrollY: atY,
                  eventViewportTop: topInViewport, savedAt: Date.now() };
  try { sessionStorage.setItem(RETURN_KEY, JSON.stringify(state)); } catch (_) {}
  const dest = new URL(link.href, location.href);
  dest.searchParams.set('sy', String(Math.round(atY)));
  dest.searchParams.set('vo', String(Math.round(topInViewport)));
  link.href = dest.href;
});

const returnParams = new URLSearchParams(location.search);
const requested = Number(returnParams.get('p'));
renderPeriod(Number.isInteger(requested) && requested >= 0 && requested < PERIODS.length ? requested : 0);

// Khi từ trang chi tiết quay lại: khôi phục cả giai đoạn và vị trí cuộn
// (đúng ô sự kiện và khoảng cách của nó so với đầu màn hình lúc đã bấm).
(function restoreExactTimelinePosition(){
  if (returnParams.get('restore') !== '1') return;
  const eventIndex = Number(returnParams.get('e'));
  if (!Number.isInteger(eventIndex) || eventIndex < 0 || eventIndex >= PERIODS[active].events.length) return;
  const target = document.getElementById(`timeline-event-${active}-${eventIndex}`);
  if (!target) return;
  let stored = null;
  try { stored = JSON.parse(sessionStorage.getItem(RETURN_KEY) || 'null'); } catch (_) {}
  const matches = stored && stored.period === active && stored.event === eventIndex &&
    (Date.now() - stored.savedAt < 6 * 60 * 60 * 1000);
  const validNumber = n => Number.isFinite(n) && Math.abs(n) < 10000000;
  const savedTop = matches && validNumber(stored.eventViewportTop)
    ? stored.eventViewportTop : Number(returnParams.get('vo'));
  const savedY = matches && validNumber(stored.scrollY)
    ? stored.scrollY : Number(returnParams.get('sy'));
  const haveOffset = validNumber(savedTop) && (matches || returnParams.has('vo'));
  const haveY = validNumber(savedY) && (matches || returnParams.has('sy'));

  function restore() {
    const cssScroll = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    if (haveOffset) {
      // Dùng vị trí của đúng ô sự kiện để chống lệch do ảnh và font tải chậm.
      window.scrollTo(0, Math.max(0, window.scrollY + target.getBoundingClientRect().top - savedTop));
    } else if (haveY) {
      window.scrollTo(0, Math.max(0, savedY));
    } else {
      // Nếu mở detail.html trực tiếp, vẫn quay về đúng sự kiện đó.
      window.scrollTo(0, Math.max(0, window.scrollY + target.getBoundingClientRect().top - 112));
    }
    document.documentElement.style.scrollBehavior = cssScroll;
  }
  restore();
  requestAnimationFrame(() => requestAnimationFrame(restore));
  // Chỉnh lại sau khi font có thể làm thay đổi chiều cao các thẻ sự kiện.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => requestAnimationFrame(restore)).catch(() => {});
  }
})();
