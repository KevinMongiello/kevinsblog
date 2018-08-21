import React, { Component } from "react";
import Test2 from "./_test_stars_3js";

// import { throttle } from "throttle-debounce";
// import headpic from "./assets/headpic.jpg"
import "./HomePage.scss";
// import makeCanvas from "./canvas";

class HomePage extends Component {
	componentDidMount() {
		// makeCanvas();
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<div style={{ height: "100%", width: "100%" }}>
				<Test2 />
				{/* <div id="backgrounds">
					<canvas className="canvas_bg" id="canvas_bg1" width="32" height="32" />
					<canvas className="canvas_bg" id="canvas_bg2" width="32" height="32" />
					<div className="radial_gradient" />
				</div>

				<div className="container">
					<div className="clipped">
						<div className="content">
							<div id="scene_container" />
							<img className="picture" src={headpic} alt="self" />
							<h4 className="section-title">Kevin Mongiello</h4>
							<div className="text">
								<p>Hi.{" I'm "}Kevin Mongiello, an artistic and passionate web developer, music creator,
									and entrepreneur. Welcome to my world.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="container" style={{backgroundColor: "pink"}}>
					<div className="clipped">
						<div className="content">
							<img className="picture" src="assets/KevinAndRyan.jpg" alt="self" />
						</div>
					</div>
				</div>

				<div className="container" style={{backgroundColor: "red"}}>
					<div className="clipped">
						<div className="content">
							<img className="picture" src="assets/Woodstock.jpg" alt="self" />
						</div>
					</div>
				</div> */}
			</div>
		);
	}
}

export default HomePage;

/*
color sections scroll.
text sections fixed
successive color sections overlap previous text.
*/
