import { popupBox } from "./selectors";

export const manageItemBtnHandler = () => {
  popupBox.classList.remove("hidden");
};

export const closePopupHandler = () => {
  popupBox.classList.add("hidden");
};

export const previewHandler = () => {
  console.log("Preview Button Clicked");
  window.print();
};
