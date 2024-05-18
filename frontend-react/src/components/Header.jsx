import React from 'react'

import '../assets/css/Header.css';

function Header() {
  return (

	<div className="navbar">
		<nav>
			<div className="logo">
				Career <span>A</span> head
			</div>
			<ul className="navigation">
				<li>
					<a href="/home"> Home </a>
				</li>
				<li>
					<a href="/user/dashboard"> Dashboard </a>
				</li>
				<li>
					<a href="/market"> Book </a>
				</li>
				<li>
					<a href="/auth/login"> Login </a>
				</li>
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