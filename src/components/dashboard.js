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
    .list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      gap: 2vh;
      padding: 2vh 5vw;
      border-bottom: 2px solid rgb(47, 79, 79);
      margin: 0;
      background-color: #f0f0f0;
    }

    .list-item {
      position: relative;
      font-size: 36px;
      color: white;
      padding: 1vh 2vw;
      border-radius: 10px;
      border: 5px solid #f0f0f0;
      cursor: pointer;
      box-shadow: 10px 10px 15px #929292, -10px -10px 15px #ffffff;
      transition: var(--trans);
    }

    .list-item p {
      position: relative;
      padding: 0;
      margin: 0;
      z-index: 10;
    }

    .list-item::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(
        145deg,
        rgba(17, 28, 28, 0.3) 0%,
        rgba(0, 0, 0, 0) 50%,
        rgba(255, 255, 255, 0.3) 100%
      );
      z-index: 5;
      border-radius: 5px;
    }

    .list-item:hover {
      box-shadow: 10px 10px 20px #696969, -10px -10px 20px #ffffff;
    }
  `;

  constructor() {
    super();
    this.data = [];
    this._filteredTags = [];
    this._filteredLibraries = [];
  }
  click = 0;
  timer = null;
  tags = [];
  libraries = [];

  render() {
    this.tags = this.getTags();
    this.libraries = this.getLibraries();

    return html`
      <div class="dashboard">
        <div class="search-container">
          <input @input=${this.handleInput} id="search-input" />
          <ul class="tags">
            ${this._filteredTags.length
              ? this._filteredTags.map(
                  (tag) =>
                    html`<li
                      class="tag"
                      @click=${() => this.handleSelection(tag)}
                    >
                      ${tag}
                    </li>`
                )
              : null}
          </ul>
          <button @click=${this.handleSearch}>Search</button>
        </div>
        <library-links .links=${this._filteredLibraries}></library-links>
      </div>
    `;
  }

  get input() {
    return this.renderRoot.querySelector("#search-input");
  }

  getTags() {
    //retrieves tags from data and flattens the nested array
    const tags = this.data?.map(({ tags }) => tags).flat();

    //returns only unique values
    return [...new Set(tags)];
  }

  getLibraries() {
    const libraries = this.data?.map(({ name }) => name);
    return libraries;
  }

  handleInput() {
    const inputWords = this.input.value.split(" ");
    let lastWord = inputWords[inputWords.length - 1];

    if (lastWord !== "") {
      this._filteredTags = this.tags.filter((tag) => tag?.includes(lastWord));
    }
  }

  handleSelection(tag) {
    const inputWords = this.input.value
      .split(" ")
      .filter((word) => this.tags.includes(word));
    let formattedInput = inputWords.join(" ");
    let inputValue = `${formattedInput} ${tag}`;

    this.input.value = inputValue.trim();

    this._filteredTags = [];
  }

  handleSearch() {
    let searchTerms = this.input.value.trim().split(" ");

    let filteredData = this.data.filter((item) => {
      let joinedTags = item.tags?.join();
      let ex = joinedTags?.replaceAll(`,`, ` `);

      return searchTerms.every((term) => ex?.includes(term));
    });

    let extractedNames = filteredData.map(({ name }) => name);
    this._filteredLibraries = extractedNames;
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
