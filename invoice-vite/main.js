import Invoice from './src/Invoice';
import './style.css'

const invoice = new Invoice();

invoice.init();

const printDateTime = document.getElementById("printDateTime");
const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
const now = new Date().toLocaleString("en-US", options);
printDateTime.textContent = `${now}`;