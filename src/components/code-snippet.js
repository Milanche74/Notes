import { LitElement, html, css } from "lit";

export class CodeSnippet extends LitElement {
  static properties = {
    data: { type: String },
    editable: {},
  };
  static styles = css`
    textarea {
      font-size: 16px;
      resize: none;
      border-radius: 5px;
      padding: 1vh;
      border: 3px solid #f0f0f0;
      background: linear-gradient(145deg, #e6e6e6, #ededed);
      box-shadow: var(--bs-concave);
      transition: var(--trans);
    }

    textarea:focus {
      box-shadow: var(--bs-concave-focus);
      outline: none;
    }

    textarea[disabled] {
      color: black;
      box-shadow: inset 6px 6px 12px #cacaca, inset -6px -6px 12px #ffffff;
    }
  `;
  constructor() {
    super(), (this.data = ""), (this.editable = false);
  }

  render() {
    const textarea = html`
      <textarea
        ?disabled=${!this.editable}
        cols="60"
        rows="${this.calculateRows(this.data)}"
      ></textarea>
    `;

    return html`${textarea}`;
  }

  get textarea() {
    return this.renderRoot.querySelector("textarea");
  }
  // made sure that textarea displays correct value when updated; otherwise it woudn't be done
  updated() {
    this.textarea.value = this.data;
  }

  calculateRows(data) {
    if (data !== "") {
      let numberOfLines = data?.split(`\n`);

      if (numberOfLines?.length > 40) {
        return 40;
      } else return numberOfLines?.length + 1;
    } else return 3;
  }
}
