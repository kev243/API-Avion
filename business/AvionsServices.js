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

export const findAvionById = function(id) {
  const avionFound =   db.find((avion)=>{
        if(avion.id === id){
            return avion;
        }
    })
    return avionFound;
}

export const deleteAvionById = function(id) {

    const avionFound =   db.find((avion,index)=>{
        if(avion.id === id){
            db.splice(index,1)
            return true
        }
    })
    return avionFound;

}

/**
 * Fontion qui met a jour un avion en BDD
 * @param {*} id 
 * @param {*} newAvion 
 * @returns 
 */

export const updateAvionById = function(id,newAvion) {
    let avionFound;
    let itemIndex;

    db.map((avion,index)=>{
        if (avion.id == id){
            avionFound=avion;
            itemIndex=index;
        }
    })
    if (!avionFound){
        return false;
    }
    if (!validate(newAvion).success){
        return false
    }

    //merge
    const updateAvion={
        "id":avionFound.id,
        "avionneur":newAvion.avionneur||avion.avionneur,
        "description": newAvion.description||avion.description,
        "model":newAvion.model||avion.model,
        "annee":newAvion.annee||avion.annee,
        "service":newAvion.service||avion.service,
        "place": newAvion.place||avion.place,
        "interieur":newAvion.interieur||avion.interieur,
        "incident":newAvion.incident||avion.incident,
    }

    //mis a jour en bd
    db.splice(itemIndex,1, updateAvion)
    return updateAvion





}