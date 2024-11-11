import { closePopupHandler, manageItemBtnHandler, previewHandler } from "./handlers";
import { addItemBtnHandler } from "./inventory";
import { invoiceFormHandler, invoiceRecordHandler } from "./record";
import {
  addItemBtn,
  closePopup,
  invoiceForm,
  invoiceRecord,
  manageItemBtn,
  previewBtn,
} from "./selectors";

const listener = () => {
  manageItemBtn.addEventListener("click", manageItemBtnHandler);
  closePopup.addEventListener("click", closePopupHandler);
  addItemBtn.addEventListener("click", addItemBtnHandler); // Make sure this is properly set
  invoiceForm.addEventListener("submit", invoiceFormHandler);
  invoiceRecord.addEventListener("click", invoiceRecordHandler);
  previewBtn.addEventListener("click", previewHandler);
};

export default listener;
