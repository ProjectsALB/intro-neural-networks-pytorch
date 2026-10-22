let S={done:{},sc:{}};
try{S=Object.assign(S,JSON.parse(localStorage.getItem('intro')||'{}'))}catch(e){}
S.ans=S.ans||{};
const save=()=>{try{localStorage.setItem('intro',JSON.stringify(S))}catch(e){}};
const $=s=>document.querySelector(s),main=$('#main'),nav=$('#nav');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pct=()=>Math.round(Object.keys(S.done).length/M.length*100);
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const NAV=[['dash','Dashboard'],['course','Kursi'],['code','Kodi i kursit'],['prac','Praktiko veten'],['fc','Flashcards'],['gl','Fjalori'],['ex','Provimet'],['prog','Progresi']];
let cur='dash',arg=null,st={};
const card=m=>'<button class="card" data-v="mod" data-a="'+m.id+'"><b>Moduli '+m.id+'</b><span>'+esc(m.t)+'</span><em>'+(S.done[m.id]?'I përfunduar':'Pa përfunduar')+(S.sc[m.id]!=null?', provimi '+S.sc[m.id]+'%':'')+'</em></button>';
const glist=q=>M.flatMap(m=>m.terms).filter(t=>(t[0]+' '+t[1]).toLowerCase().includes(q.toLowerCase())).map(t=>'<dt>'+esc(t[0])+'</dt><dd>'+esc(t[1])+'</dd>').join('')||'<dd>Asnjë term nuk u gjet.</dd>';
const chips=(act,all)=>'<div class="row">'+(all?'<button class="chip" data-act="'+act+'" data-a="all">Të gjitha</button>':'')+M.map(m=>'<button class="chip" data-act="'+act+'" data-a="'+m.id+'">'+m.id+'. '+esc(m.t)+'</button>').join('')+'</div>';
const V={
dash:()=>'<h2>Hyrje në Rrjetet Neurale dhe PyTorch</h2><p class="lead">Mëso kursin modul pas moduli: lexo teorinë, shiko kodin, praktiko, përsërit me flashcards dhe jep provimin. Progresi ruhet në këtë shfletues.</p><div class="grid">'+M.map(card).join('')+'</div><button class="btn" data-v="code">Hap kodin e kursit</button>',
course:()=>'<h2>Kursi</h2><div class="grid">'+M.map(card).join('')+'</div>',
mod:()=>{const m=M[arg-1];return '<h2>Moduli '+m.id+': '+esc(m.t)+'</h2>'+m.th.map(p=>'<p class="th">'+esc(p)+'</p>').join('')+'<h3>Terma kyç</h3><dl>'+m.terms.map(t=>'<dt>'+esc(t[0])+'</dt><dd>'+esc(t[1])+'</dd>').join('')+'</dl><div class="row"><button class="btn" data-act="done" data-a="'+m.id+'">'+(S.done[m.id]?'Moduli është përfunduar':'Shëno si të përfunduar')+'</button><button class="btn alt" data-act="exam" data-a="'+m.id+'">Provimi i modulit</button><button class="btn alt" data-v="code" data-a="'+m.id+'">Kodi i javës</button></div>'},
code:()=>{const w=st.w||arg;let h='<h2>Kodi i kursit</h2><p>Skedarët Python të materialit, sipas javëve. Hapi dhe provoi në Jupyter ose Google Colab.</p>'+chips('cw');if(w&&CODE[w])h+='<h3>Java '+w+'</h3>'+CODE[w].map(f=>'<details class="box"><summary>'+esc(f[0])+'</summary><pre>'+esc(f[1])+'</pre></details>').join('');return h},
prac:()=>{let h='<h2>Praktiko veten</h2><p>Zgjidh një modul. Shkruaj zgjidhjen tënde, kontrolloje, pastaj shiko zgjidhjen e saktë.</p>'+chips('pm');if(st.m){const m=M[st.m-1];h+='<h3>'+esc(m.t)+'</h3>'+m.ex.map((x,i)=>{const k=m.id+'-'+i;return '<div class="box"><p>'+(x[3]?'<b>Ushtrim kodimi.</b> ':'')+esc(x[0])+'</p><textarea class="ans" data-k="'+k+'" rows="'+(x[3]?8:4)+'" spellcheck="false" placeholder="Shkruaj zgjidhjen këtu">'+esc(S.ans[k]||'')+'</textarea><div class="row"><button class="btn" data-act="ck" data-a="'+k+'">Kontrollo zgjidhjen</button><button class="btn alt" data-act="sol" data-a="'+k+'">Shfaq zgjidhjen e saktë</button></div><div id="r'+k+'"></div><div id="s'+k+'"></div></div>'}).join('')}return h},
fc:()=>{let h='<h2>Flashcards</h2>'+chips('fm',1);if(st.l){const c=st.l[st.i];h+='<div class="fcard" data-act="flip">'+esc(st.f?c[1]:c[0])+'</div><p>'+(st.i+1)+' / '+st.l.length+', të njohura: '+st.k+'</p><div class="row"><button class="btn" data-act="nx" data-a="k">Di</button><button class="btn alt" data-act="nx" data-a="n">Nuk e di</button><button class="btn alt" data-act="nx" data-a="l">Më vonë</button></div>'}return h},
gl:()=>'<h2>Fjalori teknik</h2><input id="q" placeholder="Kërko një term" autocomplete="off"><dl id="gll">'+glist('')+'</dl>',
ex:()=>{if(!st.e)return '<h2>Provimet</h2><p>Çdo modul ka 3 pyetje, provimi final ka 15 pyetje nga i gjithë kursi. Kalon me të paktën 60%.</p><div class="row">'+M.map(m=>'<button class="chip" data-act="exam" data-a="'+m.id+'">Moduli '+m.id+'</button>').join('')+'<button class="btn" data-act="exam" data-a="final">Provimi final</button></div>';
const e=st.e;let h='<h2>'+(e.id==='final'?'Provimi final':'Provimi i modulit '+e.id)+'</h2>';
h+=e.qs.map((q,i)=>'<fieldset><legend>'+(i+1)+'. '+esc(q[0])+'</legend>'+q[1].map((o,j)=>'<label><input type="radio" name="q'+i+'" value="'+j+'"'+(e.r&&e.a[i]==j?' checked':'')+(e.r?' disabled':'')+'> '+esc(o)+(e.r&&q[2]==j?' ✓':'')+'</label>').join('')+(e.r&&e.a[i]!=q[2]?'<p class="bad">Gabim. Përgjigjja e saktë: '+esc(q[1][q[2]])+'</p>':'')+'</fieldset>').join('');
return h+(e.r?'<p class="res">Rezultati: '+e.p+'%, '+(e.p>=60?'kaluar':'duhet të përsërisësh')+'</p><button class="btn" data-v="ex">Kthehu te provimet</button>':'<button class="btn" data-act="submit">Dorëzo</button>')},
prog:()=>'<h2>Progresi</h2><table><tr><th>Moduli</th><th>Statusi</th><th>Provimi</th></tr>'+M.map(m=>'<tr><td>'+m.id+'. '+esc(m.t)+'</td><td>'+(S.done[m.id]?'Përfunduar':'Në pritje')+'</td><td>'+(S.sc[m.id]!=null?S.sc[m.id]+'%':'-')+'</td></tr>').join('')+'<tr><td>Provimi final</td><td></td><td>'+(S.sc.final!=null?S.sc.final+'%':'-')+'</td></tr></table><button class="btn alt" data-act="reset">Rivendos progresin</button>'
};
const A={
done:a=>{S.done[a]=1;save();draw()},
exam:a=>{cur='ex';st={e:{id:a,qs:a==='final'?shuffle(M.flatMap(m=>m.q)).slice(0,15):M[a-1].q}};draw();scrollTo(0,0)},
submit:()=>{const e=st.e;e.a=e.qs.map((q,i)=>{const c=document.querySelector('input[name=q'+i+']:checked');return c?+c.value:-1});const ok=e.qs.filter((q,i)=>e.a[i]===q[2]).length;e.p=Math.round(ok/e.qs.length*100);e.r=1;S.sc[e.id]=Math.max(S.sc[e.id]||0,e.p);if(e.id!=='final'&&e.p>=60)S.done[e.id]=1;save();draw();scrollTo(0,0)},
pm:a=>{st.m=a;draw()},
cw:a=>{st.w=a;draw()},
fm:a=>{st.l=(a==='all'?M:[M[a-1]]).flatMap(m=>m.terms);st.i=0;st.f=0;st.k=0;draw()},
flip:()=>{st.f=!st.f;draw()},
nx:a=>{if(a==='k')st.k++;st.i=(st.i+1)%st.l.length;st.f=0;draw()},
reset:()=>{if(confirm('Të rivendoset i gjithë progresi?')){S={done:{},sc:{},ans:{}};save();draw()}},
ck:k=>{const p=k.split('-'),x=M[p[0]-1].ex[p[1]],v=document.querySelector('[data-k="'+k+'"]').value.trim(),o=document.getElementById('r'+k);if(!v){o.innerHTML='<p class="bad">Shkruaj fillimisht një zgjidhje.</p>';return}const r=(x[2]||[]).map(y=>[y[0],new RegExp(y[1],'i').test(v)]),n=r.filter(y=>y[1]).length;o.innerHTML='<p class="res">Përputhja: '+n+' / '+r.length+'</p><ul>'+r.map(y=>'<li class="'+(y[1]?'okk':'bad')+'">'+(y[1]?'✓ ':'✗ ')+esc(y[0])+'</li>').join('')+'</ul>'},
sol:k=>{const p=k.split('-'),x=M[p[0]-1].ex[p[1]],v=document.querySelector('[data-k="'+k+'"]').value;document.getElementById('s'+k).innerHTML='<div class="cmp"><div><h4>Zgjidhja jote</h4><pre>'+esc(v||'(bosh)')+'</pre></div><div><h4>Zgjidhja e saktë</h4><pre>'+esc(x[1])+'</pre></div></div>'}
};
function drawNav(){nav.innerHTML='<h1>NN</h1><p class="sub">Hyrje në Rrjetet Neurale dhe PyTorch</p><div class="bar"><i style="width:'+pct()+'%"></i></div><small>'+pct()+'% e përfunduar</small>'+NAV.map(n=>'<button data-v="'+n[0]+'"'+(cur===n[0]||(cur==='mod'&&n[0]==='course')?' class="on"':'')+'>'+n[1]+'</button>').join('')}
function draw(){drawNav();main.innerHTML=V[cur]();}
function go(v,a){cur=v;arg=a;st={};nav.classList.remove('open');draw();scrollTo(0,0)}
document.addEventListener('click',e=>{const t=e.target.closest('button,[data-act]');if(!t)return;
if(t.id==='mb'){nav.classList.toggle('open');return}
if(t.dataset.v){go(t.dataset.v,t.dataset.a);return}
const a=t.dataset.act;if(a&&A[a])A[a](t.dataset.a)});
document.addEventListener('input',e=>{if(e.target.classList.contains('ans')){S.ans[e.target.dataset.k]=e.target.value;save()}if(e.target.id==='q')$('#gll').innerHTML=glist(e.target.value)});
function start(){draw()}
