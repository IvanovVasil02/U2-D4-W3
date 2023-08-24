const container = document.getElementById("wrapper");
const loadBtn = document.getElementById("load-btn");
const loadSecondaryBtn = document.getElementById("load-secondary-btn");
let URL = "https://api.pexels.com/v1/search?query=";

const getData = async function (event, query) {
  container.innerHTML = "";
  const response = await fetch(URL + query + "&per_page=9", {
    method: "GET",
    headers: {
      Authorization: "LyznlpHZMNWDWElNMJrKvHcm5Bq2AFKX2VxLMLi8Umn5HzwH03l3jcLp",
    },
  });

  const convertedResp = await response.json();
  const photoArray = convertedResp.photos;

  photoArray.forEach((photo) => {
    container.innerHTML += `
                    <div class="col-md-4">
                        <a href="photoDetails.html?photoId=${photo.id}">
                            <div class="card mb-4 shadow-sm">
                            <img src="${photo.src.tiny}" class="card-img-top " height="300"  alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${photo.photographer}</h5>
                                <p class="card-text">${photo.alt}
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary"  onclick="hidePhoto(event)">Hide</button>
                                </div>
                                <small class="text-muted">Picture Id: ${photo.id}</small>
                                </div>
                            </div>
                            </div>
                        </a>
                    </div>`;
  });
};

const hidePhoto = (event) => {
  event.target.closest(".col-md-4").remove();
};

const getSearch = (event) => {
  event.preventDefault();
  const search = document.getElementById("search-input").value;

  getData(event, search);
};

window.onload = async () => {
  const url = window.location.search;
  if (url) {
    const photoId = new URLSearchParams(window.location.search).get("photoId");
    URL = "https://api.pexels.com/v1/photos/" + photoId;
    console.log(URL);

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: "LyznlpHZMNWDWElNMJrKvHcm5Bq2AFKX2VxLMLi8Umn5HzwH03l3jcLp",
      },
    });

    const photo = await response.json();
    container.innerHTML = `<div class="card mb-3 card-detail">
    <div class="row g-0">
        <div class="col-md-5" >
        <img src="${photo.src.medium}" class="img-fluid rounded-start " alt="..." />
        </div>
        <div class="col-md-7">
        <div class="card-body">
            <h5 class="card-title">${photo.photographer}</h5>
            <p class="card-text">
            ${photo.alt}
            </p>
            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
        </div>
    </div>
    </div>`;
  }
};
