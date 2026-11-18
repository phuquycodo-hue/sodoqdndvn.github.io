const questions=window.QUIZ_QUESTIONS||[],root=document.getElementById('quiz'),progress=document.getElementById('quizProgress');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const abc='ABCD';
root.innerHTML=questions.map((q,i)=>`<fieldset class="question" id="question${i}"><legend><span class="quiz-no">${String(i+1).padStart(2,'0')}</span> ${esc(q.question)}</legend><div class="answers-grid">${q.choices.map((a,j)=>`<label class="answer"><input type="radio" name="q${i}" value="${j}"><span class="choice-letter">${abc[j]}.</span><span>${esc(a)}</span></label>`).join('')}</div><p class="answer-explain" hidden></p></fieldset>`).join('');
const btn=document.getElementById('submitQuiz'),retry=document.getElementById('retryQuiz');let locked=false;
function selected(i){const node=root.querySelector(`input[name="q${i}"]:checked`);return node?Number(node.value):null}
function updateProgress(){const filled=questions.filter((_,i)=>selected(i)!==null).length;progress.textContent=`Đã chọn ${filled} / ${questions.length} câu hỏi`;}
root.addEventListener('change',updateProgress);
btn.onclick=()=>{
 if(locked)return;const missing=questions.findIndex((_,i)=>selected(i)===null);
 if(missing>=0){const status=document.getElementById('quizResult');status.textContent=`Bạn còn ${questions.filter((_,i)=>selected(i)===null).length} câu chưa trả lời. Hãy hoàn thành trước khi nộp.`;status.className='quiz-warning';document.getElementById(`question${missing}`).scrollIntoView({block:'center'});return}
 let score=0;
 questions.forEach((q,i)=>{const s=selected(i),field=document.getElementById(`question${i}`),ok=s===q.answer;score+=Number(ok);field.classList.add(ok?'is-correct':'is-wrong');const note=field.querySelector('.answer-explain');note.hidden=false;note.textContent=`${ok?'Chính xác.':'Chưa chính xác.'} Đáp án đúng: ${abc[q.answer]}. ${q.choices[q.answer]}. ${q.explanation}`;field.querySelectorAll('input').forEach(x=>x.disabled=true);field.querySelectorAll('label').forEach((label,j)=>{label.classList.toggle('correct-answer',j===q.answer);label.classList.toggle('wrong-answer',j===s&&!ok)})});
 const pct=Math.round(score/questions.length*100);document.getElementById('quizResult').className='result';document.getElementById('quizResult').innerHTML=`<strong>Kết quả: ${score}/${questions.length} câu đúng (${pct}%)</strong><p>${pct>=90?'Rất tốt!':pct>=70?'Khá tốt! Hãy xem lại các câu chưa chính xác.':'Hãy ôn tập thêm theo các giai đoạn lịch sử và thử lại.'}</p><small>Đáp án và lời giải được hiển thị ngay dưới từng câu.</small>`;
 progress.textContent=`Hoàn thành: ${score} / ${questions.length} câu đúng`;btn.hidden=true;retry.hidden=false;locked=true;
 document.getElementById('quizResult').scrollIntoView({block:'center'});
};
retry.onclick=()=>{locked=false;root.querySelectorAll('input').forEach(x=>{x.disabled=false;x.checked=false});root.querySelectorAll('.question').forEach(x=>x.classList.remove('is-correct','is-wrong'));root.querySelectorAll('.answer').forEach(x=>x.classList.remove('correct-answer','wrong-answer'));root.querySelectorAll('.answer-explain').forEach(x=>x.hidden=true);document.getElementById('quizResult').textContent='';document.getElementById('quizResult').className='';btn.hidden=false;retry.hidden=true;updateProgress();document.querySelector('.exam-card').scrollIntoView({block:'start'})};
updateProgress();
