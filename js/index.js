//function for fetch data
const phones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();
  showData(data.data, dataLimit);
};

//search button eventListener
document.getElementById("btn-phone-search").addEventListener("click", () => {
  buttonAction(10);
});

//search keyBoard eventListener
document.getElementById("input-phone").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buttonAction(10);
  }
});

//eventListener for show all button
document.getElementById("btn-show-all").addEventListener("click", () => {
  buttonAction();
});

//common function for button
const buttonAction = (dataLimit) => {
  //loader start
  loader(false);
  const searchText = document.getElementById("input-phone").value;
  phones(searchText, dataLimit);
};

//function for showing data
const showData = (phones, dataLimit) => {
  const card = document.getElementById("phone-card");
  card.textContent = "";

  //for show all data
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //for if there no data
  const noDataDiv = document.getElementById("no-data");
  if (phones.length === 0) {
    const noData = document.createElement("div");
    noDataDiv.textContent = "";
    noData.innerHTML = `
    <h3 class="text-primary text-center">No Data Found</h3>
    `;
    noDataDiv.appendChild(noData);
  } else {
    noDataDiv.textContent = "";
    phones.forEach((phone) => {
      //create element
      const cardDiv = document.createElement("div");
      //add class
      cardDiv.classList.add("col");
      //add inner html
      cardDiv.innerHTML = `
  <div class="card p-3">
    <img src=${phone.image} class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
     <button
        onClick="loadModal('${phone.slug}')"
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop">
           See Details
    </button>
  </div>
</div>
  `;
      //add child
      card.appendChild(cardDiv);
    });
  }
  //stop loader
  loader(true);
};

const showAllButton = () => {};

//function for modal open
const loadModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  const modalContainer = document.getElementById("phone-modal-container");

  modalContainer.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">
          ${data.data.name}
        </h1>
        <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img src=${data.data.image} class="img-fluid"/>
        <h4>Brand: ${data.data.brand}</h4>
        <p>
            Release Date: ${
              data.data.releaseDate
                ? data.data.releaseDate
                : "No ReleaseDate Found"
            }
        </p>
        <p>
          ChipSet: ${data.data.mainFeatures.chipSet}
        <br/>
          Storage: ${data.data.mainFeatures.storage}
        <br/>
          Sensors: ${data.data.mainFeatures.sensors.map(
            (sensor) => `<span> ${sensor}</span>`
          )}
        </p>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal">
            Close
        </button>
      </div>
  </div>
    `;
};

//function for loading spinner
const loader = (isLoading) => {
  const loaderDiv = document.getElementById("loader");
  if (isLoading === true) {
    loaderDiv.classList.add("d-none");
  } else {
    loaderDiv.classList.remove("d-none");
  }
};
