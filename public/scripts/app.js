import {Binar} from "./binar.js";
import {Car} from "./car.js";

export class App {
  constructor() {
    this.carContainerElement = document.getElementById("cars-container");
    this.form = document.forms["car-search-form"];
  }

  async init() {
    await this.load();
    // Register click listener
    this.form.onsubmit = this.run;
  }

  run = (event) => {
    event.preventDefault();
    let messages = [];
    const elements = this.form.elements;

    Array.from(elements).forEach((element, index) => {
      if (element.type === 'submit' || element.type === 'button') {
        console.log(`Skipped: ${element.type} at index ${index}`);
        return
      }
      console.log(`Index: ${index}, Element Type: ${element.type}, Element Name: ${element.name}`);
      const inputGroup = element.closest('[role="wrapper"]');
      // console.log(inputGroup);
        if (element.required && !element.value) {
          console.log(`Element name: ${element.name}, Input: ${inputGroup}`);
          messages.push(`${element.name} is required`);
          if (inputGroup) inputGroup.style.borderColor = "red";
          else element.style.borderColor = "red";
        } else  {
          console.log(`Removed element name: ${element.name}, Input: ${inputGroup}`);
          if (inputGroup) {
            inputGroup.style.borderColor = "";
            console.log("REMOVE tanggal sewa sukses")
          }
          else element.style.borderColor = "";
        }
    });
    if (messages.length) {
        alert(messages.join("\n"));
        return;
    }

    const availableDate = this.form["Tanggal Sewa"].value;
    const pickUpTime = this.form["Waktu Sewa"].value;
    const carCapacity = this.form["Jumlah Penumpang"].value;
    const driverType = Boolean(Number(this.form["Tipe Driver"].value));
    const newDate = new Date(`${availableDate}T${pickUpTime}Z`);


    console.log(availableDate, pickUpTime, carCapacity, driverType, newDate);
    const filteredCars = [];
    this.carContainerElement.innerHTML = '';
    Car.list.forEach((car) => {
      if (car.availableAt.getTime() > newDate.getTime() && car.capacity >= carCapacity && car.available === driverType) {
        console.log(car.availableAt)
        filteredCars.push(car);
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.append(node);
      }
    });
    document.dispatchEvent(new CustomEvent('renderComplete', { detail: { renderedCars: filteredCars.length } }));

    if (!filteredCars.length) {
      alert("Car not available");
    }
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
