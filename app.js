const auth = "563492ad6f91700001000001650cc6c0622a404e9833fa455c7b91a9";
const gallary = document.querySelector(".gallary");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

// Add Event Listeners

searchInput.addEventListener("input", loadMore);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

function loadMore(e) {
  searchValue = e.target.value;
}

async function curratedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/curated?per_page=15&page=1",
    {
      method: "GET",
      headers: {
        Accept: "application / json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();

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

async function searchPhotos(query) {
  const dataFetch = await fetch(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application / json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();

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

curratedPhotos();
