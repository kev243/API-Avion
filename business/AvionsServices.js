import db from '../data/database';

//les validations
export const validate = function(avion) {
    if (!avion.avionneur){
        return{
            success:false,
            message:'avionneur is required',
        };
    }

    if (!avion.model){
        return{
            success:false,
            message:'model is required',
        };
    }

    if (!avion.description){
        return{
            success:false,
            message:'description is required',
        };
    }

    return{
        success:true,
        message:'Avion ajouté avec succès',
    };

    
}

export const createAvion= function(avion) {

    // on cree une variable pour stoquer les donnée
    const avionToSave={
        "id":db.length+1,
        "avionneur":avion.avionneur,
        "description": avion.description,
        "model":avion.model,
        "annee":avion.annee,
        "service":avion.service,
        "place": avion.place,
        "interieur":avion.interieur,
        "incident":avion.incident,
    }

    db.push( avionToSave);
    return avionToSave;

}