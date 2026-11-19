(()=>{
'use strict';
const list=Array.isArray(window.VPA_WHEEL_QUESTIONS)?window.VPA_WHEEL_QUESTIONS:[];
const N=50,step=360/N;
const disc=document.getElementById('wheelDisc'),svg=document.getElementById('wheelSvg'),btn=document.getElementById('wheelSpin');
if(!disc||!svg||!btn)return;
const storeKey='vpaWheel50AnsweredV1';
const status=document.getElementById('wheelStatus'),remainingEl=document.getElementById('wheelRemaining');
const answeredEl=document.getElementById('wheelAnswered'),correctEl=document.getElementById('wheelCorrect'),wrongEl=document.getElementById('wheelWrong');
const modal=document.getElementById('wheelQuestionDialog'),questionNo=document.getElementById('wheelQuestionNumber');
const questionText=document.getElementById('wheelQuestionText'),choices=document.getElementById('wheelChoices');
const feedback=document.getElementById('wheelFeedback'),doneBtn=document.getElementById('wheelDialogDone');
const explanationBox=document.getElementById('wheelExplanation'),explanationText=document.getElementById('wheelExplanationText'),explanationSource=document.getElementById('wheelExplanationSource');
if(list.length!==N || list.some(q=>!q || !q.question || !Array.isArray(q.choices) || q.choices.length!==4 || !Number.isInteger(q.answer) || q.answer<0 || q.answer>3)){
 status.textContent='Không tải được đủ 50 câu hỏi. Hãy kiểm tra tệp data/wheel-questions.js.';btn.disabled=true;return;
}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=deg=>(deg%360+360)%360;
let rotation=0,locked=false,pending=-1,answered={};
try{const saved=JSON.parse(localStorage.getItem(storeKey)||'{}');if(saved && typeof saved==='object' && !Array.isArray(saved))for(const [k,v] of Object.entries(saved)){const i=Number(k);if(Number.isInteger(i)&&i>=0&&i<N&&Number.isInteger(v)&&v>=0&&v<4)answered[i]=v;}}catch{}
const save=()=>{try{localStorage.setItem(storeKey,JSON.stringify(answered));}catch{}};
const rest=()=>Array.from({length:N},(_,i)=>i).filter(i=>!(i in answered));
function counts(){const n=Object.keys(answered).length,c=Object.entries(answered).filter(([i,v])=>list[Number(i)].answer===v).length;remainingEl.textContent=N-n;answeredEl.textContent=n;correctEl.textContent=c;wrongEl.textContent=n-c;btn.disabled=locked || n===N;if(n===N)status.textContent='Bạn đã trả lời đủ 50 câu! Nhấn Làm mới 50 câu để bắt đầu lượt mới.';}
function sector(i){const center=(-90+i*step)*Math.PI/180,half=step*Math.PI/360,r=299,c=320,a=center-half,b=center+half;
 const x1=c+r*Math.cos(a),y1=c+r*Math.sin(a),x2=c+r*Math.cos(b),y2=c+r*Math.sin(b);
 const color=(i in answered)?'#878a78':i%2?'#b58a3e':'#284d3c';
 const x=c+252*Math.cos(center),y=c+252*Math.sin(center);
 return `<path d="M320 320 L${x1.toFixed(2)} ${y1.toFixed(2)} A299 299 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="${color}" stroke="#f0dfac" stroke-width=".95"/><text x="${x.toFixed(2)}" y="${y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="15" font-weight="800" font-family="Arial,sans-serif">${String(i+1).padStart(2,'0')}</text>`;}
function drawWheel(){svg.innerHTML=`<circle cx="320" cy="320" r="315" fill="#b99146" stroke="#765322" stroke-width="7"/>`+Array.from({length:N},(_,i)=>sector(i)).join('')+`<circle cx="320" cy="320" r="74" fill="#f6e0a1" stroke="#704a1c" stroke-width="5"/><circle cx="320" cy="320" r="65" fill="#9c2527" stroke="#f8dfa3" stroke-width="4"/><text x="320" y="318" font-size="19" text-anchor="middle" fill="#fff2c4" font-family="Arial,sans-serif" font-weight="bold">50 CÂU</text><text x="320" y="348" font-size="30" text-anchor="middle" fill="#fbe7a8" font-family="Arial,sans-serif">★</text>`;}
function showQuestion(i){const q=list[i];pending=i;questionNo.textContent=`MŨI TÊN TRÚNG CÂU SỐ ${String(i+1).padStart(2,'0')}`;questionText.textContent=q.question;feedback.hidden=true;feedback.textContent='';feedback.className='wheel-feedback';doneBtn.hidden=true;
 if(explanationBox){explanationBox.hidden=true;explanationText.textContent='';explanationSource.textContent='';}
 choices.innerHTML=q.choices.map((c,j)=>`<button type="button" class="wheel-choice" data-value="${j}"><span class="wheel-letter">${'ABCD'[j]}</span><span>${esc(c)}</span></button>`).join('');
 if(typeof modal.showModal==='function'){modal.showModal();}else{modal.setAttribute('open','');}
}
function finish(i){locked=false;btn.disabled=false;status.textContent=`Mũi tên đã dừng ở câu số ${i+1}. Hãy chọn một đáp án.`;counts();showQuestion(i);}
function spin(){if(locked||!rest().length || modal.open)return;locked=true;const available=rest(),i=available[Math.floor(Math.random()*available.length)];btn.disabled=true;status.textContent='Vòng quay đang quay…';
 // The first sector is centered at 12 o'clock; target i center must align with fixed pointer at 12 o'clock.
 const target=normalize(-i*step),offset=normalize(target-normalize(rotation));rotation+=360+offset;
 const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?450:5200;
 disc.style.transition=`transform ${duration}ms cubic-bezier(.12,.72,.19,1)`;
 let completed=false,timer;const end=e=>{if(e && e.target!==disc)return;if(e && e.propertyName!=='transform')return;if(completed)return;completed=true;disc.removeEventListener('transitionend',end);clearTimeout(timer);finish(i);};
 disc.addEventListener('transitionend',end);
 timer=setTimeout(()=>end(),duration+250);
 requestAnimationFrame(()=>{disc.style.transform=`rotate(${rotation}deg)`;});
}
choices.addEventListener('click',e=>{const b=e.target.closest('button[data-value]');if(!b||pending<0 || (pending in answered))return;
 const answer=Number(b.dataset.value),i=pending,q=list[i],ok=answer===q.answer;
 answered[i]=answer;save();
 for(const item of choices.querySelectorAll('button')){item.disabled=true;const selected=Number(item.dataset.value);item.classList.toggle('is-right',selected===q.answer);item.classList.toggle('is-wrong',selected===answer&&!ok);}
 feedback.hidden=false;feedback.className='wheel-feedback '+(ok?'is-right':'is-wrong');feedback.textContent=`${ok?'✓ Chính xác!':'✗ Chưa chính xác.'} Đáp án đúng: ${'ABCD'[q.answer]}. ${q.choices[q.answer]}.`;
 if(explanationBox){explanationText.textContent=q.explanation||'Vui lòng đối chiếu tài liệu Word để xem thêm bối cảnh của đáp án.';explanationSource.textContent=q.source||'Tài liệu lịch sử QĐND Việt Nam';explanationBox.hidden=false;}
 doneBtn.hidden=false;drawWheel();counts();
});
const closeDialog=()=>{if(typeof modal.close==='function')modal.close();else modal.removeAttribute('open');pending=-1;};
document.getElementById('wheelDialogClose').addEventListener('click',closeDialog);
doneBtn.addEventListener('click',closeDialog);
modal.addEventListener('close',()=>{pending=-1;});
btn.addEventListener('click',spin);
document.getElementById('wheelReset').addEventListener('click',()=>{if(locked)return;if(!confirm('Xóa kết quả và mở lại toàn bộ 50 câu hỏi?'))return;answered={};save();drawWheel();counts();status.textContent='Đã làm mới. Nhấn QUAY để bắt đầu.';});
drawWheel();counts();
})();
