import cars from "../model/CarsModel.js";

export const loginPage = async (req, res) => {
    res.render('login', {
        layout: "login.ejs"
    });
};

export const getCars = async (req, res) => {
    try {
        // const host = `${req.protocol}://${req.get('host')}`;
        const allCars = await cars.findAll();

        // const carsWithImageUrls = allCars.map(car => {
        //     return {
        //         ...car.toJSON(),
        //         image: car.image ? `${host}/uploads/${car.image}` : null
        //     };
        // });

        res.render('CarsTable', {
            docsTitle: "All Cars",
            layout: "layouts/admin-layout",
            cars: allCars,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching cars" });
    }
};

export const getAddCarForm = async (req, res) => {
    res.render('AddCar', {
        docsTitle: "Add Car",
        layout: "layouts/admin-layout"
    });
};

// export const getEditCarForm = async (req, res) => {
//     const car = await cars.findOne({
//         where: {
//             id: req.params.id
//         }
//     }).catch(() => {
//         res.status(404).send("<h1>404</h1>");
//     });

//     // console.log(car);

//     res.render('EditCar', {
//         docsTitle: "Edit Car",
//         layout: "layouts/admin-layout",
//         car
//     });
// };


export const getCarById = async (req, res) => {
    try {
        // const host = `${req.protocol}://${req.get('host')}`;
        const car = await cars.findOne({
            where: {
                id: req.params.id
            }
        });

        if (car) {
            // const carWithImageUrl = {
            //     ...car.toJSON(),
            //     image: car.image ? `${host}/uploads/${car.image}` : null
            // };
            res.status(200).json(car);
        } else {
            res.status(404).json({ message: "Car not found" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const createCar = async (req, res) => {
    console.log(req.body);
    try {
        const { name, price} = req.body;
        const image = req.file ? req.file.filename : null;
        await cars.create({
            name,
            price,
            image
        });
        // res.status(201).json({ message: "Car created" });
        res.redirect('/cars');
    } catch (error) {
        console.log(error.message);
    }
};

export const updateCar = async (req, res) => {
    try {
        const {name, price} = req.body;
        const image = req.file ? req.file.filename : null;

        const car = await cars.findOne({
            where: { id: req.params.id }
        });

        if (car) {
            car.name = name;
            car.price = price;
            if (image) car.image = image;

            await car.save();
            // res.status(200).json({ message: "car updated", car });
            res.redirect('/cars');
        } else {
            res.status(404).json({ message: "Car not found" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteCar = async (req, res) => {
    try {
        await cars.destroy({
            where: {
                id: req.params.id
            }
        });
        // res.status(200).json({ message: "Car deleted" });
        res.redirect('/cars');
    } catch (error) {
        console.log(error.message);
    }
};
