import React, { Component } from 'react';
import * as THREE from 'three';
import helvFont from "./assets/helvetiker_regular.typeface.json";

class Scene extends Component {
	constructor(props) {
		super(props);

		this.cameraLength = 10000;
		this.childrenCount = 1000;

		this.sceneInit = this.sceneInit.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.animate = this.animate.bind(this);
		this.sceneRender = this.sceneRender.bind(this);

		this.textRotation = 0;

	}

	componentDidMount() {
		const loader = new THREE.FontLoader();

		this.sceneInit(loader.parse(helvFont));
		this.animate();
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
		this.rays.children.forEach((child) => {
			child.position.y += 25
			if (child.position.y >= this.cameraLength) {
				this.rays.remove(child);
			}
		})
		for (let i = 0, rays = this.rays.children.length; i + rays < this.childrenCount; i++) {
			this.createNewRay();
		}

		this.textRotation += 0.033;
		this.textGroup.rotation.z += Math.sin(this.textRotation) / (-20 * Math.PI) ;

		this.renderer.render( this.scene, this.camera );
	}

	createNewRay() {

		const object = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ) );
		object.position.x = Math.random() * 4000 - 2000;
		object.position.y = Math.random() * 8000;
		object.position.z = Math.random() * 4000 - 2000;
		object.scale.y = Math.random() * 100 + 1;

		this.rays.add( object );

	}

	sceneInit(font) {

		this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.y = this.cameraLength;
		this.camera.lookAt( new THREE.Vector3() );

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0x000 );

		this.geometry = new THREE.BoxBufferGeometry( 1, 2, 1 );

		this.rays = new THREE.Group();

		for ( let i = 0; i < this.childrenCount; i ++ ) {
			this.createNewRay();
		}

		this.scene.add(this.rays);

		this.raycaster = new THREE.Raycaster();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		const textGeometry = new THREE.TextGeometry( 'Hello three.js!', {
			font,
			size: 80,
			height: 100,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 10,
			bevelSize: 8,
			bevelSegments: 5
		} );

		textGeometry.computeBoundingBox();

		const centerOffset = -0.5 * ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x );

		const materials = [
			new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
			new THREE.MeshBasicMaterial( { color: 0xf0f0f0, overdraw: 0.5 } )
		];

		this.textMesh = new THREE.Mesh( textGeometry, materials );

		this.textMesh.position.x = centerOffset;
		this.textMesh.position.y = 0;
		this.textMesh.position.z = 0;

		this.textMesh.rotation.x = - Math.PI / 2;
		// this.textMesh.rotation.z = Math.PI / 2;
		this.textMesh.rotation.y = 0;

		this.textGroup = new THREE.Group();
		this.textGroup.rotation.z = Math.PI / 6
		this.textGroup.position.y = 8000;

		this.textGroup.add( this.textMesh );
		this.scene.add( this.textGroup );

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
