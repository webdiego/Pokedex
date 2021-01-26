'use strict';

const container = document.querySelector('.container');
const input = document.querySelector('input');
const button = document.querySelector('.btn');
const names = document.querySelector('.name');
const poke = document.querySelector('.img');
const ability1 = document.querySelector('.ability-1');
const ability2 = document.querySelector('.ability-2');
const status = document.querySelector('.status');
const levels = document.querySelector('.level');
const ctr = document.querySelector('.ctr');
const type_1 = document.querySelector('.type-1');
const type_2 = document.querySelector('.type-2');
const down = document.querySelector('.down')

let html;
const firstUpper= function(word){
  return word[0].toUpperCase() + word.slice(1) 
}
const plant = async function (pokemon) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await res.json();
    console.log(data);

    //?Show img and name

    names.textContent = firstUpper(data.name) ;
    const { front_default: img } = data.sprites;
    poke.src = img;
    down.classList.remove('hidden')
    container.style.height = '120%'

    //?Adding Ability
    const [abilityOne, abilityTwo] = data.abilities;
    // console.log(abilityOne, abilityTwo);

    const {
      ability: { name: abyOne },
    } = abilityOne;
    const {
      ability: { name: abyTwo },
    } = abilityTwo;

    ability1.textContent = firstUpper(abyOne) ;
    ability2.textContent = firstUpper(abyTwo);

    //Show element type
    const [slotTypes1, slotTypes2] = data.types;

    if (!slotTypes2 ) {
      const {
        slot: slot1,
        type: { name: type1 },
      } = slotTypes1;
       element1(type1);
       element2('')
    } else {
      const {
        slot: slot1,
        type: { name: type1 },
      } = slotTypes1;
      const {
        slot: slot2,
        type: { name: type2 },
      } = slotTypes2;
       element1(type1);
       element2(type2); 
    }

    //*Show stats
    const allStats = data.stats;
    //Remove if present all the stat in the status div
    status.innerHTML = '';
   //loop over all the stat and crate stats
    allStats.forEach(function (stat, index) {
      const {
        base_stat: baseLevel,
        stat: { name: name },
      } = stat;

      
      html = `
      <div class="staty"> 
      <p data="ctr" class="ctr-${index}">${name}</p>
      <progress data="level" class="level" value="${baseLevel}" max="100"></progress>
      <span> ${baseLevel}</span>
      </div>
      `;
      status.innerHTML += html;

      return html
    });
    
    let levels = document.querySelectorAll('progress')

    levels.forEach(lev =>{
      console.log(lev);
      if(lev.value < 50){
        lev.style.backgroundColor='red'

      }else if(lev.value >=50 && lev.value < 70){
        lev.style.backgroundColor='green'

      }else if(lev.value >=70&& lev.value <90){
        lev.style.backgroundColor='blue'
      }else{
      lev.style.backgroundColor='gold'
      }
    })
    
    
  } catch (err) {
    console.error(err.message);
  }
};

input.addEventListener('keyup', function (e) {
  // console.log(e);
  if (e.keyCode === 13) {
    plant(input.value.toLocaleLowerCase());
  }
});

const element1 = function (type) {
  console.log(type);
  type_1.textContent = type;

  if (type === 'fire') {
    type_1.style.backgroundColor = 'red';
  } else if (type === 'grass') {
    type_1.style.backgroundColor = 'green';
  } else if (type == 'poison') {
    type_1.style.backgroundColor = 'purple';
  } else if (type === 'electric') {
    type_1.style.backgroundColor = 'yellow';
  } else if (type === 'ground') {
    type_1.style.backgroundColor = 'brown';
  } else if (type === 'flying') {
    type_1.style.backgroundColor = 'grey';
  } else if (type === 'water') {
    type_1.style.backgroundColor = 'blue';
  }else if(type === 'normal'){
    type_1.style.backgroundColor = '#f0efeb'
  }
};
const element2 = function (type) {

  type_2.textContent = type;
  if (!type ){
    type_2.style.backgroundColor = '';
    type_2.textContent = ''
  }
  if (type === 'fire') {
    type_2.style.backgroundColor = 'red';
  } else if (type === 'grass') {
    type_2.style.backgroundColor = 'green';
  } else if (type == 'poison') {
    type_2.style.backgroundColor = 'purple';
  } else if (type === 'electric') {
    type_2.style.backgroundColor = 'yellow';
  } else if (type === 'ground') {
    type_2.style.backgroundColor = 'brown';
  } else if (type === 'flying') {
    type_2.style.backgroundColor = 'grey';
  } else if (type === 'water') {
    type_2.style.backgroundColor = 'blue';
  }
};

const progressBar = function(){

}
