import { CodeSnippet } from "./components/code-snippet";
import { Dashboard } from "./components/dashboard";
import { LibraryDetail } from "./components/library-detail";
import { TextField } from "./components/text-field";
import "core-js/stable";
import "regenerator-runtime/runtime";

let data = [];
let libraries = [];

const getData = async (i) => {
  const response = await fetch(`http://localhost:5000/libraries`);
  data = await response.json();

  setData(i);
  setLibraries();
};

const setData = (i) => {
  const libraryComp = document.querySelector("library-detail");

  libraryComp.setAttribute("data", JSON.stringify(data[i]));

  if (i === 0) {
    libraryComp.setAttribute("editable", "");
  } else {
    libraryComp.removeAttribute("editable");
  }

  // document
  //   .querySelector("library-detail")
  //   .setAttribute("data", JSON.stringify(data[i]))
  //   .setAttribute("editable", editable);
};

const setLibraries = () => {
  libraries = data.map(({ name }) => name);
  const librariesNames = JSON.stringify(libraries);
  document
    .querySelector("dashboard-element")
    .setAttribute("libraries", librariesNames);
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

window.addEventListener("index-emiter", (e) => {
  const index = e.detail.index;

  setData(index);
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
