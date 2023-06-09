// робота з бекендом, отримуємо новини з сайту
const subTitle = document.querySelector(".totalPage ");
 const form = document.querySelector(".form");
 const select = document.querySelector(".category"); 
 const title = document.querySelector(".counter");   
 const pageSizeInput = document.querySelector(".pageSize")
const list = document.querySelector(".list");
const loadMoreBtn = document.querySelector(".load");
const KEY = "5dc976f60a874ea58fbf6f14ab015fe7";
const BASE_URL = "https://newsapi.org/v2";
const URL = `${BASE_URL}/top-headlines?apiKey=${KEY}&category=sports&pageSize=10&country=ua`;
let currentPage = 1;

const updateUi = (data, pageSize) => {
  title.textContent =`Total articles found ${data?.totalResults}`;
  list.innerHTML = "";
  subTitle.textContent = `Знайдено новин на ${Math.ceil(data?.totalResults / pageSize)} сторінках`;
};


const handleSubmit = (e) => {
    e.preventDefault();
    const category = select.value; 
    const pageSize = pageSizeInput.value;
     const url = `${BASE_URL}/top-headlines?apiKey=${KEY}&category=${category}&pageSize=${pageSize}&country=ua&page=${currentPage}`;
     currentPage += 1;
     
     fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // console.log("data", data);
   if (e.type === "submit") {
 updateUi(data, pageSize);
   }    
   
    
    insertContent(data.articles);
  })
  .catch((error) => {
    console.log("error", error);
}).finally(() => {});
};

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click",handleSubmit);




// В нашу функцію прилітає об'єкт з масивом(консоль), опрацьовуємо інформацію і рендеримо список.
// Запускаємо функцію стільки разів, скільки елементів нам прилітає за допомогою map або reduce

const createListItem = (item) => `<li>
  <img src="${item.urlToImage ?? ""}" alt="${item.description ?? ""}">
  <h2>${item.title ?? ""}</h2>
   <p>${item.description ? item.description : ""}</p>
  <p>${item.author ?? ""}</p>
  <a href="${item.url}" target="_blank">Перейти до статті</a> 
</li>`;

// функція нижче приймає масив даних та виводить його в рядок
const generateContent = (array) =>
  array?.reduce((acc, item) => acc + createListItem(item), "");

const insertContent = (array) => {
  const result = generateContent(array);
  list.insertAdjacentHTML("beforeend", result);
};



//  array?.reduce якщо масив прийшов код запускається, якщо ні то не запускається

//  item.urlToImage ?? "" якщо картинка є то вставляємо якщо ні пуста строка