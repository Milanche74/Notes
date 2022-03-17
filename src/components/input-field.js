import { LitElement, html, css } from "lit";

export class InputField extends LitElement {
  static properties = {
    suggestions: {
      converter: (attrValue) => {
        if (attrValue) return JSON.parse(attrValue);
      },
    },
  };
  constructor() {
    super();
    this.suggestions = [];
  }

  render() {
    return html`
      <div
        class="search-container
        "
      >
        <input
          @input=${this.handleInput}
          @change=${this.handleSearch}
          id="search-input"
          list="datalist"
          name="datalist"
          placeholder="search by name or #tag"
        />
        <datalist id="datalist">
          ${this._filteredTags?.length
            ? this._filteredTags.map(
                (tag) => html`<option value=${tag}></option>`
              )
            : null}
        </datalist>
      </div>
    `;
  }

  get input() {
    return this.renderRoot.querySelector("#search-input");
  }

  handleInput() {
    this.input.value = this.input.value.replace("#", "");
    const inputWords = this.input.value.split(" ");

    let lastWord = inputWords[inputWords.length - 1];
    if (lastWord !== "") {
      this._filteredTags = this.tags.filter((tag) =>
        tag?.toLowerCase().replace("#", "").startsWith(lastWord)
      );
    }
    if (inputWords.length > 1) {
      for (let i = 0; i < this._filteredTags.length; i++) {
        this._filteredTags[i] =
          inputWords.slice(0, -1).join().replaceAll(",", " ") +
          " " +
          this._filteredTags[i];
      }
    }
  }

  handleSelect() {
    let event = new CustomEvent("input-emmitter", {
      detail: {
        inputValue: this.input.value,
      },
      composed: true,
      bubbles: false,
    });
    this.dispatchEvent(event);
  }
}
