import React, { Component } from 'react';
import * as THREE from 'three';
import helvFont from "./assets/helvetiker_regular.typeface.json";

const randomStartPosition = (coordinates = {}) => ({
	x: coordinates.x || Math.random() * 4000 - 2000,
	y: coordinates.y || Math.random() * 4000 - 2000,
	z: coordinates.z || Math.random() * -8000 - 1000
});

class Scene extends Component {
	constructor(props) {
		super(props);

		this.cameraLength = 500;
		this.childrenCount = 1000;

		this.sceneInit = this.sceneInit.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.animate = this.animate.bind(this);
		this.sceneRender = this.sceneRender.bind(this);
		this.setupSceneAndCamera = this.setupSceneAndCamera.bind(this);
		this.setupRays = this.setupRays.bind(this);
		this.setupRenderer = this.setupRenderer.bind(this);
		this.createText = this.createText.bind(this);

	}

	componentDidMount() {
		const loader = new THREE.FontLoader();

		this.font = loader.parse(helvFont);
		this.sceneInit();
		this.animate();
	}

	componentWillUnmount() {
		this.mount.removeChild(this.renderer.domElement);
	}

	onWindowResize() {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

	animate() {
		requestAnimationFrame( this.animate );

		this.sceneRender(this.scene);
	}

	sceneRender({ children }) {
		children.forEach((child) => {
			if (child.name === "text") return;

			child.position.z += 25
			if (child.position.z >= this.cameraLength) {
				this.scene.remove(child);
			}
		})

		for (let i = 0, rays = children.length; i + rays < this.childrenCount; i++) {
			this.createNewRay();
		}

		this.renderer.render( this.scene, this.camera );
	}

	createNewRay() {
		const object = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ) );
		Object.assign(object.position, randomStartPosition());
		object.scale.z = Math.random() * 100 + 1;

		this.scene.add( object );
	}

	setupSceneAndCamera() {
		this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.z = this.cameraLength;
		this.camera.lookAt( new THREE.Vector3() );

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0x000 );
	}

	setupRays() {
		this.geometry = new THREE.BoxBufferGeometry( 1, 1, 2 );

		for ( let i = 0; i < this.childrenCount; i ++ ) {
			this.createNewRay();
		}
	}

	setupRenderer() {
		this.raycaster = new THREE.Raycaster();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	createText() {
		const textGeometry = new THREE.TextGeometry( "Earth Star", {
			font: this.font,
			size: 80,
			height: 10,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 10,
			bevelSize: 8,
			bevelSegments: 5
		} );

		textGeometry.computeBoundingBox();

		const materials = [
			new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
			new THREE.MeshBasicMaterial( { color: 0xf0f0f0, overdraw: 0.5 } )
		];

		this.textMesh = new THREE.Mesh( textGeometry, materials );

		this.textMesh.name = "text";
		this.textMesh.position.z = 0;

		this.scene.add( this.textMesh );
	}

	sceneInit() {
		this.setupSceneAndCamera();
		this.setupRays();
		this.setupRenderer();
		// this.createText();

		this.mount.appendChild(this.renderer.domElement);

		window.addEventListener( 'resize', this.onWindowResize, false );

	}

	render() {
		return (
			<div
				style={{ position: "absolute", width: "100%", height: "100%", zIndex: "-1" }}
				ref={(mount) => { this.mount = mount }}
			/>
		);
	}
}

export default Scene;
