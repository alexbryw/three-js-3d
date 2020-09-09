
let camera, scene, renderer;
let geometry, material, mesh;

window.addEventListener('resize', onResize)
init();
animate();

function init() {
	let light = new THREE.AmbientLight( 0x404040 ); // soft white light

	sceneEl = document.querySelector('.scene')

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	// geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	var size = 2 * 2;
	var data = new Uint8Array( 3 * size );

	// var r = Math.floor( color.r * 255 );
	// var g = Math.floor( color.g * 255 );
	// var b = Math.floor( color.b * 255 );
	let r = 50
	let g = 50
	let b = 50

	for ( var i = 0; i < size; i ++ ) {

		var stride = i * 3;

		data[ stride ] = r * i;
		data[ stride + 1 ] = g * i;
		data[ stride + 2 ] = b * i;

	}

	// used the buffer to create a DataTexture

	var texture = new THREE.DataTexture( data, 2, 2, THREE.RGBFormat );
	//
	geometry = new THREE.PlaneGeometry(1, 1);
	material = new THREE.MeshBasicMaterial( {map: texture} );
	// material = texture

	mesh = new THREE.Mesh( geometry, material );
	scene.add( light );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight);
	sceneEl.appendChild( renderer.domElement );

}

function animate() {

	// requestAnimationFrame( animate );

	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.02;
	renderer.render( scene, camera );
	
}

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}