import { LitElement, html, css } from "lit";

export class LibraryLinks extends LitElement {
  static properties = {
    links: {
      converter: (attrValue) => {
        if (attrValue) return JSON.parse(attrValue);
      },
    },
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
    this.links = [];
  }

  click = 0;
  timer = null;

  render() {
    return html` <ul class="list">
      ${this.links?.map(
        (link) => html`
          <li
            class="list-item"
            style="background-color: hsl(${Math.random() * 360}, ${50 +
            Math.random() * 50}%, ${10 + Math.random() * 40}%)"
            @click="${() => this.onClickHandler(link)}"
            @dblclick="${(e) => {
              e.preventDefault();
            }}"
          >
            <p>${link}</p>
          </li>
        `
      )}
    </ul>`;
  }

  onClickHandler(libName) {
    const clickEvent = new CustomEvent("click-emiter", {
      detail: {
        libraryName: libName,
      },
      bubbles: true,
      composed: true,
    });
    const dbClickEvent = new CustomEvent("dbclick-emiter", {
      detail: {
        libraryName: libName,
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
  }
}

{
  /* <div class="search-container">
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
        </div> */
}
