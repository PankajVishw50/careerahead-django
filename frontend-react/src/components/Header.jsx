import React from 'react'

import '../assets/css/Header.css';
import { Link, useOutletContext } from 'react-router-dom';

function Header() {
	const {auth} = useOutletContext()

	return (

	<div className="navbar">
		<nav>
			<div className="logo">
				Career <span>A</span> head
			</div>
			<ul className="navigation">
				<li>
					<Link to="/welcome">welcome</Link>
				</li>
				<li>
					<Link to="/user/dashboard">user Dashboard</Link>
				</li>
				<li>
					<Link to="/counsellor/dashboard">counsellor Dashboard</Link>
				</li>

				<li>
					<Link to='/email/verification'>Email Verification</Link>
				</li>
				<li>
					<Link to='/setup'>Setup</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/signin">SignIn</Link>
				</li>
				{
					auth && auth.is_authenticated() && 
					(
						<li>
						<Link to="/logout">Logout</Link>
						</li>
					)
				}
			</ul>

			<div className="hamburger">
				<div className="line first-line" />
				<div className="line second-line" />
				<div className="line third-line" />
			</div>
		</nav>
	</div>

	)
}

export default Header