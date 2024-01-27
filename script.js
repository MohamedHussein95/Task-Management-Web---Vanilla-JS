"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const storedLists = JSON.parse(localStorage.getItem("lists")) || [];
  const ul = document.querySelector("ul");
  const empty = document.getElementById("empty");

  function updateEmptyState() {
    empty.style.display = storedLists.length === 0 ? "block" : "none";
  }

  updateEmptyState();

  if (storedLists.length > 0) {
    for (const storedItem of storedLists) {
      const li = document.createElement("li");
      li.textContent = storedItem;
      if (ul.firstElementChild) {
        ul.firstChild.before(li);
      } else {
        ul.appendChild(li);
      }

      li.addEventListener("click", handleLiClick);
    }
  }

  const form = document.querySelector("form");
  const input = document.querySelector("input[type=text]");
  const error = document.getElementById("error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    error.textContent = "";

    if (!input.value.trim()) {
      return;
    }

    const lists = document.querySelectorAll("li");

    for (const listItem of lists) {
      if (listItem.textContent.trim() === input.value.trim()) {
        error.textContent = "Task already added!";
        input.value = "";
        return;
      }
    }

    const li = document.createElement("li");
    li.textContent = input.value;
    if (ul.firstElementChild) {
      ul.firstChild.before(li);
    } else {
      ul.appendChild(li);
    }

    input.value = "";

    li.addEventListener("click", handleLiClick);

    storedLists.push(li.textContent.trim());
    localStorage.setItem("lists", JSON.stringify(storedLists));

    updateEmptyState();
    console.log(storedLists);
  });

  function handleLiClick() {
    console.log("Li clicked:", this.textContent);
    this.remove();

    const updatedLists = Array.from(document.querySelectorAll("li")).map(
      (item) => item.textContent.trim()
    );

    if (updatedLists.length <= 0) {
      empty.style.display = "block";
    }

    storedLists.splice(storedLists.indexOf(this.textContent.trim()), 1);
    localStorage.setItem("lists", JSON.stringify(storedLists));

    console.log(updatedLists);
  }
});
