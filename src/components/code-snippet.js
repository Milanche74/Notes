import { LitElement, html, css } from "lit";

export class CodeSnippet extends LitElement {
  static properties = {
    data: { type: String },
    editable: {},
  };
  static styles = css`
    textarea {
      resize: none;
      border-radius: 5px;
      padding: 0.5vh;
    }
    textarea[disabled] {
      color: black;
    }
  `;
  constructor() {
    super(), (this.data = ""), (this.editable = false);
  }

  render() {
    const textarea = html`
      <textarea
        ?disabled=${!this.editable}
        .innerHTML=${this.formatString(this.data)}
        @input=${this.saveValue}
        cols="80"
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
    this.textarea.value = this.textarea.innerHTML;
  }

  //   saveValue(event) {
  //     console.log(this.renderRoot.querySelector('textarea'))
  //     const textarea = event.target;
  //     console.log(JSON.stringify(textarea.innerHTML));
  //   }
  formatString(str) {
    let addIndent = "" + str;
    let formatted = addIndent.replaceAll(`\n`, ` &#13;`);

    return formatted;
  }
  calculateRows(data) {
    if (data !== "") {
      let numberOfLines = data.split(`\n`);
      if (numberOfLines.length > 40) {
        return 40;
      } else return numberOfLines.length;
    } else return 3
  }
}
