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
    // const formatted = this.data.replaceAll(`^`, ` &#13;- `);
    // const toShow=formatted.split('&#13; &#10;')
    // console.log(toShow)

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

  saveValue(event) {
    const textarea = event.target;
    console.log(JSON.stringify(textarea.value));
  }
  formatString(str) {
    let addIndent = "" + str;
    let formatted = addIndent.replaceAll(`^`, ` &#13;  `);

    return formatted;
  }
  calculateRows(data) {
    let numberOfLines = data.split("^");
    if (numberOfLines.length > 40) {
      return 40;
    } else return numberOfLines.length;
  }
}
