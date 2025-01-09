import { AsoiafCharacter } from './asoiafType';
import { JellyBelly, JellyBellyResponse } from './jellyBellyType';
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

for (let i = 1; i < 6; i++) {
  const randomID = (Math.floor(Math.random() * 2134) + 1);
  const li = document.createElement("li");
  li.innerHTML=`Character #${randomID} is ${await getAsoiafCharacterNameByID(randomID)}.`;
  asoiafList.appendChild(li);
}

const jellyBellyurl = 'https://jellybellywikiapi.onrender.com/api/beans';

const getPage = async (pageIndex: number): Promise<JellyBellyResponse> => {
  const response = await fetch(`${jellyBellyurl}?pageIndex=${pageIndex}&pageSize=10`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: JellyBellyResponse = await response.json();
  return data;
};

const getTotalPages = async (): Promise<number> => {
  const response = await fetch(`${jellyBellyurl}?pageIndex=1&pageSize=10`);
  const data: JellyBellyResponse = await response.json();
  return data.totalPages;
};


const jellyBellyDiv = document.getElementById("jelly-bellies") as HTMLDivElement;

const renderJellyBelly = async (pageIndex: number) => {
  jellyBellyDiv.innerHTML = "";

  const data = await getPage(pageIndex);

  for (let i = 0; i < data.items.length; i++) {
    const jellyBelly = data.items[i];

    const div = document.createElement("div");
    if (!jellyBelly.backgroundColor || jellyBelly.backgroundColor.trim() === "" || "#" ) {
      div.style.backgroundColor = "#ffebcd";
    } else {
      div.style.backgroundColor = jellyBelly.backgroundColor;
    }
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
  await renderPagination(pageIndex);
}

const updatePage = async (newPage: number) => {
  await renderJellyBelly(newPage);
};

const renderPagination = async (currentPage: number) => {
  const totalPages = await getTotalPages();
  pagination.innerHTML = "";

  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.onclick = () => updatePage(currentPage - 1);
    pagination.appendChild(prevButton);
  }

  const pageInfo = document.createElement("p");
  pageInfo.innerHTML = `Page ${currentPage} of ${totalPages}`;
  pagination.appendChild(pageInfo);

  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.onclick = () => updatePage(currentPage + 1);
    pagination.appendChild(nextButton);
  }
};

const pagination = document.getElementById("pagination") as HTMLDivElement;

renderJellyBelly(1);
