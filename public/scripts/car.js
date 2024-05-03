class Component {
  constructor() {
    if (this.constructor === Component) {
      throw new Error("Abstract classes can't be instantiated.")
    }
  }

  render() {
    throw new Error("Method 'render()' must be implemented.");
  }
}

export class Car extends Component{
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    super();
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {

    return `
      <div class="car-filter-card card mx-3 my-3">
        <img src="${this.image}" class="car-filter-img img-fluid">
        <div class="card-body">
          <p class="card-text">${this.manufacture}/${this.model}</p>
          <p class="fw-bold fs-5">${this.rentPerDay} /hari</p>
          <p style="height:90px;"> ${this.description}</p>
          <div class="d-flex align-items-center my-2">
            <i data-feather="users"></i>
            <p class="my-0 mx-2">${this.capacity} orang</p>
          </div>
          <div class="d-flex align-items-center my-2">
            <i data-feather="settings"></i>
            <p class="my-0 mx-2">${this.transmission}</p>
          </div>
          <div class="d-flex align-items-center my-2">
            <i data-feather="calendar"></i>
            <p class="my-0 mx-2">Tahun ${this.year}</p>
          </div>
          <button class="btn btn-success mt-2 w-100">Pilih Mobil</button>
        </div>
      </div>
    `
  }
}
