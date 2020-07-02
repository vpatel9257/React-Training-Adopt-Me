import React from 'react';
import pet from '@frontendmasters/pet';
import { navigate } from '@reach/router';
import Modal from './Modal';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundry';
import ThemeContext from './ThemeContext';

class Details extends React.Component { //extends react component
    state = { loading: true, showModal: false }; //show the loading state and dont show the modal at first
    
    componentDidMount() { //good for doing ajex req
        //throw new Error('') //it will thorw an error on the site and redirect you back to homepage after 5 sec
        pet.animal(this.props.id).then(({ animal }) => { //props cant not change. Its read only
            this.setState({
                    url: animal.url,
                    name: animal.name,
                    animal: animal.type,
                    location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
                    description: animal.description,
                    media: animal.photos,
                    breed: animal.breeds.primary,
                    loading: false
                });
            },
                console.error);
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal }) //this is the opposite of what showModal was above
    //if its true make it false and it its false make it true

    adopt = () =>  navigate(this.state.url) //navigate to url

    render() { //hard req for class is to have a render menthod. This method workes like a function 
        if (this.state.loading) {
            return <h1> loading </h1>
        }
        const { animal, breed, location, description, name, media, showModal } = this.state; 
        //grabbing media from api using this.state from line 26 into line 30 
        return (
            <div className="details">
                <Carousel media={media} />

                <div>
                    <h1> {name} </h1>
                    <h2> {`${animal} - ${breed} - ${location}`} </h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button onClick={this.toggleModal}
                                style={{ backgroundColor: theme }}
                            >
                                Adopt {name}
                            </button>
                            //when this button is clicked a modal pops open via the onClick event

                        )}
                    </ThemeContext.Consumer>

                    <p> {description} </p>

                    {
                        showModal ? ( //if I showModal then display the div question
                            <Modal>
                                <div>
                                    <h1> Would you like to adopt {name} ? </h1>
                                    <div className="buttons">
                                        <button onClick={this.adopt}> Yes </button>
                                        <button onClick={this.toggleModal}> No, I can not. </button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null //if your showing the model then show it. If not showing then show nothing
                    }

                </div>
            </div>
        );
       }
     }

export default function DetailsWithErrorBoundary(props) {
    return ( //wrapped errorBoundary around details
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
     )
}