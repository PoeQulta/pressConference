const spinner = document.querySelector('.spinner');
const startBtn = document.querySelector('.spinner__start-button');
const input = document.querySelector('.spinner__input');
let plate = document.querySelector('.spinner__plate');
let items = [...document.getElementsByClassName('spinner__item')];
const dropdownMenu = document.querySelector(".dropdown_field");
var cat = "Singers";


Object.keys(jsonOptions).forEach(itemCat => 
{
	var node = document.createElement("div");
	node.classList.add("dropdown-item");
	node.innerHTML = itemCat;
	node.addEventListener('click', function (event) {
            cat = itemCat;
			input.innerHTML = itemCat;
			var event = new Event('change');
			input.dispatchEvent(event);
        });
	dropdownMenu.appendChild(node);
}

);

var activeCat = jsonOptions[cat];
input.addEventListener('change', (e) => {
	activeCat = jsonOptions[cat]
	
});
startBtn.addEventListener('click', function() {
  randomizeItems();
  if (!plate.classList.contains('spinner__plate--spin')) {
      plate.classList.add('spinner__plate--spin');
  } else {
    const currPlate = plate;
    const newPlate = plate.cloneNode(true);
    currPlate.parentNode.replaceChild(newPlate, currPlate);
    plate = newPlate;
    items = [...document.getElementsByClassName('spinner__item')];
  }
  activeCat[items[0].innerHTML]= true;
});

function randomizeItems() {
	var Unmarked = [];
	Object.keys(activeCat).forEach( item => 
	{
		if(!activeCat[item])
		{
			Unmarked.push(item);
		}
	}
	);	
	if(Unmarked.length==0)
	{
		alert("Category got used up");
		return;
	}
	 var usedKeys = new Set();
	 for (let i=0; i<Math.min(Unmarked.length,4);i++)
	 {
		 let randKey;
		do {
		randKey = Unmarked[random(0, Unmarked.length - 1)];
		} while (usedKeys.has(randKey));
		usedKeys.add(randKey);
		items[i].textContent = randKey;
	 }
}


function random(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}