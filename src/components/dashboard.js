import { LitElement, html, css } from "lit";

export class Dashboard extends LitElement {
  static properties = {
    data: {
      converter: (attrValue) => {
        if (attrValue) return JSON.parse(attrValue);
      },
    },
    _filteredTags: { state: true },
    _filteredLibraries: { state: true },
  };
  static styles = css`
    .search-container {
      padding: 2vh 20vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1vh;
    }

    .search-container > * {
      border-radius: 10px;
    }

    #search-input {
      min-width: 30vw;
      padding: 5px 1vw;
      font-size: 16px;
      border: 2px solid rgb(47, 79, 79);
      transition: var(--trans);
    }

    #search-input:focus {
      outline: none;
      box-shadow: 10px 10px 15px #adadad, -10px -10px 15px #ffffff;
      transition: var(--trans);
    }

    datalist {
      display: block;
    }

    .search-container #search-btn {
      font-size: 24px;
      color: white;
      padding: 0.5vh 1vw;
      border: 5px solid rgb(47, 79, 79);
      background: linear-gradient(
        145deg,
        rgba(34, 55, 55, 1) 0%,
        rgba(47, 79, 79, 1) 35%,
        rgba(80, 133, 133, 1) 100%
      );
      box-shadow: 5px 5px 5px 2px rgb(46, 46, 46), -5px -5px 5px 2px #ffffff;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.data = [];
    this._filteredTags = [];
    this._filteredLibraries = [];
  }

  tags = [];
  libraries = [];

  render() {
    this.libraries = this.getLibraries();
    this.tags = this.getTags();
    console.log(this.data);

    return html`
      <div class="dashboard">
        <div
          class="search-container
        "
        >
          <input
            @input=${this.handleInput}
            @change=${this.handleSearch}
            id="search-input"
            list="datalist"
            name="datalist"
            placeholder="search by name or #tag"
          />
          <datalist id="datalist">
            ${this._filteredTags?.length
              ? this._filteredTags.map(
                  (tag) => html`<option value=${tag}></option>`
                )
              : null}
          </datalist>
        </div>
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

  handleInput() {
    this.input.value = this.input.value.replace("#", "");
    const inputWords = this.input.value.split(" ");

    let lastWord = inputWords[inputWords.length - 1];
    if (lastWord !== "") {
      this._filteredTags = this.tags.filter((tag) =>
        tag?.toLowerCase().replace("#", "").startsWith(lastWord)
      );
    }
    if (inputWords.length > 1) {
      for (let i = 0; i < this._filteredTags.length; i++) {
        this._filteredTags[i] =
          inputWords.slice(0, -1).join().replaceAll(",", " ") +
          " " +
          this._filteredTags[i];
      }
    }
  }

  handleSearch() {
    let searchTerms = this.input.value.trim().split(" ");

    let filteredData = this.data.filter((item) => {
      let joinedTags = item.tags?.join() + item.name.toLowerCase();
      let formattedTags = joinedTags?.replaceAll(`,`, ` `);

      // check if every search term is present in either library name or library tag
      return searchTerms.every((term) =>
        formattedTags?.includes(term.toLowerCase())
      );
    });

    let extractedNames = filteredData.map(({ name }) => name);
    extractedNames.push("+");

    if (this.input.value !== "") {
      this._filteredLibraries = extractedNames;
    }
    //make input field loose focus so datalist isn't visible
    this.input.blur();
  }
}

{
  /* <ul class="list">
          ${this._filteredLibraries?.map(
            (library) => html`
              <li
                class="list-item"
                style="background-color: hsl(${Math.random() * 360}, ${50 +
                Math.random() * 50}%, ${10 + Math.random() * 40}%)"
                id=${this.libraries.indexOf(library) + 1}
                @click="${() =>
                  this.onClickHandler(this.libraries.indexOf(library))}"
                @dblclick="${(e) => {
                  e.preventDefault();
                }}"
              >
                <p>${library}</p>
              </li>
            `
          )}
        </ul>
        onClickHandler(index) {
    console.log(index);
    const clickEvent = new CustomEvent("click-emiter", {
      detail: {
        index: index,
      },
      bubbles: true,
      composed: true,
    });
    const dbClickEvent = new CustomEvent("dbclick-emiter", {
      detail: {
        index: index,
      },
      bubbles: true,
      composed: true,
    });
    this.click++;
    if (this.click === 1) {
      this.timer = setTimeout(() => {
        this.dispatchEvent(clickEvent);
        this.click = 0;
      }, 200);
    } else {
      clearTimeout(this.timer);
      this.dispatchEvent(dbClickEvent);
      this.click = 0;
    }
  } */
}
