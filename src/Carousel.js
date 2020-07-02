import React from "react";

class Carousel extends React.Component{
	state = {
		photos: [],
		active: 0
	};
	static getDerivedStateFromProps({ media }) { //method takes in set of props and give you back new set of state
		let photos = ["http:/placecorgi.com/600/600"]; //placeholder image

		if (media.length) {
			photos = media.map(({ large }) => large);//grabbing large size photos out of the collection of photos of all sizes

		}

		return { photos }; //returning photos
	}

	handleIndexClick(event) {
		this.setState({
			active: +event.target.dataset.index //+ turns the event into a number. Its called unary plus. Same as parseInt function
		})
	}
	render() {
		const { photos, active } = this.state;

		return (
			<div className="carousel">
				<img src={photos[active]} alt="animal" />
				<div className="carousel-smaller">
					{photos.map((photo, index) => ( //map with 2 parameters
						//eslint-disable-next-line
						<img //do not put the event listner directly in the img tag for the production line 
							key={photo}
							onClick={this.handleIndexClick} 
							data-index={index} //if the user clicks on the pic we can pull the index of the pic from it 
							src={photo}
							className={index === active ? "active" : ""} //if the index is equal to active then we want to 
																		//give it active class otherwise dont give it a class
							alt="animal thumbnail" 
						/>
					))}
				</div>
			</div>
		);
	}

}

export default Carousel;