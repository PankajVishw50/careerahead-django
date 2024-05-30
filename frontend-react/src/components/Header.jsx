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
					<Link to='/welcome'>Welcome</Link>
				</li>
				{
					auth && auth.is_authenticated() ?
					(
						<>
							<li>
								<Link to='/dashboard'>Dashboard</Link>
							</li>
							<li>
								<Link to='/market'>Book</Link>
							</li>
							<li>
							<Link to="/logout">Logout</Link>
							</li>
						</>
					) : 
					(
						<li>
							<Link to='/login'>Login</Link>
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