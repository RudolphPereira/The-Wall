const auth = "563492ad6f91700001000001650cc6c0622a404e9833fa455c7b91a9";
const gallary = document.querySelector(".gallary");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

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
}
