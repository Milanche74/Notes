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
      gap: 2vh;
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

    p, h3 {
      max-width: 640px;
      padding: 1vh;
      border-radius: 5px;
      transition: all ease-out .3s;
    }
  `;

  constructor() {
    super(), (this.data = ""), (this.title = ""), (this.editable = true);
  }

  render() {
    console.log(this.title)

    return html`
      ${
        this.title !== undefined ?

        html`
          <h3
            contenteditable="${this.editable}"
            placeholder="Edit header...  "
          >${this.title}</h3>
        ` : null
      }
      
      ${
        this.data !== undefined ?

        html`
          <p
            placeholder="Edit...  "
            contenteditable="${this.editable}"
            class="paragraph neumorph-inset"
            .innerHTML=${this.data}
          ></p>
        ` : null
      }
    `;
  }

  // logInput(e) {
  //   const parag = e.target;
  // }
}
