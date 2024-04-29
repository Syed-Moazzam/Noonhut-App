import poultry from "../Images/poultry.jpg"
import meat from "../Images/meat.png"
import fish from "../Images/fish.jpg"
import fruitAndVegetables from "../Images/fruits.png"
import dairyProduct from "../Images/dairy-products.jpg"
import bakery from "../Images/bakery.png"
import spices from "../Images/spices.jpg"
import dryFruits from "../Images/dry-fruits.jpg"

let categoriesArray = [
    {
        image: meat,
        paragraph: "Meat",
        to: "/"
    },
    {
        image: fish,
        paragraph: "Fish",
        to: "/stores/fish"
    },
    {
        image: poultry,
        paragraph: "Poultry",
        to: "/stores/poultry"
    },
    {
        image: fruitAndVegetables,
        paragraph: "Fruits and Vegetables",
        to: "/stores/fruits-and-vegetables"
    },
    {
        image: dairyProduct,
        paragraph: "Dairy Products",
        to: "/stores/dairy"
    },
    {
        image: bakery,
        paragraph: "Bakery",
        to: "/stores/bakery"
    },
    {
        image: spices,
        paragraph: "Spices",
        to: "/stores/spices"
    },
    {
        image: dryFruits,
        paragraph: "Dried Fruits",
        to: "/stores/dried-fruits"
    },
];

export default categoriesArray;