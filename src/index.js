import { CodeSnippet } from "./components/code-snippet";
import { Dashboard } from "./components/dashboard";
import { LibraryDetail } from "./components/library-detail";
import { TextField } from "./components/text-field";
import "core-js/stable";
import "regenerator-runtime/runtime";

let data = [];

const getData = async () => {
  const response = await fetch(`http://localhost:5000/libraries`);
  data = await response.json();
  const libraries = data.map(({ name }) => name);
  const librariesNames = JSON.stringify(libraries);

  document
    .querySelector("dashboard-element")
    .setAttribute("libraries", librariesNames);
  setData(1)
};

const setData = (i) => {
    document
    .querySelector("library-detail")
    .setAttribute("data", JSON.stringify(data[i]));
}

getData();

window.addEventListener("index-emiter", (e) => {
    const index = e.detail.index;
    setData(index)
});

customElements.define("dashboard-element", Dashboard);
customElements.define("library-detail", LibraryDetail);
customElements.define("code-snippet", CodeSnippet);
customElements.define("text-field", TextField);
