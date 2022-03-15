import { CodeSnippet } from "./components/code-snippet";
import { Dashboard } from "./components/dashboard";
import { LibraryDetail } from "./components/library-detail";
import { TextField } from "./components/text-field";
import "core-js/stable";
import "regenerator-runtime/runtime";

let count = 1;
let data = [];
let libraries = [];

// FUNCTIONS

const getData = async (i) => {
  const response = await fetch(`http://localhost:5000/libraries`);
  data = await response.json();
  setData(i, 1);
  setDashboard();
};

const setData = (i, elIndex) => {
  const libraryComp = document.querySelector(
    `library-detail:nth-of-type(${elIndex})`
  );
  libraryComp.setAttribute("data", JSON.stringify(data[i]));
  if (i === 0) {
    libraryComp.setAttribute("editable", "");
  } else {
    libraryComp.removeAttribute("editable");
  }
};

const setDashboard = () => {
  libraries = data.map(({ name, tags }) => ({
    name: name,
    tags: tags,
  }));
  const dashboardInfo = JSON.stringify(libraries);
  const dashboardElement = document.querySelector("dashboard-element");

  dashboardElement.setAttribute("data", dashboardInfo);
  // dashboardElement.setAttribute("tags", JSON.stringify(getTags()));
};

const putData = async (index, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `http://localhost:5000/libraries/${index}`,
    requestOptions
  );
  data = await response.json();
  getData(index - 1);
};

const postData = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `http://localhost:5000/libraries`,
    requestOptions
  );
  data = await response.json();
  getData(0);
};

// EVENT LISTENERS

window.addEventListener("click-emiter", (e) => {
  const index = e.detail.index;
  setData(index, 1);
});

window.addEventListener("dbclick-emiter", (e) => {
  const index = e.detail.index;
  // initial dblclick should create DOM element
  if (count === 1) {
    const createdLibrary = document.createElement("library-detail");
    createdLibrary.setAttribute("data", JSON.stringify(data[index]));
    document.querySelector(".libraries-container").appendChild(createdLibrary);
    count++;
  } else setData(index, 2);
});

window.addEventListener("save-emiter", (e) => {
  const data = e.detail.data;
  if (libraries.includes(e.detail.data.name)) {
    let index = libraries.indexOf(e.detail.data.name) + 1;
    // data object must have an id for JSON server to work properly
    data.id = index;
    putData(index, data);
  } else {
    data.id = libraries.length + 1;
    postData(data);
  }
});

customElements.define("dashboard-element", Dashboard);
customElements.define("library-detail", LibraryDetail);
customElements.define("code-snippet", CodeSnippet);
customElements.define("text-field", TextField);

getData(0);
