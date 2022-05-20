#!/usr/bin/env node
import axios from 'axios';
import parser from 'xml2json';
import fs from 'fs';

console.log('inicio de Scripts')

console.log('Buscando información xml')
const response = await axios.get('https://fx-nunchee-assets.s3.amazonaws.com/data/sports.xml');

console.log('Parseando info xml a json')
let valuesJson = parser.toJson(response.data);

console.log('Reemplazar caracteres especiales')
valuesJson = valuesJson.replace(/$t/g, 'nombre');


console.log('Guardando archivo json')
fs.writeFileSync('sports5.json', valuesJson);

console.log('fin de Scripts')

// const axios = require('axios');
// const { get } = require('lodash');
// const { parseString } = require('xml2js');



// async function getXml() {
//   try{
//     const response = await axios.get('https://fx-nunchee-assets.s3.amazonaws.com/data/sports.xml');
    
//     // console.log('lll',response.data);
    
//   }catch(error){
//     console.log(error)
//   }
  
//   return response.data;
// }

// console.log(getXml())

// parseString(getXml(), (err, results) => {
//   const data = JSON.stringify(results);

//   console.log('parseString', data);
// });
