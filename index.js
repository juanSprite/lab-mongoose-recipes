const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// const myRecipe = {
//   title: "Arroz a la cubana",
//   level: "Easy Peasy",
//   ingredients: "white rice, eggs, tomato sauce, salt"
//   cusine:  ,
//   dishtype: "main_course",
//   image:,
//   duration: 30,
//   creator: "Some cuban chef",
//   created:,
// }
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.insertMany(data))
  .then(() => {
    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
    console.log("A property has been changed in one recipe")
  })
  .then(() => {
    Recipe.deleteOne({title:"Carrot Cake"})
    console.log("A recipe has been deleted from the collection")
  })
  .catch(error => console.log(error));
