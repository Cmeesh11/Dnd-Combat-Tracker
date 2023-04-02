// letibale declaration
let initialSubmit = document.querySelector("#initial-submit");
let monster = document.querySelector("#monster");
let hpVal = document.querySelector("#hp");
let init = document.querySelector("#init");
let number = document.querySelector("#number");
let monsterContainer = document.querySelector("#monster-container");
let main = document.querySelector("main");
let dragSrcEl;
// fetches monster hp from API
function getMonsterData() {
  return fetch("https://www.dnd5eapi.co/api/monsters/" + monster.value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

// Load the monster AND the stats onto page
function loadMonster(data) {
  const name = data.name;
  let monsterHp = data.hit_points;
  if (hpVal.value != "") {
    monsterHp = parseInt(hpVal.value);
  }
  if (number.value === "") {
    number.value = 1;
  }
  if (name == null || name == "" || name == undefined) {
    name = monster.input;
  }

  for (let i = 0; i < number.value; i++) {
    let hp = monsterHp;
    let container = document.createElement("div");
    let nameDiv = document.createElement("div");
    let hpDiv = document.createElement("div");
    let deleteBut = document.createElement("button");
    let damage = document.createElement("input");
    let damageLabel = document.createElement("label");
    let damageDiv = document.createElement("div");
    let damageForm = document.createElement("form");
    let heal = document.createElement("input");
    let healLabel = document.createElement("label");
    let healForm = document.createElement("form");
    let healDiv = document.createElement("div");
    let inputDiv = document.createElement("div");

    container.setAttribute(
      "class",
      "text-bg-dark p-3 fs-2 mt-5 row rounded-pill move"
    );

    container.setAttribute("draggable", "true");

    deleteBut.setAttribute("class", "btn btn-danger col-1")
    inputDiv.setAttribute("class", "row col-6")
    damage.setAttribute("class", "col-3");
    damage.setAttribute("type", "number")
    damageLabel.setAttribute("for", "damage")
    damageLabel.setAttribute("class", "text-danger")
    damageDiv.setAttribute("class", "col-6")
    damageForm.setAttribute("class", "damage-form");
    heal.setAttribute("type", "number")
    heal.setAttribute("class", "col-3");
    healLabel.setAttribute("for", "heal")
    healLabel.setAttribute("class", "text-success");
    healDiv.setAttribute("class", "col-6");
    healForm.setAttribute("class", "heal-form");
    
    nameDiv.setAttribute("class", "col-3");
    hpDiv.setAttribute("class", "col-2");


    nameDiv.textContent = name + " " + (i + 1);
    hpDiv.textContent = "HP: " + hp;
    deleteBut.textContent = "Delete";
    damageLabel.textContent = "Damage:";
    healLabel.textContent = "Heal:"

    monsterContainer.appendChild(container);
    container.appendChild(nameDiv);
    container.appendChild(hpDiv);
    container.appendChild(inputDiv);
    damageForm.appendChild(damageLabel);
    damageForm.appendChild(damage);
    damageDiv.appendChild(damageForm);
    inputDiv.appendChild(damageDiv);
    healForm.appendChild(healLabel);
    healForm.appendChild(heal);
    healDiv.appendChild(healForm);
    inputDiv.appendChild(healDiv);
    container.appendChild(deleteBut);

    healForm.addEventListener("submit", function(event) {
      event.preventDefault();
      if (event.target.className === "heal-form") {
      hp += parseInt(heal.value) || 0;
      console.log(hp);
      hpDiv.textContent = "HP: " + hp;
      }
    })

    damageForm.addEventListener("submit", function(event) {
      event.preventDefault();
      if (event.target.className === "damage-form") {
      console.log(event.target);
      hp -= parseInt(damage.value);
      if (hp <= 0) {
        return hpDiv.textContent = "Dead";
      }
      return hpDiv.textContent = "HP: " + hp;
      }
    })

    container.addEventListener("dragstart", function(e) {
      this.style.opacity = "0.4";
      dragSrcEl = this;
  
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", this.innerHTML);
    })
    container.addEventListener("dragend", function(e) {
      this.style.opacity = "1";
      container.classList.remove("over")
    })
    container.addEventListener("drop", handleDrop);
    container.addEventListener("dragover", function(e) {
      e.preventDefault();
      return false;
    })
    container.addEventListener("dragenter", function(e) {
      this.classList.add("over");
    })
    container.addEventListener("dragleave", function(e) {
      this.classList.remove("over");
    })
  }
}
function loadPlayer() {
  let name = monster.value;
  let hp = hpVal.value;
  if (number.value === "") {
    number.value = 1;
  }
  for (let i = 0; i < number.value; i++) {
    let container = document.createElement("div");
    let nameDiv = document.createElement("div");
    let hpDiv = document.createElement("div");
    let deleteBut = document.createElement("button");
    let damage = document.createElement("input");
    let damageLabel = document.createElement("label");
    let damageDiv = document.createElement("div");
    let damageForm = document.createElement("form");
    let heal = document.createElement("input");
    let healLabel = document.createElement("label");
    let healForm = document.createElement("form");
    let healDiv = document.createElement("div");
    let inputDiv = document.createElement("div");

    container.setAttribute(
      "class",
      "text-bg-dark p-3 fs-2 mt-5 row rounded-pill move"
    );

    container.setAttribute("draggable", "true");

    deleteBut.setAttribute("class", "btn btn-danger col-1")
    inputDiv.setAttribute("class", "row col-6")
    damage.setAttribute("class", "col-3");
    damage.setAttribute("type", "number")
    damageLabel.setAttribute("for", "damage")
    damageLabel.setAttribute("class", "text-danger")
    damageDiv.setAttribute("class", "col-6")
    damageForm.setAttribute("class", "damage-form");
    heal.setAttribute("type", "number")
    heal.setAttribute("class", "col-3");
    healLabel.setAttribute("for", "heal")
    healLabel.setAttribute("class", "text-success");
    healForm.setAttribute("class", "heal-form");
    healDiv.setAttribute("class", "col-6");
    nameDiv.setAttribute("class", "col-3");
    hpDiv.setAttribute("class", "col-2");

    if (i === 0) {
      nameDiv.textContent = name;
    } else if (i > 0) {
      nameDiv.textContent = name + " " + (i + 1);
    }
    hpDiv.textContent = "HP: " + hp;
    deleteBut.textContent = "Delete";
    damageLabel.textContent = "Damage:";
    healLabel.textContent = "Heal:"

    monsterContainer.appendChild(container);
    container.appendChild(nameDiv);
    container.appendChild(hpDiv);
    container.appendChild(inputDiv);
    damageForm.appendChild(damageLabel);
    damageForm.appendChild(damage);
    damageDiv.appendChild(damageForm);
    inputDiv.appendChild(damageDiv);
    healForm.appendChild(healLabel);
    healForm.appendChild(heal);
    healDiv.appendChild(healForm);
    inputDiv.appendChild(healDiv);
    container.appendChild(deleteBut);

  healForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (event.target.className === "heal-form") {
    hp += parseInt(heal.value);
    hpDiv.textContent = "HP: " + hp;
    }
  })

  damageForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (event.target.className === "damage-form") {
    hp -= parseInt(damage.value);
    if (hp <= 0) {
      return hpDiv.textContent = "Dead";
    }
    hpDiv.textContent = "HP: " + hp;
    }
  })

  container.addEventListener("dragstart", function(e) {
    this.style.opacity = "0.4";
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  })
  container.addEventListener("dragend", function(e) {
    this.style.opacity = "1";
    container.classList.remove("over")
  })
  container.addEventListener("drop", handleDrop);
  container.addEventListener("dragover", function(e) {
    e.preventDefault();
    return false;
  })
  container.addEventListener("dragenter", function(e) {
    this.classList.add("over");
  })
  container.addEventListener("dragleave", function(e) {
    this.classList.remove("over");
  })
}
}

function handleDrop(e) {
  e.stopPropagation();

  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

// Listen for form submit
initialSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  if (monster.value == "" || monster.value == null) {
    alert("Please enter a Player/Creature name");
    return;
  }
  getMonsterData()
    .then((result) => {
      loadMonster(result);
    })
    .catch(() => {
      loadPlayer();
    }).then(() => {
      monster.value = "";
      hpVal.value = "";
      number.value = "";
    })
  
});


main.addEventListener("click", function(event) {
  let element = event.target;
  if (element.textContent === "Delete") {
    element.parentElement.setAttribute("class", "");
    element.parentElement.textContent = "";
  }
})
