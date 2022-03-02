import { LitElement, html, css } from "lit";

export class Dashboard extends LitElement {
  static properties = {
    libraries: {
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
    }

    .list-item {
      font-size: 36px;
      color: white;
      padding: 1vh 2vw;
      border-radius: 10px;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.libraries = [];
  }

  render() {
    return html`
      <ul class="list">
        ${this.libraries?.map(
          (library) => html`
            <li
              class="list-item"
              style="background-color: hsl(${Math.random() * 360}, ${50+Math.random() * 50}%, ${10+(Math.random() * 40)}%)"
              id=${this.libraries.indexOf(library) + 1}
              @click="${() =>
                this.onClickHandler(this.libraries.indexOf(library))}"
            >
              ${library}
            </li>
          `
        )}
      </ul>
    `;
  }

  onClickHandler(index) {
    let event = new CustomEvent("index-emiter", {
      detail: {
        index: index,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }
}
