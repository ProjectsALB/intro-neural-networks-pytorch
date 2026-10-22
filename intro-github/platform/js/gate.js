const H1="5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",H2="194116516";
async function hp(p){if(window.crypto&&crypto.subtle){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(p));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')===H1}let h=5381;for(const c of p)h=((h<<5)+h+c.charCodeAt(0))>>>0;return String(h)===H2}
const gate=document.getElementById('gate');
function enter(){gate.hidden=true;document.body.classList.add('in');start()}
let ok=false;try{ok=sessionStorage.getItem('intro_ok')==='1'}catch(e){}
if(ok)enter();
document.getElementById('gf').addEventListener('submit',async e=>{e.preventDefault();const v=document.getElementById('pw').value;if(await hp(v)){try{sessionStorage.setItem('intro_ok','1')}catch(x){}enter()}else{document.getElementById('ge').textContent='Fjalëkalimi është i gabuar.';document.getElementById('pw').value='';document.getElementById('pw').focus()}});
