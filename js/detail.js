/*
 * BẢN VÁ TIMELINE: gộp các mốc 7, 8, 9 vào mốc 6 trong thời kỳ chống Pháp.
 * Chạy sau data/periods.js; không sửa file dữ liệu hoặc ảnh mà người dùng đã thêm.
 * Phải có đoạn này trong cả js/timeline.js và js/detail.js để danh sách và chi tiết đồng bộ.
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
    // Tiêu đề mốc cũ chuyển thành tiêu đề phụ (in đậm) trong bài viết mốc 6.
    main.paragraphs.push(section.title, ...(section.paragraphs || []));
    main.sectionHeadings.push(section.title);
    const sectionImages = Array.isArray(section.images) && section.images.length
      ? section.images : (section.image ? [section.image] : []);
    main.images.push(...sectionImages);
    if (section.footnotes) main.footnotes = {...(main.footnotes || {}), ...section.footnotes};
  }
  ev.splice(6, 3);
})();

// Nhận diện các tiêu đề phụ sẵn có trong Word và 3 đề mục vừa được gộp.
function isArticleHeading(text){
  if (typeof text !== 'string') return false;
  const s=text.trim();
  if (e?.sectionHeadings?.includes(text)) return true;
  return s.length > 0 && s.length <= 125 && !/[.!?…]$/.test(s)
    && !/\[\d+\]/.test(s);
}
const subheadingStyle=document.createElement('style');
subheadingStyle.textContent='.article-subheading{font-weight:900;font-size:1.11em;line-height:1.5;letter-spacing:.01em;margin:22px 0 12px;color:var(--text,var(--ink,#1f2c22));}';
document.head.appendChild(subheadingStyle);

// Chỉ tác động đến trang chi tiết sự kiện Timeline, không đổi trang khác.
// Nhúng CSS ở đây để người dùng CHỈ CẦN THAY 1 TỆP js/detail.js.
document.body.classList.add('timeline-detail-large-images');
const enlargedImageStyle=document.createElement('style');
enlargedImageStyle.textContent=`
body.timeline-detail-large-images .content {
  max-width: min(1520px, 96vw);
}
body.timeline-detail-large-images .article-layout {
  grid-template-columns: minmax(0, 1.08fr) minmax(420px, 1fr);
  gap: clamp(20px, 2.3vw, 36px);
  align-items: start;
}
body.timeline-detail-large-images .reading-image {
  width: 100%;
  position: sticky;
  top: 106px;
}
body.timeline-detail-large-images .detail-image {
  display: block;
  width: 100%;
  height: auto;
  max-height: 860px;
  object-fit: contain;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius-card);
  box-shadow: var(--paper-shadow);
}
body.timeline-detail-large-images .article-image-placeholder {
  width: 100%;
  min-height: clamp(320px, 42vw, 550px);
}
@media (max-width: 1000px) {
  body.timeline-detail-large-images .article-layout {
    grid-template-columns: 1fr;
  }
  body.timeline-detail-large-images .reading-image { position: static; }
  body.timeline-detail-large-images .detail-image { max-height: 78vh; }
  body.timeline-detail-large-images .article-image-placeholder { min-height: 300px; }
}
@media (max-width: 650px) {
  body.timeline-detail-large-images .content { max-width: 100%; }
  body.timeline-detail-large-images .article-image-placeholder { min-height: 240px; }
}
`;
document.head.appendChild(enlargedImageStyle);

const params=new URLSearchParams(location.search);
const periodIndex=Number(params.get('p')),eventIndex=Number(params.get('e'));
const p=PERIODS[periodIndex],e=p?.events[eventIndex],root=document.getElementById('eventDetail');

// Quay lại chính xác vị trí cuộn và ô sự kiện ngoài Timeline trước khi mở bài.
// Các giá trị sy/vo được chuyển qua URL từ js/timeline.js, đồng thời có
// bản dự phòng trong sessionStorage nếu trình duyệt cho phép.
(function setBackLinkToOriginalPosition(){
  const backLink = document.querySelector('a.backlink');
  if (!backLink) return;
  const isValid = Number.isInteger(periodIndex) && periodIndex >= 0 &&
                  periodIndex < PERIODS.length &&
                  Number.isInteger(eventIndex) && eventIndex >= 0 &&
                  eventIndex < (PERIODS[periodIndex]?.events?.length || 0);
  if (!isValid) return;
  const to = new URL('index.html', location.href);
  to.searchParams.set('p', String(periodIndex));
  to.searchParams.set('e', String(eventIndex));
  to.searchParams.set('restore', '1');
  for (const key of ['sy','vo']) {
    const value = params.get(key);
    if (value !== null && Number.isFinite(Number(value))) to.searchParams.set(key, value);
  }
  backLink.href = to.href;
  backLink.textContent = '← Quay về đúng vị trí sự kiện';
})();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/*
 * CHIA TRANG TẠI RANH GIỚI ĐOẠN VĂN / ĐỀ MỤC
 * - Không bao giờ cắt một đoạn văn hoặc một câu để sang trang.
 * - Giữ đề mục in đậm cùng đoạn văn giải thích ngay sau đề mục.
 * - Hạn chế trang cuối chỉ có 1–2 dòng bằng cách cân đối với trang trước.
 * - Giữ nguyên thứ tự và nội dung từng đoạn từ data/periods.js.
 */
function paginate(paras){
  const original = Array.isArray(paras) ? paras.filter(s=>typeof s==='string' && s.trim()) : [];
  if (!original.length) return [[]];

  // Mỗi khối là một đoạn văn hoàn chỉnh hoặc đề mục kèm đoạn văn đầu tiên.
  const blocks=[];
  let pendingHeadings=[];
  for (const paragraph of original){
    if (isArticleHeading(paragraph)){
      pendingHeadings.push(paragraph);
      continue;
    }
    blocks.push([...pendingHeadings,paragraph]);
    pendingHeadings=[];
  }
  if (pendingHeadings.length){
    if (blocks.length) blocks[blocks.length-1].push(...pendingHeadings);
    else blocks.push(pendingHeadings);
  }
  const countChars=blocks=>blocks.flat().reduce((n,s)=>n+s.length,0);
  const countParas=blocks=>blocks.reduce((n,b)=>n+b.length,0);
  const pages=[];
  let pageBlocks=[];
  for(const block of blocks){
    const next=[...pageBlocks,block];
    if(pageBlocks.length && (countChars(next)>2200 || countParas(next)>5)){
      pages.push(pageBlocks);
      pageBlocks=[block];
    } else pageBlocks=next;
  }
  if(pageBlocks.length) pages.push(pageBlocks);

  // Tránh trang cuối quá ngắn nhưng không chia đôi một đoạn văn.
  if(pages.length>1){
    const tail=pages[pages.length-1];
    const prev=pages[pages.length-2];
    if(countChars(tail)<550){
      if(countChars(prev)+countChars(tail)<=3400 && countParas(prev)+countParas(tail)<=8){
        prev.push(...tail);
        pages.pop();
      }else if(prev.length>1){
        const moved=prev[prev.length-1];
        const afterMove=countChars(prev)-countChars([moved]);
        if(afterMove>=800 && countChars(tail)+countChars([moved])<=2300){
          prev.pop();
          tail.unshift(moved);
        }
      }
    }
  }
  return pages.map(blockPage=>blockPage.flat());
}
function renderFootnotes(text){
 // The referenced numbers restart in each source period. Only supported reference markers become notes.
 const notes={...(p.footnotes||{}),...(e.footnotes||{})};
 return esc(text).replace(/\[(\d{1,2})\]|\((\d{1,2})\)/g,(whole,square,round)=>{
   const id=square||round,note=notes[id];if(!note)return whole;
   const marker=square?`[${id}]`:`(${id})`;
   return `<sup class="note-host"><button class="source-ref" type="button" aria-label="Xem chú thích ${id}" aria-expanded="false">${marker}</button><span class="note-tooltip" role="tooltip"><strong>CHÚ THÍCH ${marker}</strong><span>${esc(note)}</span></span></sup>`
 });
}
if(!e){root.innerHTML='<h1>Không tìm thấy sự kiện</h1><a href="index.html">Về dòng thời gian</a>'}
else{
 document.title=e.title+' | Lịch sử Quân đội nhân dân Việt Nam';
 let page=0;const chunks=paginate(e.paragraphs);
 root.innerHTML=`<div class="section-kicker">GIAI ĐOẠN ${periodIndex+1} · ${esc(p.range)}</div><h1 class="page-title">${esc(e.title)}</h1><p class="detail-instruction">Rê chuột hoặc chạm vào số chú thích được <strong>in đậm</strong> để xem nguồn. Mỗi trang có một vị trí ảnh độc lập.</p><div class="article-layout"><section class="reading-card"><div id="articleText"></div><nav class="pager" aria-label="Phân trang bài viết"><button type="button" id="prevPage" class="secondary">← Trang trước</button><span id="pageLabel" aria-live="polite"></span><button type="button" id="nextPage" class="primary">Trang tiếp →</button></nav></section><aside class="reading-image"><div id="articleImage"></div></aside></div>`;
 const imageArea=document.getElementById('articleImage');
 function draw(){
   document.getElementById('articleText').innerHTML=chunks[page].map(text=>isArticleHeading(text) ? `<h3 class="article-subheading">${renderFootnotes(text)}</h3>` : `<p class="article-paragraph">${renderFootnotes(text)}</p>`).join('');
   const path=e.images?.[page]||(page===0?e.image:'')||'';
   if(path){const image=document.createElement('img');image.className='detail-image';image.src=path;image.alt=`Ảnh tư liệu ${e.title} - trang ${page+1}`;image.onerror=()=>{imageArea.replaceChildren(makePlaceholder())};imageArea.replaceChildren(image)}
   else imageArea.replaceChildren(makePlaceholder());
   document.getElementById('pageLabel').textContent=`Trang ${page+1} / ${chunks.length}`;
   document.getElementById('prevPage').disabled=page===0;
   document.getElementById('nextPage').disabled=page===chunks.length-1;
   document.querySelectorAll('.source-ref').forEach(button=>button.addEventListener('click',()=>{const host=button.closest('.note-host'),open=host.classList.contains('note-open');document.querySelectorAll('.note-host').forEach(h=>{h.classList.remove('note-open');h.querySelector('button')?.setAttribute('aria-expanded','false')});host.classList.toggle('note-open',!open);button.setAttribute('aria-expanded',String(!open))}));
 }
 function makePlaceholder(){const el=document.createElement('div');el.className='image-placeholder article-image-placeholder';el.innerHTML=`<span class="image-placeholder-icon" aria-hidden="true">▧</span><b>ẢNH TƯ LIỆU TRANG ${page+1}</b><p>Có thể chèn một hình ảnh riêng vào trang này.</p><small>Thêm đường dẫn ảnh tại <code>images[${page}]</code> trong <code>data/periods.js</code></small>`;return el}
 document.getElementById('prevPage').onclick=()=>{if(page>0){page--;draw();document.getElementById('eventDetail').scrollIntoView({block:'start'})}};
 document.getElementById('nextPage').onclick=()=>{if(page<chunks.length-1){page++;draw();document.getElementById('eventDetail').scrollIntoView({block:'start'})}};
 document.addEventListener('click',evt=>{if(!evt.target.closest('.note-host'))document.querySelectorAll('.note-host.note-open').forEach(h=>{h.classList.remove('note-open');h.querySelector('button')?.setAttribute('aria-expanded','false')})});
 draw();
}
