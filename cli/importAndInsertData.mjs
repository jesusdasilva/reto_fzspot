#!/usr/bin/env node
import axios from 'axios';
import parser from 'xml2json';
import fs from 'fs';
import { promisify } from "util";
import { exec } from "child_process";

try {
    console.log('inicio de Scripts ✔️')
    
    console.log('Buscando información xml ✔')
    const response = await axios.get('https://fx-nunchee-assets.s3.amazonaws.com/data/sports.xml');
    
    console.log('Parseando info xml a json ✔')
    let valuesJson = parser.toJson(response.data)

    console.log('Reemplazar caracteres especiales ✔')
    valuesJson = valuesJson.replaceAll('\$t', 'nombre');
    
    console.log('Create Object ✔')
    const valuesObject = JSON.parse(valuesJson);
    
    const nameCollection = Object.keys(valuesObject)
    console.log(`El nombre de la colección es: ${nameCollection}`)
    
    console.log('Guardando archivo json ✔')
    fs.writeFileSync('cli/sports.json', JSON.stringify(valuesObject[nameCollection]));
    
    const execPromise = promisify(exec);
    
    async function importJson() {
      const { stdout, stderr } = await execPromise(`mongoimport "cli/sports.json" --host db -d sports -c ${nameCollection} --drop`);
      console.log('stdout:', stdout);
      console.error('stderr:', stderr);
    }
    
    async function removeFile() {
      await execPromise(`rm cli/sports.json`);
    }
    
    console.log('Ejecutando comando de importación de datos ✔')
    await importJson() 

    console.log('Ejecutando comando de eliminación de archivo ✔')
    await removeFile()

    console.log('Fin de scripts 👍');
} catch (error) {
    console.log(error.message);    
}

