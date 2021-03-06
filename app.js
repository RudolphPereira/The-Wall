const auth = "563492ad6f91700001000001650cc6c0622a404e9833fa455c7b91a9";
const gallary = document.querySelector(".gallary");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let fetchLink;
let currentSearch;
let page = 1;

// Add Event Listeners
searchInput.addEventListener("input", inputUpdate);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

function inputUpdate(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application / json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const gallaryImg = document.createElement("div");
    gallaryImg.classList.add("gallary-img");
    gallaryImg.innerHTML = `
        <div class = 'gallary-info'
            <p>${photo.photographer}</p>
            <a href = ${photo.src.original}>Download</a>
        </div>
        <img src = ${photo.src.large}></img>
    `;
    gallary.appendChild(gallaryImg);
  });
}

async function curratedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

function clear() {
  gallary.innerHTML = "";
  searchInput.value = "";
}

curratedPhotos();
