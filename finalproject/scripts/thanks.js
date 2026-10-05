import { initNav } from "./nav.js";

initNav();

// Shows the values the visitor submitted in the contact form (sent in the URL).
const params = new URLSearchParams(window.location.search);
const fields = [
  ["name", "Name"],
  ["email", "Email"],
  ["topic", "Topic"],
  ["symbol", "Symbol suggestion"],
  ["message", "Message"]
];

const list = document.querySelector("#submission");
const received = fields.filter(([key]) => params.get(key));

if (received.length === 0) {
  list.insertAdjacentHTML(
    "beforebegin",
    `<p class="error">No form data was received. Please use the contact form on the Learn page.</p>`
  );
} else {
  received.forEach(([key, label]) => {
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    detail.textContent = params.get(key);
    list.append(term, detail);
  });
}
