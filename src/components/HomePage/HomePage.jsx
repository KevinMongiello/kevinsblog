import React from "react";
import Star3dBackground from "./Stars3dBackground";

import "./HomePage.scss";

const HomePage = () => (
	<div style={{ height: "100%", width: "100%", position: "relative" }}>
		<Star3dBackground />
		<div className="center-section">
			<h1>Earth Star</h1>
			<div>
				<ul>
					<li><a href="http://www.github.com/kevinmongiello"><i className="fa fa-github" /></a></li>
					<li><a href="https://soundcloud.com/loveplaydo"><i className="fa fa-soundcloud" /></a></li>
					<li><a href="https://www.linkedin.com/in/kevinmongiello/"><i className="fa fa-linkedin" /></a></li>
					<li><a href="blog"><i className="fa fa-star" /></a></li>
				</ul>
			</div>

		</div>
	</div>
);

export default HomePage;
