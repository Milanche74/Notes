import { LitElement, html, css } from "lit";

export class InputField extends LitElement {
  static properties = {
    tags: {
      converter: (attrValue) => {
        if (attrValue) return JSON.parse(attrValue);
      },
    },
    placeholder: { type: String },
    _filteredSuggestions: { state: true },
    clearInput: {}
  };

  static styles = css`
    .search-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: var(--input-align-items);
      padding: var(--input-padding);
      gap: 1vh;
    }

    .search-container > * {
      border-radius: 10px;
    }

    #search-input {
      min-width: 30vw;
      padding: 5px 1vw;
      font-size: 16px;
      border: 2px solid rgb(47, 79, 79);
      transition: var(--trans);
    }

    #search-input:focus {
      outline: none;
      box-shadow: 10px 10px 15px #adadad, -10px -10px 15px #ffffff;
      transition: var(--trans);
    }

    .search-container #search-btn {
      font-size: 24px;
      color: white;
      padding: 0.5vh 1vw;
      border: 5px solid rgb(47, 79, 79);
      background: linear-gradient(
        145deg,
        rgba(34, 55, 55, 1) 0%,
        rgba(47, 79, 79, 1) 35%,
        rgba(80, 133, 133, 1) 100%
      );
      box-shadow: 5px 5px 5px 2px rgb(46, 46, 46), -5px -5px 5px 2px #ffffff;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.tags = [];
    this.placeholder = "";
    this._filteredSuggestions = [];
    this.clearInput = false;
  }

  render() {
    return html`
      <div
        class="search-container
        "
      >
        <input
          @input=${this.handleInput}
          @change=${this.handleSelect}
          id="search-input"
          list="datalist"
          name="datalist"
          placeholder=${this.placeholder}
        />
        <datalist id="datalist">
          ${this._filteredSuggestions?.length
            ? this._filteredSuggestions.map(
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
    this.input.value = this.input.value;
    const inputWords = this.input.value.split(" ");

    let lastWord = inputWords[inputWords.length - 1].toLowerCase().replace("#", "");
    if (lastWord !== "") {
      // primary checks terms that start with user input
      let primarySuggestions = this.tags.filter((tag) =>
        tag?.toLowerCase().replace("#", "").startsWith(lastWord)
      );
      // secondary checks terms that include input
      let secondarySuggestions = this.tags.filter((tag) =>
        tag?.toLowerCase().replace("#", "").includes(lastWord)
      );
      // concatinate...
      let suggestions = primarySuggestions.concat(secondarySuggestions);
      // and return unique values
      this._filteredSuggestions = [...new Set(suggestions)].slice(0, 10);
      console.log(this._filteredSuggestions)
    }
    if (inputWords.length > 1) {
      const firstWords = inputWords.slice(0, - 1).join(' ');
  
      const filteredSuggestionsForPreviousWords =  this._filteredSuggestions.filter(sugg => !firstWords.includes(sugg));
      console.log(firstWords, filteredSuggestionsForPreviousWords)

  
      for (let i = 0; i < filteredSuggestionsForPreviousWords.length; i++) {
        this._filteredSuggestions[i] =
          inputWords.slice(0, -1).join(' ') +
          " " +
          filteredSuggestionsForPreviousWords[i];
      }
    }
  }

  handleSelect() {
    let event = new CustomEvent("search-emitter", {
      detail: {
        inputValue: this.input.value,
      },
      composed: true,
      bubbles: false,
    });
    this.dispatchEvent(event);

    this.input.blur();

    if(this.clearInput) {
      this.input.value = '';
    }

    this._filteredSuggestions = [];
  }
}
