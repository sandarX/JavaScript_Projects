import initialRender from "./initialRender";
import listener from "./listener";
import observer from "./observer";

class Invoice {
    init() {
        console.log('Invoice App is running');
        listener();
        initialRender();
        observer();
    }
}

export default Invoice;