import { LitElement, html, css } from "lit";
import "./code-snippet.js";
import "./text-field.js";

export class LibraryDetail extends LitElement {
  static properties = {
    data: {
      converter: (attrValue) => {
        if (attrValue) return JSON.parse(attrValue);
      },
    },
    editable: {},
  };

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      display: flex;
      flex-direction: column;
      padding: 0 5vw;
      position: relative;
      gap: 2vh;
    }

    h2 {
      font-size: 48px;
      margin-block: 2vh;
    }

    a {
      font-size: 30px;
      font-weight: bold;
      text-decoration: none;
      color: grey;
      width: max-content;
    }
    .buttons {
      display: flex;
      gap: 2vw;
    }
    button {
      width: max-content;
      font-size: 24px;
      padding: 1vh 1vw;
      border-radius: 10px;
      border: none;
      color: white;
      margin-bottom: 1vh;
      cursor: pointer;
      background-color: rgb(47, 79, 79);
    }
    .button-active {
      background-color: grey;
    }
  `;

  constructor() {
    super();
    this.data = {};
    this.editable = false;
  }

  render() {
    console.log(this.data);
    return html`
      <h2 contenteditable=${this.editable}>${this.data.name}</h2>
      <div class="buttons">
        <button
          @click="${this.toggleEditable}"
          class=${this.editable ? "button-active" : ""}
        >
          Edit
        </button>
        <button @click="${this.save}">Save</button>
      </div>
      <a target="_blank" href="${this.data.documentation}">Official Docs</a>
      <text-field
        .editable=${this.editable}
        .data=${this.data.description}
        title="Description"
      ></text-field>
      <text-field
        .editable=${this.editable}
        .data=${this.data.installation}
        title="Installation"
      ></text-field>
      <code-snippet
        .editable=${this.editable}
        .data=${this.data.installSnippet}
      ></code-snippet>
      <text-field
        .editable=${this.editable}
        .data=${this.data.implementation}
        title="Implementation"
      ></text-field>
      <code-snippet
        .editable=${this.editable}
        .data=${this.data.implementationSnippet}
      ></code-snippet>
      <text-field
        .editable=${this.editable}
        .data=${this.data.additional}
        title="Additional notes"
        id="addition"
      ></text-field>
    `;
  }
  // this is how I get values to be saved
  save() {
    const textField = this.renderRoot.querySelector("#addition");
    const paragraph = textField.renderRoot.querySelector("p");
    console.log(paragraph.innerHTML);
  }
  toggleEditable() {
    this.editable = !this.editable;
  }
}
