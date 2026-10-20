document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.scroll).scrollIntoView({behavior:'smooth'})));

const form=document.getElementById('match-form');
const result=document.getElementById('result');
const buttonText=document.getElementById('button-text');

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
