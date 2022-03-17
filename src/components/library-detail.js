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
    tags: {
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
      transition: var(--trans);
    }

    :host {
      flex: 1;
      min-width: 620px;
      height: min-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2vh 1vw;
      position: relative;
      gap: 2vh;
      border-radius: 10px;
      border: 5px solid #f0f0f0;
      box-shadow: 15px 15px 20px #adadad, -15px -15px 20px #ffffff;
    }

    h2 {
      font-size: 48px;
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
      border: 5px solid rgb(47, 79, 79);
      background: linear-gradient(
        145deg,
        rgba(34, 55, 55, 1) 0%,
        rgba(47, 79, 79, 1) 35%,
        rgba(80, 133, 133, 1) 100%
      );
      box-shadow: 5px 5px 5px 2px rgb(46, 46, 46), -5px -5px 5px 2px #ffffff;
      transition: var(--trans);
    }

    .button-active {
      background-color: rgb(47, 79, 79);
      box-shadow: none;
      transition: var(--trans);
    }

    [contenteditable="true"] {
      outline: 3px solid #e6e6e6;
      background: linear-gradient(145deg, #e6e6e6, #ededed);
      box-shadow: var(--bs-concave);
    }

    [contenteditable="true"]:empty:before {
      content: attr(placeholder);
      color: grey;
    }

    [contenteditable="true"]:focus {
      box-shadow: var(--bs-concave-focus);
    }

    .additional-note-button {
      position: relative;
      margin-top: 2vh;
      transition: var(--trans);
    }

    .additional-note-button::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        145deg,
        rgba(17, 28, 28, 0.4) 0%,
        rgba(0, 0, 0, 0) 50%,
        rgba(17, 28, 28, 0.4) 100%
      );
    }

    .additional-note-button:hover:after {
      transform: scale(0);
    }

    a p,
    h2 {
      padding: 1vh;
      border-radius: 5px;
    }

    .no-display {
      display: none;
    }

    .tags-container {
    }

    .tags-list {
      display: flex;
      gap: 2vw;
      justify-content: space-around;
      width: max-content;
    }

    .tags-list li {
      list-style: none;
      font-weight: bold;
      font-size: 24px;
      padding: 0.5vh 0.5vw;
      border-radius: 10px;
      background-color: white;
      box-shadow: 0 0 5px white;
    }
  `;

  constructor() {
    super();
    this.data = {};
    this.tags = [];
    this.editable = false;
    this.addEventListener("input-emitter", (e) => {
      this.addTag(e.detail.inputValue);
    });
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

      <div class="tags-container">
        <style>
          input-field {
            --input-align-items: flex-start;
            --input-padding: 0;
          }
        </style>
        <input-field
          ?hidden=${!this.editable}
          placeholder="Add tag"
          .tags=${this.getTags()}
        ></input-field>
        <ul class="tags-list">
          ${this.data.tags?.map((tag) => {
            return html`<li>${tag}</li>`;
          })}
        </ul>
      </div>

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

      ${this.data?.additional?.map((addition, index) => {
        let textField =
          addition.textField !== undefined
            ? html`<text-field
                class="additional-text"
                .editable=${this.editable}
                .data=${addition.textField}
                title="#${index + 1}"
                id="addition-text-${index + 1}"
              ></text-field>`
            : null;
        let codeSnippet =
          addition.codeSnippet !== undefined
            ? html`<code-snippet
                class="additional-code"
                .editable=${this.editable}
                .data=${addition.codeSnippet}
                id="addition-code-${index + 1}"
              ></code-snippet>`
            : null;
        return html`${textField}${codeSnippet}`;
      })}

      <button
        ?hidden=${!this.editable}
        class="additional-note-button"
        @click="${this.addAddition}"
      >
        Addition
      </button>
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

  addAddition() {
    if (this.editable === true) {
      this.data.additional.push({
        textField: "",
        codeSnippet: "",
      });
      this.requestUpdate();
    } else return null;
  }

  getTags() {
    //retrieves tags from data, flattens the nested array
    const tags = this.tags?.flat();
    //returns only unique values
    return [...new Set(tags)];
  }

  addTag(tag) {
    if (tag !== "") {
      tag = "#" + tag;
      this.data.tags.push(tag);
      this.requestUpdate();
    }
    console.log(this.data.tags);
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

  formatAdditionals() {
    // empty input value will be set to undefined so the element won't be rendered
    const handleEmptyInput = (input) => {
      if (input === "") {
        return undefined;
      } else return input;
    };

    const numOfAdditionals =
      this.renderRoot.querySelectorAll(".additional-text");
    let additionalsData = [];

    for (let i = 0; i < numOfAdditionals.length; i++) {
      let text = this.renderRoot
        .querySelector(`#addition-text-${i + 1}`)
        ?.renderRoot.querySelector("p");
      let code = this.renderRoot
        .querySelector(`#addition-code-${i + 1}`)
        ?.renderRoot.querySelector("textarea");

      additionalsData.push({
        textField: handleEmptyInput(text?.innerHTML),
        codeSnippet: handleEmptyInput(code?.value),
      });
    }

    return additionalsData;
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
      this.name.focus();

      return;
    }

    //prepare data to be emitted
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
      tags: this.data.tags,
      additional: this.formatAdditionals(),
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
      this.additional = [];
      this.description.innerHTML = "";
    }
  }

  // auxiliary methods

  focus(e) {
    if (e.target.innerHTML === "+" || e.target.innerHTML === "Official Docs") {
      e.target.innerHTML = "";
    }
  }
  getHrefFromParagraph() {
    if (this.linkParagraph.innerHTML === this.docsLabel) {
      return false;
    } else return true;
  }
}
