import { itemRender } from "./inventory";
import { items } from "./states";

const initialRender = () => {
    itemRender(items);
};

export default initialRender;