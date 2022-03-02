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
    editable: { type: Boolean },
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

    [contenteditable="true"] {
      outline: 1px solid grey;
    }

    [contenteditable="true"]:empty:before {
      content: attr(placeholder);
      color: grey;
    }

    a p,
    h2 {
      padding: 1vh;
      border-radius: 5px;
    }
  `;

  constructor() {
    super();
    this.data = {};
    this.editable = true;
  }
  docsLabel = "Official Docs";

  render() {
    return html`
      <h2
        @focus="${(e) => this.focus(e)}"
        contenteditable=${this.editable}
        placeholder="Please insert a name..."
        .innerHTML="${this.data.name}"
      ></h2>
      <div class="buttons">
        <button
          @click="${() => (this.editable = !this.editable)}"
          class=${this.editable ? "button-active" : ""}
        >
          Edit
        </button>
        <button @click="${this.save}">Save</button>
      </div>
      <a target="_blank" href="${this.setHref()}"
        ><p
          @focus="${(e) => this.focus(e)}"
          contenteditable=${this.editable}
          placeholder="Insert link..."
          .innerHTML="${this.docsLabel}"
        ></p
      ></a>
      <text-field
        id="desc"
        .editable=${this.editable}
        .data=${this.data.description}
        title="Description"
      ></text-field>
      <text-field
        id="install"
        .editable=${this.editable}
        .data=${this.data.installation}
        title="Installation"
      ></text-field>
      <code-snippet
        id="install-cs"
        .editable=${this.editable}
        .data=${this.data.installSnippet}
      ></code-snippet>
      <text-field
        id="implementation"
        .editable=${this.editable}
        .data=${this.data.implementation}
        title="Implementation"
      ></text-field>
      <code-snippet
        id="implementation-cs"
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

  // aux methods for rendering

  // removes href from anchor tag so that user can input url
  setHref() {
    if (this.data.name === "+" || this.editable) {
      this.link?.removeAttribute("href");
    } else return this.data.documentation;
  }
  //makes sure that anchor tag's child paragraph is displaying
  //correct text and determines correct url destination
  updated() {
    this.linkParagraph.innerHTML = this.docsLabel;
    this.setHref();
  }

  // getters

  get name() {
    return this.renderRoot.querySelector("h2");
  }

  get link() {
    return this.renderRoot.querySelector("a");
  }

  get linkParagraph() {
    return this.renderRoot.querySelector("p");
  }

  get description() {
    return this.renderRoot.querySelector("#desc").renderRoot.querySelector("p");
  }
  get install() {
    return this.renderRoot
      .querySelector("#install")
      .renderRoot.querySelector("p");
  }
  get installCs() {
    return this.renderRoot
      .querySelector("#install-cs")
      .renderRoot.querySelector("textarea");
  }
  get implementation() {
    return this.renderRoot
      .querySelector("#implementation")
      .renderRoot.querySelector("p");
  }
  get implementationCs() {
    return this.renderRoot
      .querySelector("#implementation-cs")
      .renderRoot.querySelector("textarea");
  }
  get addition() {
    return this.renderRoot
      .querySelector("#addition")
      .renderRoot.querySelector("p");
  }

  // this is how I get values to be saved and emmited
  save() {
    if (this.data.name !== "+") {
      this.editable = false;
    }
    //check if library name is entered

    if (this.name.innerHTML === "" || this.name.innerHTML === "+") {
      this.editable = true;
      this.name.innerHTML = "";
      return;
    }

    //prepare data to be emmited
    const data = {
      name: this.name.innerHTML,
      documentation: this.getHrefFromParagraph()
        ? this.linkParagraph.innerHTML
        : this.data.documentation,
      description: this.description.innerHTML,
      installation: this.install.innerHTML,
      installSnippet: this.installCs.value,
      implementation: this.implementation.innerHTML,
      implementationSnippet: this.implementationCs.value,
      additional: this.addition.innerHTML,
    };
    let event = new CustomEvent("save-emiter", {
      detail: {
        data: data,
      },
      bubbles: true,
      composed: true,
    });
    // emmit
    this.dispatchEvent(event);
    //return values to default if new note is added
    if (this.data.name === "+") {
      this.name.innerHTML = "";
      this.linkParagraph.innerHTML = "";
      this.installCs.value = "";
      this.install.innerHTML = "";
      this.implementation.innerHTML = "";
      this.implementationCs.value = "";
      this.addition.innerHTML = "";
      this.description.innerHTML = "";
    }
  }

  // auxiliary methods

  focus(e) {
    e.target.innerHTML = "";
  }
  getHrefFromParagraph() {
    if (this.linkParagraph.innerHTML === this.docsLabel) {
      return false;
    } else return true;
  }
}
