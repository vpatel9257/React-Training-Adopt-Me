import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';


const Modal = ({ children }) => {
	const elRef = useRef(null);
	if (!elRef.current) { //if I dont have an elref, crate a div and say the following below
		const div = document.createElement('div');
		elRef.current = div; //will always have a correct div because current will always will be pointing at the div

	}

	useEffect(() => {
		const modalRoot = document.getElementById('modal'); //grabbed the modal here 
		modalRoot.appendChild(elRef.current); //appended the div and in the div we will store all the children from line 20 

		return () => modalRoot.removeChild(elRef.current); //only run this function when modal root gets closed. 

	}, []); //empty array means no dependencies and we want it to run useEffect once not multiple times

	return createPortal(<div> {children} </div>, elRef.current); //Remove the children at the end
};

export default Modal;