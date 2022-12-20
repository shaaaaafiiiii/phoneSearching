const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  searchField.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => displayPhone(data));
};

const displayPhone = (phones) => {
  const allPhones = phones.data;
  const searchResult = document.getElementById("search-result");
  const parent = document.getElementById("detail");
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }
  while (searchResult.hasChildNodes()) {
    searchResult.removeChild(searchResult.firstChild);
  }
  if (allPhones != null) {
    for (const phone of allPhones) {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
    <div class="card">
    <img src=${phone.image} class="card-img-top " alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
      <button onclick="loadDetail('${phone.slug}')" > See Detail </button>
    </div>
</div>
    `;
      searchResult.appendChild(div);
    }
  }
};

const loadDetail = (id) => {
  window.scrollTo(0, 0);
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((phone) => displayDetail(phone.data));
};

const displayDetail = (detailsObject) => {
  const parent = document.getElementById("detail");
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card mb-3 details" style="max-width: 540px;margin:auto; border: 3px dotted rgb(42, 165, 42);">
  <div class="row g-0 ">
    <div class="col-md-4 p-1">
      <img src="${detailsObject.image}" class="img-fluid rounded-start" >
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${detailsObject.name}</h5>
        <p class="card-text"><span class="fw-bold">Size: </span> ${detailsObject.mainFeatures.displaySize}</p>
        <p class="card-text"><span class="fw-bold">Release: </span> ${detailsObject.releaseDate}</p>
        <p class="card-text"><span class="fw-bold">Display: </span> ${detailsObject.mainFeatures.displaySize}</p>

      </div>
    </div>
  </div>
</div>
    `;
  parent.appendChild(div);
};
