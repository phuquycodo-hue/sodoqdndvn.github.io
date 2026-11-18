const fields=['theme','accent','fontSize','fontFamily','lineHeight','contentWidth','density','corners','textAlign','motion'];
const current=window.readSiteSettings();
fields.forEach(id=>{const control=document.getElementById(id);control.value=current[id]??window.siteDefaults[id];control.addEventListener(id==='fontSize'?'input':'change',()=>{const changes={};changes[id]=id==='fontSize'?Number(control.value):control.value;saveSiteSettings(changes);document.getElementById('fontSizeOut').textContent=document.getElementById('fontSize').value+'px'})});
document.getElementById('fontSizeOut').textContent=document.getElementById('fontSize').value+'px';
document.getElementById('resetSettings').onclick=()=>{saveSiteSettings({...window.siteDefaults});fields.forEach(id=>document.getElementById(id).value=window.siteDefaults[id]);document.getElementById('fontSizeOut').textContent=window.siteDefaults.fontSize+'px'};
