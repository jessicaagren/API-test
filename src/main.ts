import { AsoiafCharacter } from './asoiafType';
import { JellyBelly } from './jellyBellyType';
import './style.css'

// const getRandomMeal = async (): Promise<string> => {
//   const response = await fetch("http://www.themealdb.com/api/json/v1/1/random.php");
//   const data = await response.json();

//   return data.meals[0].strMeal;
// }

// for (let i = 1; i < 6; i++) {
//   getRandomMeal().then(meal => {
//     console.log(`Dish ${i} is ${meal}.`);
//   });
// }

const extinctAnimalUrl = "https://extinct-api.herokuapp.com/api/v1/animal/";

const getRandomExtinctAnimal = async(): Promise<{ extinctName: string, lastRecord: string }> => {
  const response = await fetch(extinctAnimalUrl);
  const data = await response.json();

  return { extinctName: data.data[0].binomialName,
    lastRecord: data.data[0].lastRecord,
  };
}
  
// for (let i = 1; i < 6; i++) {
//     getRandomExtinctAnimal().then(({ extinctName, lastRecord }) => { console.log(`Extinct animal ${i} is ${extinctName} and was last recorded in ${lastRecord}.`)});
//   }

const extinctAnimalList = document.getElementById("extinct-animal-list") as HTMLUListElement;
  
for (let i = 1; i < 6; i++) {
  const li = document.createElement("li");
  getRandomExtinctAnimal().then(({ extinctName, lastRecord }) => li.innerHTML=`Extinct animal ${i} is ${extinctName} and was last recorded in ${lastRecord}.`);
  extinctAnimalList.appendChild(li);
}

const getExtinctAnimalByNumber = async (): Promise<{ number: number; name: string }> => {
  const randomNumber = Math.floor(Math.random() * 804) + 1;
  const response = await fetch(extinctAnimalUrl + randomNumber);
  const data = await response.json();

    return {
      number: randomNumber,
      name: data.data[0].binomialName,
    }
}

for (let i = 1; i < 6; i++) {
  getExtinctAnimalByNumber()
    .then(({ number, name }) => {
      console.log(`Extinct animal #${number} is ${name}.`);
    });
}

const asoiafurl = "https://www.anapioficeandfire.com/api/";


const getAsoiafCharacterByID = async (id: number): Promise<AsoiafCharacter> => {
  const response = await fetch(`${asoiafurl}characters/${id}`);
  const data = await response.json() as AsoiafCharacter;
  
  return data as AsoiafCharacter;
}

const getAsoiafCharacterNameByID = async (id: number): Promise<string> => {
  const character = (await getAsoiafCharacterByID(id)).name;
  
  return character;
}

// const getAsoiafCharacterBookByID = async (id: number): Promise<string[]> => {
//   const books: string[] = (await getAsoiafCharacterByID(id)).books;

//   return books[];
// }

const asoiafList = document.getElementById("asoiaf-list") as HTMLUListElement;

for (let i = 0; i < 6; i++) {
  const randomID = (Math.floor(Math.random() * 2134) + 1);
  const li = document.createElement("li");
  li.innerHTML=`Character #${randomID} is ${await getAsoiafCharacterNameByID(randomID)}.`;
  asoiafList.appendChild(li);
}

const jellyBellyurl = 'https://jellybellywikiapi.onrender.com/api/beans';

const getJellyBelly = async (index: number): Promise<JellyBelly> => {
  const response = await fetch (jellyBellyurl);
  const data = await response.json();

  return data.items[index];
}

const jelly = await getJellyBelly(1);
console.log(`Jelly is ${jelly.flavorName}.`);

// const getJellyBellyName = async (index: number): Promise<string> => {
//   const response = await fetch (jellyBellyurl);
//   const data = await response.json();

//   return data.items[index].flavorName;
// }


// const getJellyBellyImage = async (index: number): Promise<string> => {
//   const response = await fetch (jellyBellyurl);
//   const data = await response.json();
  
//   return data.items[index].imageUrl;
// }

// const getJellyBellyColor = async (index: number): Promise<string> => {
//   const response = await fetch (jellyBellyurl);
//   const data = await response.json();
  
//   return data.items[index].backgroundColor;
// }

const jellyBellyDiv = document.getElementById("jelly-bellies") as HTMLDivElement;

const renderJellyBelly = async() => {
  for (let i = 0; i < 10; i++) {
    const jellyBelly = await getJellyBelly(i);

    const div = document.createElement("div");
    div.style.backgroundColor = jellyBelly.backgroundColor;
    div.style.padding = '10px';
    div.style.margin = '5px';
    jellyBellyDiv.appendChild(div);

    const h2 = document.createElement("h2");
    h2.innerHTML = jellyBelly.flavorName;
    div.appendChild(h2);

    const img = document.createElement("img");
    img.src = jellyBelly.imageUrl;
    img.style.maxWidth = '150px';
    img.style.height = 'auto';
    div.appendChild(img);
  }
}

const displayJellyBellyInfo = async () => {
  for (let i = 0; i < 6; i++) {
    const jellyBelly = await getJellyBelly(i);
    console.log(`Flavor: ${jellyBelly.flavorName}, Image: ${jellyBelly.imageUrl}, Color: ${jellyBelly.backgroundColor}`);
  }
};

displayJellyBellyInfo();

renderJellyBelly();

const keanuurl = `https://whoa.onrender.com/whoas/random`;

const getRandomKeanuWhoa = async (): Promise<string> => {
  const response = await fetch (keanuurl);
  const data = await response.json();

  // console.log('API Response:', data);

  return data[0].movie;
}

console.log(`This Keanu whoa comes from ${await getRandomKeanuWhoa()}.`);