(()=>{
'use strict';
const data=Array.isArray(window.VPA_TRADITIONS)?window.VPA_TRADITIONS:[];
const grid=document.getElementById('traditionGrid');
const article=document.getElementById('traditionDetail');
const params=new URLSearchParams(window.location.search);
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const num=n=>String(n).padStart(2,'0');
const key='vpaTraditionsReturn';
// Ưu tiên file ảnh bìa riêng để giữ nguyên nội dung & ảnh từng trang trong traditions.js.
const coverSettings=(window.VPA_TRADITION_COVERS && typeof window.VPA_TRADITION_COVERS==='object')?window.VPA_TRADITION_COVERS:{};
function coverPath(t){
 const id=String(t.id);
 const value=Object.prototype.hasOwnProperty.call(coverSettings,id)?coverSettings[id]:t.cover;
 return typeof value==='string'?value.trim():'';
}
function imageErrorFallback(container){
 // Nếu đường dẫn JPG/PNG người dùng nhập chưa đúng, hiển thị khung trống thay vì biểu tượng lỗi.
 if(!container)return;
 container.classList.add('is-empty');
 const img=container.querySelector('img');
 if(img)img.remove();
}

function restorePosition(){
 if(params.get('restore')!=='1') return;
 try{const saved=JSON.parse(sessionStorage.getItem(key)||'null');if(!saved)return;
   requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo({top:Math.max(0,Number(saved.y)||0),behavior:'instant'})));
 }catch{}
}
if(grid){
 grid.innerHTML=data.map(t=>{
   const cover=coverPath(t);
   return `<a id="tradition-${t.id}" class="tt-card" href="truyen-thong-chi-tiet.html?id=${t.id}">
    <div class="tt-card-cover ${cover?'has-image':'is-empty'}">
      <div class="tt-cover-placeholder" aria-hidden="true"><span class="tt-cover-placeholder-icon">▧</span><small>KHUNG ẢNH BÌA</small></div>
      ${cover?`<img src="${escapeHtml(cover)}" loading="lazy" alt="Ảnh bìa truyền thống số ${t.id}">`:''}
      <span class="tt-card-number">${num(t.id)}</span>
    </div>
    <div class="tt-card-body"><span class="tt-card-label">Truyền thống thứ ${t.id}</span><h2>${escapeHtml(t.title)}</h2><span class="tt-open">Đọc nội dung đầy đủ →</span></div>
 </a>`;
 }).join('');
 // Phòng trường hợp ảnh đã khai báo nhưng không tồn tại trên GitHub.
 grid.querySelectorAll('.tt-card-cover img').forEach(img=>{
   img.addEventListener('error',()=>imageErrorFallback(img.closest('.tt-card-cover')),{once:true});
 });
 grid.addEventListener('click',e=>{const anchor=e.target.closest('.tt-card');if(!anchor)return;
   try{sessionStorage.setItem(key,JSON.stringify({y:window.scrollY,id:anchor.id}))}catch{}
 });
 restorePosition();
 window.addEventListener('load',restorePosition,{once:true});
}
if(article){
 const chosen=Number(params.get('id'));
 const t=data.find(x=>x.id===chosen);
 if(!t){article.innerHTML='<section class="tt-detail-hero"><h1>Không tìm thấy truyền thống</h1><p>Hãy trở lại danh sách để chọn một truyền thống khác.</p></section>';return;}
 document.title=t.title+' | Lịch sử QĐND Việt Nam';
 const back=document.getElementById('traditionBack');
 if(back){back.href='truyen-thong.html?restore=1#tradition-'+t.id}
 let page=0;
 function render(){
   const total=t.pages.length, paragraphs=t.pages[page]||[];
   const custom=Array.isArray(t.detailImages)?t.detailImages[page]:'';
   const src=custom || (page===0?coverPath(t):'');
   const defaultCover=!custom && page===0 && !!src;
   article.innerHTML=`<section class="tt-detail-hero"><p class="tt-eyebrow">TRUYỀN THỐNG THỨ ${num(t.id)}</p><h1>${escapeHtml(t.title)}</h1><p>Nội dung theo tài liệu “9 TRUYỀN THỐNG” · Trang ${page+1}/${total}</p></section>
     <div class="tt-detail-body"><article class="tt-article">${paragraphs.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}
     <nav class="tt-read-pager" aria-label="Chuyển trang nội dung"><button type="button" id="ttPrev" ${page===0?'disabled':''}>← Trang trước</button><span>${page+1} / ${total}</span><button type="button" id="ttNext" ${page===total-1?'disabled':''}>Trang tiếp →</button></nav>
     </article><aside class="tt-illustration"><figure>${src?`<img src="${escapeHtml(src)}" alt="${defaultCover?'Hình minh họa':'Ảnh tư liệu'} cho truyền thống ${t.id}">`:`<div class="tt-image-empty"><b>▧ ẢNH TƯ LIỆU</b><small>Chừa chỗ để bổ sung ảnh riêng cho trang ${page+1}</small></div>`}<figcaption>${defaultCover?'Hình minh họa chủ đề (không phải ảnh tư liệu gốc)':custom?'Ảnh tư liệu do người quản lý website bổ sung':'Có thể bổ sung ảnh trong data/traditions.js'}</figcaption></figure>
     <div class="tt-img-guide">Mỗi trang có thể có ảnh riêng: mở <b>data/traditions.js</b> và điền đường dẫn vào <b>detailImages</b> theo thứ tự trang.</div></aside></div>`;
   const prev=document.getElementById('ttPrev'),next=document.getElementById('ttNext');
   article.querySelectorAll('.tt-illustration figure img').forEach(img=>img.addEventListener('error',()=>{
      const fig=img.closest('figure');
      if(fig){img.outerHTML='<div class="tt-image-empty"><b>▧ ẢNH TƯ LIỆU</b><small>Không tìm thấy tệp ảnh. Hãy kiểm tra đường dẫn trong data/traditions.js hoặc data/traditions-covers.js.</small></div>'; const caption=fig.querySelector('figcaption');if(caption)caption.textContent='Khung ảnh đang để trống';}
   },{once:true}));
   if(prev)prev.onclick=()=>{if(page>0){page--;render();window.scrollTo({top:0,behavior:'instant'});}};
   if(next)next.onclick=()=>{if(page<total-1){page++;render();window.scrollTo({top:0,behavior:'instant'});}};
 }
 render();
}
})();
