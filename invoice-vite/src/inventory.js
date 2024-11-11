import { v4 as uuidv4 } from "uuid";

import {
  itemCardTemplate,
  itemList,
  itemSelect,
  newItemName,
  newItemPrice,
} from "./selectors";
import { items } from "./states";

export const addItemBtnHandler = (event) => {
  event.preventDefault();

  const price = newItemPrice.valueAsNumber;
  if (!newItemName.value || isNaN(price) || price <= 0) {
    alert("Please enter a valid item name and a positive price.");
    return;
  }

  const createId = uuidv4();
  itemList.append(
    createItemCard(createId, newItemName.value, newItemPrice.valueAsNumber)
  );
  itemSelect.append(
    new Option(
      `${newItemName.value} - ${newItemPrice.valueAsNumber}`,
      createId
    )
  );
  items.push({
    id: createId,
    name: newItemName.value,
    price: newItemPrice.valueAsNumber,
  });
  console.log(items);
  newItemName.value = "";
  newItemPrice.value = "";
};

export const removeItemHandler = (itemId) => {
  // Remove the item from the `items` array
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1); // Remove item from the array
    console.log(`Item removed`, items);
  }

  // Remove the item from the DOM
  const itemCard = document.getElementById(itemId); // Assuming item cards have ids corresponding to their item ids
  if (itemCard) {
    itemCard.remove(); // Remove item card from the list
  }

  // Optionally remove the item from the dropdown select list
  const optionToRemove = itemSelect.querySelector(`option[value="${itemId}"]`);
  if (optionToRemove) {
    optionToRemove.remove();
  }
};

export const itemRender = (items) => {
  items.forEach(({ id, name, price }) => {
    itemList.append(createItemCard(id, name, price));
    itemSelect.append(new Option(`${name} - ${price} MMK`, id));
  });
};

export const createItemCard = (id, name, price) => {
  const itemCard = itemCardTemplate.content.cloneNode(true);
  const currentItemCard = itemCard.querySelector(".item-card");
  const itemName = itemCard.querySelector(".item-name");
  const itemPrice = itemCard.querySelector(".item-price");
  const removeItemBtn = itemCard.querySelector(".removeItemBtn");

  currentItemCard.id = id;
  itemName.innerText = name;
  itemPrice.innerText = price;

  removeItemBtn.addEventListener("click", () => removeItemHandler(id));

  return itemCard;
};
