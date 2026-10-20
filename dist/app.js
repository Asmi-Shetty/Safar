document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.scroll).scrollIntoView({behavior:'smooth'})));

const form=document.getElementById('match-form');
const result=document.getElementById('result');
const buttonText=document.getElementById('button-text');
const modal=document.getElementById('app-modal');
const modalTitle=document.getElementById('modal-title');
const modalContent=document.getElementById('modal-content');
const toast=document.getElementById('toast');
const store={get:key=>JSON.parse(localStorage.getItem(key)||'[]'),set:(key,value)=>localStorage.setItem(key,JSON.stringify(value))};
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)}
function openModal(title,content){modalTitle.textContent=title;modalContent.innerHTML=content;modal.hidden=false;document.body.style.overflow='hidden'}
function closeModal(){modal.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal()});

document.querySelector('.swap').addEventListener('click',()=>{
  const from=document.getElementById('from');
  const to=document.getElementById('to');
  [from.value,to.value]=[to.value,from.value];
});

form.addEventListener('submit',event=>{
  event.preventDefault();
  result.hidden=true;
  buttonText.textContent='Comparing routes…';
  setTimeout(()=>{
    buttonText.textContent='Find compatible rides';
    result.hidden=false;
    result.scrollIntoView({behavior:'smooth',block:'nearest'});
  },750);
});

document.getElementById('confirm-ride').addEventListener('click',()=>{
  const choice=document.querySelector('[name="vehicle"]:checked');
  const trip={id:'SF'+Date.now().toString().slice(-6),from:document.getElementById('from').value,to:document.getElementById('to').value,time:document.getElementById('time').value,vehicle:choice.value,fare:Number(choice.dataset.fare),status:'Matching driver'};
  const trips=store.get('safarTrips');trips.unshift(trip);store.set('safarTrips',trips.slice(0,20));
  openModal('Ride requested',`<div class="shield">✓</div><p><strong>${trip.vehicle} request ${trip.id}</strong></p><p>This request is saved on your device. Live driver dispatch, payment capture, and SMS updates activate when provider credentials are connected.</p><button class="primary full" data-close-now>Done</button>`);
  modal.querySelector('[data-close-now]').addEventListener('click',closeModal);notify('Ride request saved');
});

const panels={
  schedule:()=>openModal('Schedule a ride',`<form class="modal-form" id="schedule-form"><label>Pickup<input name="from" required value="${document.getElementById('from').value}"></label><label>Destination<input name="to" required value="${document.getElementById('to').value}"></label><label>Date and time<input name="when" type="datetime-local" required></label><label>Ride type<select name="vehicle"><option>Mini</option><option>Auto</option><option>Prime</option><option>XL</option></select></label><button class="primary" type="submit">Save scheduled ride</button></form>`),
  saved:()=>{const places=store.get('safarPlaces');openModal('Saved places',`${places.map((p,i)=>`<div class="place-item"><span><strong>${p.name}</strong><small>${p.address}</small></span><button data-use-place="${i}">Use</button></div>`).join('')||'<p class="empty">No saved places yet.</p>'}<form class="modal-form" id="place-form"><label>Label<input name="name" placeholder="Home" required></label><label>Address<input name="address" placeholder="Enter an address" required></label><button class="primary" type="submit">Save place</button></form>`);},
  history:()=>{const trips=store.get('safarTrips');openModal('Your trips',trips.map(t=>`<div class="trip-item"><span><strong>${t.from} → ${t.to}</strong><small>${t.time} · ${t.vehicle} · ${t.status}</small></span><b>${t.fare==='—'?'—':'₹'+t.fare}</b></div>`).join('')||'<p class="empty">Your confirmed and scheduled rides will appear here.</p>');},
  safety:()=>openModal('Safety centre',`<div class="option-item"><span><strong>Share trip status</strong><small>Create a status summary for a trusted contact.</small></span><button data-demo="share">Share</button></div><div class="option-item"><span><strong>Emergency assistance</strong><small>In a real emergency, contact local emergency services.</small></span><button data-demo="sos">SOS</button></div><div class="option-item"><span><strong>Route check</strong><small>Current prototype route status: normal.</small></span><b>✓</b></div>`),
  payments:()=>openModal('Payment options',`<div class="option-item"><span><strong>UPI</strong><small>Connect a payment gateway to enable.</small></span><b>Coming soon</b></div><div class="option-item"><span><strong>Cards & wallet</strong><small>Secure tokenized payment integration point.</small></span><b>Coming soon</b></div><div class="option-item"><span><strong>Cash</strong><small>Available when live driver dispatch is enabled.</small></span><b>Planned</b></div>`)
};
document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>panels[button.dataset.action]()));
modal.addEventListener('submit',event=>{
  event.preventDefault();
  if(event.target.id==='schedule-form'){const data=Object.fromEntries(new FormData(event.target));const trips=store.get('safarTrips');trips.unshift({id:'SF'+Date.now().toString().slice(-6),from:data.from,to:data.to,time:new Date(data.when).toLocaleString(),vehicle:data.vehicle,fare:'—',status:'Scheduled'});store.set('safarTrips',trips);closeModal();notify('Ride scheduled on this device');}
  if(event.target.id==='place-form'){const data=Object.fromEntries(new FormData(event.target));const places=store.get('safarPlaces');places.push(data);store.set('safarPlaces',places);panels.saved();notify('Place saved');}
});
modal.addEventListener('click',event=>{const index=event.target.dataset.usePlace;if(index!==undefined){const place=store.get('safarPlaces')[Number(index)];document.getElementById('to').value=place.address;closeModal();document.getElementById('matcher').scrollIntoView({behavior:'smooth'});}if(event.target.dataset.demo==='share')notify('Trip summary ready to share');if(event.target.dataset.demo==='sos')notify('Emergency integration requires a verified service provider');});
