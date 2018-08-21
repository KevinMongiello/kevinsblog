import React, { Component } from 'react';
import * as THREE from 'three';
import helvFont from "./assets/helvetiker_regular.typeface.json";

class Scene extends Component {
	constructor(props) {
		super(props);

		this.cameraLength = 10000;
		this.childrenCount = 300;

		this.sceneInit = this.sceneInit.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.animate = this.animate.bind(this);
		this.sceneRender = this.sceneRender.bind(this);

	}

	componentDidMount() {
		const loader = new THREE.FontLoader();
		let font;
		// loader.load( 'fonts/helvetiker_regular.typeface.json', ( font ) => {
			this.sceneInit(font);
			this.animate();
		// } );
	}

	componentWillUnmount() {
		this.stop();
		this.mount.removeChild(this.renderer.domElement);
	}

	onWindowResize() {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

	animate() {
		requestAnimationFrame( this.animate );

		this.sceneRender();

	}

	sceneRender() {
		this.scene.children.forEach((child) => {
			child.position.y += 25
			if (child.position.y >= this.cameraLength) {
				this.scene.remove(child);
			}
		})
		for (let i = 0, rays = this.scene.children.length; i + rays < this.childrenCount; i++) {
			this.createNewRay();
		}

		this.renderer.render( this.scene, this.camera );
	}

	createNewRay() {
		const object = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ) );
		object.position.x = Math.random() * 4000 - 2000;
		object.position.y = Math.random() * 8000;
		object.position.z = Math.random() * 4000 - 2000;
		object.scale.y = Math.random() * 2 + 1;
		this.scene.add( object );
	}

	sceneInit() {
		this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.y = this.cameraLength;
		this.camera.lookAt( new THREE.Vector3() );

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0x000 );

		this.geometry = new THREE.BoxBufferGeometry( 1, 100, 1 );

		for ( let i = 0; i < this.childrenCount; i ++ ) {
			this.createNewRay();
		}

		this.raycaster = new THREE.Raycaster();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		// const textGeometry = new THREE.TextGeometry( 'Hello three.js!', {
		// 	font,
		// 	size: 80,
		// 	height: 5,
		// 	curveSegments: 12,
		// 	bevelEnabled: true,
		// 	bevelThickness: 10,
		// 	bevelSize: 8,
		// 	bevelSegments: 5
		// } );

		this.mount.appendChild(this.renderer.domElement);


		window.addEventListener( 'resize', this.onWindowResize, false );

	}

	render() {
		return (
			<div
				id="scene-container"
				style={{ width: '400px', height: '400px' }}
				ref={(mount) => { this.mount = mount }}
			/>
		);
	}
}

export default Scene;
