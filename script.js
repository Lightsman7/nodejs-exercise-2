const submitBtn = document.querySelector(".submit");
const inputName = document.querySelector("#name");
const inputPirce = document.querySelector("#price");
const menuContainer = document.querySelector(".menu-container");

const deleteMenu = async (id) => {
  const url = `http://localhost:3000/menu?id=${id}`;
  const respone = await fetch(url, {
    method: "DELETE",
  });
  const deleteMenu = await respone.json();
  console.log(deleteMenu);

  createUi(deleteMenu)

};

const createMenu = async () => {
  const menu = inputName.value;
  const price = inputPirce.value;

  const menuItem = {
    menu: menu,
    price: price,
  };

  const respone = await fetch("http://localhost:3000/menu", {
    method: "POST",
    body: JSON.stringify(menuItem),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const menus = await respone.json();
  createUi(menus);
  
};



const createUi = (menus) => {
    const menuDiv = document.createElement("div");
  const ulTag = document.createElement("ul");

  menus.forEach((menu) => {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.style.margin = "20px";
    deleteBtn.id = menu.id;
    deleteBtn.addEventListener("click", () => deleteMenu(menu.id));

    li.textContent = menu.menu;
    ulTag.appendChild(li);
    ulTag.appendChild(deleteBtn);
  });
  menuDiv.append(ulTag);
  menuContainer.innerHTML = "";

  menuContainer.append(menuDiv);

}
submitBtn.addEventListener("click", createMenu);
