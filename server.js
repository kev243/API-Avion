//on cree notre premier url

import express from 'express';
import db from './data/database';
import bodyParser from 'body-parser';
import {validate, createAvion} from './business/AvionsServices';


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', function(req, res) {
    res.send('hello kevin nimi');
  });

  //on va crée le CRUD API

  //recuperer tous les avions
  app.get('/api/v1/avions', (req, res)=>{
    res.status(200).send({
        success:true ,
        message:'avions récupéré avec succés',
        avions:db
    });
  });


  //ajouter un avion 
  app.post('/api/v1/avions', (req, res)=>{

    console.log('req',req.body.avionneur)
     const avion =req.body;
     const valid = validate(avion);

    if(!valid.success){
        res.status(400).send(valid)
    }

// on cree une variable pour stoquer les donnée
   const avionToSave = createAvion(avion)

        res.status(200).send({
        success:true ,
        message:'avions ajoutê avec succés',
        avion:avionToSave
    });
  
  });



  //le port ou il va ecoutter 
  const PORT = 3000;
  app.listen(PORT ,()=> {
    console.log( 'serveur demarré sur le port '+ PORT )
    console.log( 'http://localhost:'+ PORT )
  })