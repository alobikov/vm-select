import { Select } from "./select/select";
import "./select/styles.scss";

const select = new Select("#select", {
  placeholder: "Please make your choice",
  data: [
    { id: "1", value: "Angular" },
    { id: "2", value: "React" },
    { id: "3", value: "Svelte" },
    { id: "4", value: "Ember" },
  ],
});

window.s = select;
