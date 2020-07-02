import React from 'react';
import Pet from './Pet';

const Results = ({ pets }) => {
    return (
        <div className="search">
            {pets.length === 0 ? (
                <h1> No Pets Found </h1> //if pet length is 0 and null return h1 statment
            ) : (
                    pets.map(pet => ( //if pets are found then it'll return all the components listed below
                        <Pet
                            animal={pet.type}
                            key={pet.id}
                            name={pet.name}
                            breed={pet.breeds.primary}
                            media={pet.photos}
                            location={`${pet.contact.address.city}, ${
                                pet.contact.address.state
                                }`}
                            id={pet.id}
                        />
                ))
             )}

        </div>
    );
};

export default Results;