import { CodeSnippet } from "./components/code-snippet";
import { Dashboard } from "./components/dashboard";
import { LibraryDetail } from "./components/library-detail";
import { TextField } from "./components/text-field";
import { LibraryLinks } from "./components/library-links";
import { InputField } from "./components/input-field";
import "core-js/stable";
import "regenerator-runtime/runtime";

let count = 1;
let data = [];
let libraries = [];
let tags = [];

// FUNCTIONS

const getData = async (i, libraryId = 1) => {
  const response = await fetch(`http://localhost:5000/libraries`);
  data = await response.json();
  tags = data.map(({ tags }) => tags);

  setData(i, libraryId);
  setDashboard();
};

const setData = (i, elIndex) => {
  const libraryComp = document.querySelector(
    `library-detail:nth-of-type(${elIndex})`
  );
  libraryComp.setAttribute("data", JSON.stringify(data[i]));
  libraryComp.setAttribute("tags", JSON.stringify(tags));
  if (i === 0) {
    libraryComp.setAttribute("editable", "");
  } else {
    libraryComp.removeAttribute("editable");
  }
};

const setDashboard = () => {
  const dashboardInfo = data.map(({ name, tags }) => ({
    name: name,
    tags: tags,
  }));
  //set libraries as global variable so that click events could be handled properly
  libraries = dashboardInfo.map(({ name }) => name);

  const dashboardElement = document.querySelector("dashboard-element");
  dashboardElement.setAttribute("data", JSON.stringify(dashboardInfo));

};

const putData = async (index, data, libraryId) => {
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
  getData(index - 1, libraryId);
};

const postData = async (data, libraryId) => {
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

  console.log(data);
  getData(libraries.length, libraryId);
};

// EVENT LISTENERS

window.addEventListener("click-emiter", (e) => {
  const index = libraries.indexOf(e.detail.libraryName);
  console.log(document.querySelector('library-detail:nth-of-type(2)')?.getAttribute("data"))


  if (e.detail.onlyResult) {
    const firstLibraryData = document.querySelector('library-detail:nth-of-type(1)').getAttribute("data");
    const secondLibraryData = document.querySelector('library-detail:nth-of-type(2)')?.getAttribute("data");

    if (JSON.parse(firstLibraryData).name === "+") {
      setData(index, 1)
    } else if (!secondLibraryData) {
      dblClickHandler(index)
    }

  } else setData(index, 1);

});

window.addEventListener("dbclick-emiter", (e) => {
  const index = libraries.indexOf(e.detail.libraryName);

  dblClickHandler(index);  
});

const dblClickHandler = (index) => {
  // initial dblclick should create DOM element
  if (count === 1) {
    const createdLibrary = document.createElement("library-detail");
    createdLibrary.classList.add('library-secondary');
    createdLibrary.setAttribute("data", JSON.stringify(data[index]));
    createdLibrary.setAttribute("tags", JSON.stringify(tags));
    document.querySelector(".libraries-container").appendChild(createdLibrary);
    count++;
  } else setData(index, 2);
}

window.addEventListener("save-emiter", (e) => {
  console.log(e.target.classList)
  const libraryId = e.target.classList[0] === 'library-primary' ? 1 : 2;
  const data = e.detail.data;
  if (libraries.includes(e.detail.data.name)) {
    let index = libraries.indexOf(e.detail.data.name) + 1;
    // data object must have an id for JSON server to work properly
    data.id = index;
    putData(index, data, libraryId);
  } else {
    data.id = libraries.length + 1;
    postData(data, libraryId);
  }
});

customElements.define("dashboard-element", Dashboard);
customElements.define("library-links", LibraryLinks);
customElements.define("library-detail", LibraryDetail);
customElements.define("code-snippet", CodeSnippet);
customElements.define("text-field", TextField);
customElements.define("input-field", InputField);

getData(0);

//aux functions
// const setTags = () => {
//   //retrieves tags from data, flattens the nested array and concatinates library names
//   const tags = data?.map(({ tags }) => tags).flat();

//   //returns only unique values
//   return [...new Set(tags)];
// };
