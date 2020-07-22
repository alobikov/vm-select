const getTemplate = (data, placeholder) => {
  const selectItems = data.map((item) => {
    return `<li class="select__item" data-id=${item.id} data-type="item">${item.value}</li>`;
  });
  console.log(selectItems.join(""));
  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
       <span data-type="value">${placeholder}</span>
       <i class="fa fa-chevron-down" data-type="arrow"></i>
     </div>
     <div class="select__dropdown">
       <ul class="select__list">
        ${selectItems.join("")}
       </ul>
     </div>
`;
};

export class Select {
  constructor(selector, options) {
    this.selectedId = null;
    this.options = options;
    this.$el = document.querySelector(selector);
    this.render();
    this.setup();
  }
  get isOpen() {
    return this.$el.classList.contains("open");
  }
  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(data, placeholder);
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type, id } = event.target.dataset;
    console.log(event.target);
    console.log(type);
    if (type === "input" || type === "value" || type === "arrow") {
      this.toggle();
    } else if (type === "item") {
      console.log({ id });
      this.select(id);
    } else if (type === "backdrop") {
      this.close();
    }
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  select(id) {
    // first remove previous selection if any
    this.$el
      .querySelector(`[data-id="${this.selectedId}"]`)
      ?.classList.remove("selected");
    this.selectedId = id;
    this.$value.textContent = this.current.value;
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected");
    this.close();
  }

  open() {
    this.$el.classList.add("open");
    this.$arrow.classList.remove("fa-chevron-down");
    this.$arrow.classList.add("fa-chevron-up");
  }

  close() {
    this.$el.classList.remove("open");
    this.$arrow.classList.add("fa-chevron-down");
    this.$arrow.classList.remove("fa-chevron-up");
  }
  destroy() {
    this.$el.removeEventListener("click", this.clickHandler);
    this.$el.innerHTML = "";
  }
}
