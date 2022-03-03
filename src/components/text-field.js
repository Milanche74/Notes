import { LitElement, html, css } from "lit";

export class TextField extends LitElement {
  static properties = {
    data: { type: String },
    title: { type: String },
    editable: {},
  };
  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      transition: var(--trans);
    }

    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1vh;
      margin-bottom: 0vh;
    }

    h3 {
      font-size: 30px;
    }

    p {
      font-size: 18px;
      border: none;
      overflow: auto;
      align-self: flex-start;
      min-height: 18px;
      padding: 1vh;
      border-radius: 5px;
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
  `;

  constructor() {
    super(), (this.data = ""), (this.title = ""), (this.editable = true);
  }

  render() {
    return html`
      <h3>${this.title}</h3>
      <p
        placeholder="Edit...  "
        contenteditable="${this.editable}"
        class="paragraph neumorph-inset"
        .innerHTML=${this.data}
      ></p>
    `;
  }

  logInput(e) {
    const parag = e.target;
  }
}
