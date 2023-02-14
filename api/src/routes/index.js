const { Router } = require('express');
const { Dog, Temperaments } = require("../db");
const { API_KEY } = process.env; 
const axios = require("axios");
const express = require('express');

const router = Router();

let urLink = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

const getApiData = async() => {
    
    const apiData = await axios.get(urLink);
    const apiInfo = await apiData.data.map(el => {
    let temperamentArray = [];
    if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
        temperamentArray = el.temperament.split(", ");
    }
    
    let heightArray = [];
    if (el.height.metric) {
        heightArray = el.height.metric.split(" - ");
    }

    let weightArray = [];
    if (el.weight.metric) {
        weightArray = el.weight.metric.split(" - ");
    }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    })
return apiInfo;
}

//-- Get data from the database posgrest--//
const getDbInfo = async () => {
    return await Dog.findAll({
        include:{
            model: Temperaments,
            attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [], //traer mediante los atributos del modelo
            },
        }
    });
}

const getAllDogs = async () =>{

    const apiInfo = await getApiData();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;

}

//--endpoints--//

router.get("/dogs", async(req, res) => {//esta funcion también podra recibir un nombre por medio de query
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));//si el perro existe guardame sus parametros aca.
        dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found"); 
    } else {
        res.status(200).send(allDogs);
    }
});

router.get("/dogs/:idRaza", async(req, res) => {//traer la info de un perro por su id, del modelo raza
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(el => el.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("Dog no found in the Data");
    }
});

router.get("/temperament", async (req, res) => {
       const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
       try {
        let allTemperaments = await Temperaments.findAll()
        if (!allTemperaments.length){
            const temperaments = temperamentsApi.data.map(t => t.temperament).join(", ").split(", ").filter(temp => temp);
            temperaments.forEach (async temp => {
                await Temperaments.findOrCreate({
                    where: {name: temp}
                })
            }) 
            allTemperaments = await Temperaments.findAll()

        }
        return res.send(allTemperaments)
       } catch (error) {
        console.log(error)
       }
       
});

router.post("/dog", async (req, res) => {
    let {
     name,
     min_height,
     max_height,
     min_weight,
     max_weight,
     life_span,
     temperaments,
     image
    } = req.body
 
    const fixedHeight = []
    const minHeight = min_height;
    const maxHeight = max_height;
    fixedHeight.push(minHeight, maxHeight)
 
    const fixedWeight = []
    const minWeight = min_weight;
    const maxWeight = max_weight;
    fixedWeight.push(minWeight, maxWeight)
 
    let dog = await Dog.create({
     name,
     height: fixedHeight,
     weight: fixedWeight,
     life_span,
     image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
    })
 
    let associatedTemp = await Temperaments.findAll({
        where: { name: temperaments},
    })
 
    dog.addTemperament(associatedTemp);
 
    res.status(200).send("Dog created succesfully!")
})


router.use(express.json());

module.exports = router;
