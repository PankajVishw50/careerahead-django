import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom';
import Auth from './utils/Auth';
import ModalComponent from './components/ModalComponent';
import Modal from './utils/Modal';

function App() {
	const data = useLoaderData()
	const [auth, setAuth] = useState();
	const [, forceUpdate] = useState(0);

	const modalClass = useRef(
		new Modal(forceUpdate)
	)

	console.log('in the App.jsx')

	const modal = modalClass.current

	useEffect(() => {
		modal.check_location_toasts();
	}, [])

	useEffect(() => {
		(async () => {
			const _auth = new Auth()
			await _auth.check_validation()
			setAuth(_auth);
		})()
	}, [])

	return (
		<>
		
			<Outlet
			context={{
				auth,
				modal,
			}}
			/>

			<ModalComponent 
			modal={modal}
			/>
		
		</>

	)
}	

async function AppLoader(){
	console.log("i'm running")
	
	return "Nothing"	
}

export {
	App,
	AppLoader
}

