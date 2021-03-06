//This file clears the db and seeds 50 random data into the db.
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seed-helpers');
const Campground = require('../models/campground')
mongoose.connect('mongodb://localhost:27017/yelp-trip', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany(); // clear the db
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randPrice = Math.floor(Math.random() * 20) + 10;
        const c = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis eaque ipsa, minus quis voluptatem quas, aliquid, neque repudiandae voluptas consequuntur dolores. Neque culpa eius iusto assumenda non id reprehenderit voluptas!",
            price: randPrice
        })
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});