import React, { useEffect, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom';
import Auth from './utils/Auth';

function App() {
	const data = useLoaderData()
	const [auth, setAuth] = useState()

	console.log("IN the App")

	useEffect(() => {
		(async () => {
			const _auth = new Auth()
			await _auth.check_validation()
			setAuth(_auth);
		})()
	}, [])

	return (
		<Outlet
		context={{
			auth,
		}}
		/>
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

