//on cree notre premier url

import express from 'express';
import db from './data/database';
import bodyParser from 'body-parser';
import { validate, createAvion, findAvionById,deleteAvionById, updateAvionById} from './business/AvionsServices';


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.send('hello kevin nimi');
});

//on va crée le CRUD API

//recuperer tous les avions
app.get('/api/v1/avions', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'avions récupéré avec succés',
        avions: db
    });
});


//ajouter un avion 
app.post('/api/v1/avions', (req, res) => {

    console.log('req', req.body.avionneur)
    const avion = req.body;
    const valid = validate(avion);
    //validation 
    if (!valid.success) {
        res.status(400).send(valid)
    }

    // on cree une variable pour stoquer les donnée
    const avionToSave = createAvion(avion)
    //retour
    res.status(200).send({
        success: true,
        message: 'avions ajoutê avec succés',
        avion: avionToSave
    });

});

//GET BY ID

app.get('/api/v1/avions/:id', (req, res) => {
  const id =parseInt(req.params.id,10);
  const avion = findAvionById(id)
 if (avion){
    res.status(200).send({
        success: true,
        message: 'avions recuperer ê avec succés',
        avion
    });
 }else{
    res.status(404).send({
        success: false,
        message: 'avion not found',
        avion
    });

 }

 
});


//supprimer un avion par id 
app.delete('/api/v1/avions/:id', (req, res) => {
    const id =parseInt(req.params.id,10);
    const  avion = deleteAvionById(id)
    if(avion){
        res.status(200).send({
            success: true,
            message: 'avions supprimer  avec succés',
            
        });

    }else{

        res.status(404).send({
            success: false,
            message: 'avion not found',
            avion
        });

    }

})

//mettre a jour un avion

app.put('/api/v1/avions/:id', (req, res) => {
    const id =parseInt(req.params.id,10);
    const newAvion =req.body;
   const avion= updateAvionById(id,newAvion);
   if(avion){
    res.status(200).send({
        success: true,
        message: 'avions mis à jour avec succés',
        
    });

}else{

    res.status(404).send({
        success: false,
        message: 'avion not found',
        avion
    });

}

  

})




//le port ou il va ecoutter 
const PORT = 3000;
app.listen(PORT, () => {
    console.log('serveur demarré sur le port ' + PORT)
    console.log('http://localhost:' + PORT)
})