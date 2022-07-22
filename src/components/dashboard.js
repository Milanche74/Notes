import { LitElement, html, css } from "lit";

export class Dashboard extends LitElement {
  static properties = {
    data: {
      converter: (attrValue) => {
        if (attrValue) return JSON.parse(attrValue);
      },
    },
    _filteredLibraries: { state: true },
  };

  static styles = css``;

  constructor() {
    super();
    this.data = [];
    this._filteredLibraries = [];
    this.addEventListener("input-emitter", (e) => {
      this.handleSearch(e.detail.inputValue);
    });
  }
  tags = [];
  libraries = [];

  suggestions = [];

  render() {
    this.libraries = this.getLibraries();
    this.tags = this.getTags();

    return html`
      <div class="dashboard">
        <style>
          input-field {
            --input-align-items: center;
            --input-padding: 2vh 5vw 0;
          }
        </style>
        <input-field
          .tags=${this.tags}
          placeholder="search by Name or #tag"
        ></input-field>
        <library-links .links=${this._filteredLibraries}></library-links>
      </div>
    `;
  }

  get input() {
    return this.renderRoot.querySelector("#search-input");
  }

  getTags() {
    //retrieves tags from data, flattens the nested array and concatinates library names
    const tags = this.data
      ?.map(({ tags }) => tags)
      .flat()
      .concat(this.libraries);

    //returns only unique values
    return [...new Set(tags)];
  }

  getLibraries() {
    const libraries = this.data?.map(({ name }) => name);
    return libraries;
  }

  handleSearch(inputValue) {
    let searchTerms = inputValue.trim().split(" ");

    let filteredData = this.data.filter((item) => {
      let joinedTags = item.name.toLowerCase() + item.tags?.join();
      let formattedTags = joinedTags?.replaceAll(`,`, ` `);

      // check if every search term is present in either library name or library tag
      return searchTerms.every((term) =>
        formattedTags?.includes(term.toLowerCase())
      );
    });

    let extractedNames = filteredData.map(({ name }) => name);
    extractedNames.push("+");

    if (inputValue !== "") {
      this._filteredLibraries = extractedNames;
    }
  }
}
