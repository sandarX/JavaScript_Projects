import {
  invoiceForm,
  invoiceRecord,
  invoiceRecordTemplate,
  netTotal,
  taxAmount,
  totalAmount,
} from "./selectors";
import { items } from "./states";
import { v4 as uuidv4 } from "uuid";

export const invoiceFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(invoiceForm);

  const currentItem = items.find(({ id }) => id == formData.get("item_select"));

  const isExistedRecord = document.querySelector(
    `[item-id='${currentItem.id}']`
  );

  if (isExistedRecord === null) {
    invoiceRecord.append(
      createInvoiceRecord(currentItem, formData.get("quantity"))
    );
  } else {
    updateRecordQuantity(
      isExistedRecord.getAttribute("row-id"),
      parseInt(formData.get("quantity"))
    );
  }

  invoiceForm.reset();
};

export const createInvoiceRecord = ({ id, name, price }, quantity) => {
  const recordRow = invoiceRecordTemplate.content.cloneNode(true);
  const recordItemName = recordRow.querySelector(".record-item-name");
  const recordItemPrice = recordRow.querySelector(".record-item-price");
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const recordCost = recordRow.querySelector(".record-cost");
  const currentRecordRow = recordRow.querySelector(".record-row");

  currentRecordRow.setAttribute("item-id", id);
  currentRecordRow.setAttribute("row-id", uuidv4());

  recordItemName.innerText = name;
  recordItemPrice.innerText = price;
  recordQuantity.innerText = quantity;
  const cost = (price * quantity).toFixed(2);
  recordCost.innerText = cost;

  return recordRow;
};

export const calculateTax = (amount, percentage = 10) =>
  (amount / 100) * percentage;

export const calculateRecordTotalAmount = () => {
  let total = 0;
  invoiceRecord
    .querySelectorAll(".record-cost")
    .forEach((el) => (total += parseFloat(el.innerText)));
  return parseFloat(total.toFixed(2));
};

export const removeRecord = (rowId) => {
  const isConfirmed = confirm(
    "Are you sure you want to delete? You won't be able to revert this!"
  );

  if (isConfirmed) {
    const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
    // console.log(currentRecordRow);
    if (currentRecordRow) {
      currentRecordRow.remove();
    }
  }
};

export const quantityAdd = (rowId) => {
  const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
  const recordItemPrice = currentRecordRow.querySelector(".record-item-price");
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordCost = currentRecordRow.querySelector(".record-cost");
  recordQuantity.innerText = parseInt(recordQuantity.innerText) + 1;
  recordCost.innerText = recordQuantity.innerText * recordItemPrice.innerText;
};

export const quantitySubtract = (rowId) => {
  const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
  const recordItemPrice = currentRecordRow.querySelector(".record-item-price");
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordCost = currentRecordRow.querySelector(".record-cost");
  if (recordQuantity.innerText > 1) {
    recordQuantity.innerText = parseInt(recordQuantity.innerText) - 1;
    recordCost.innerText = recordQuantity.innerText * recordItemPrice.innerText;
  }
};

export const updateRecordQuantity = (rowId, newQuantity) => {
  const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);

  const recordItemPrice = currentRecordRow.querySelector(".record-item-price");
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordCost = currentRecordRow.querySelector(".record-cost");

  if (newQuantity > 0 || recordQuantity.innerText > 1) {
    recordQuantity.innerText = parseInt(recordQuantity.innerText) + newQuantity;

    const cost = (
      parseInt(recordQuantity.innerText) * parseFloat(recordItemPrice.innerText)
    ).toFixed(2);
    recordCost.innerText = cost;
  }
};

export const invoiceRecordHandler = (event) => {
  if (event.target.classList.contains("invoiceRecord-remove")) {
    const currentRecordRow = event.target.closest(".record-row");
    removeRecord(currentRecordRow.getAttribute("row-id"));
  } else if (event.target.classList.contains("quantity-add")) {
    const currentRecordRow = event.target.closest(".record-row");
    updateRecordQuantity(currentRecordRow.getAttribute("row-id"), 1);
  } else if (event.target.classList.contains("quantity-sub")) {
    const currentRecordRow = event.target.closest(".record-row");
    updateRecordQuantity(currentRecordRow.getAttribute("row-id"), -1);
  }
};

export const invoiceRecordObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const updateTotal = () => {
    const total = calculateRecordTotalAmount();
    const tax = calculateTax(total);
    totalAmount.innerText = total.toFixed(2);
    taxAmount.innerText = tax.toFixed(2);
    netTotal.innerText = (total + tax).toFixed(2);
  };

  const observer = new MutationObserver(updateTotal);
  observer.observe(invoiceRecord, observerOptions);
  updateTotal();
  //   netTotal.innerText = (total + tax).toFixed(2); // Update the net total amount in the UI
};
