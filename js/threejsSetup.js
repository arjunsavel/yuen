// set up scene, camera, renderer
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls setup (for scrolling)
var controls = new THREE.TrackballControls(camera, renderer.domElement);

// create field
var waveGeometry = new THREE.Geometry();
var SEPARATION = 4;
var AMOUNTX = 96;
var AMOUNTZ = 96;
max_y = 0
for (var i = 0; i < AMOUNTX; i++) {
	for (var j = 0; j < AMOUNTZ; j++) {
		var particle = new THREE.Vector3();
		particle.x = i*SEPARATION-((100*SEPARATION)/2);
		particle.z = j*SEPARATION-((100*SEPARATION)/2);
		particle.y = 0
		// max_y = Math.sign(particle.y)*Math.max(max_y, Math.abs(particle.y));
		waveGeometry.vertices.push(particle);
	}
}

// adjust camera position
camera.position.z = 150;
// camera.position.y = 1.3*max_y;
camera.position.y = 30


var particleMaterial = new THREE.PointsMaterial({color: 0xffffff, size: .5});
var wave = new THREE.Points(waveGeometry, particleMaterial);
scene.add(wave);

// testing line
var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3( -100, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
geometry.vertices.push(new THREE.Vector3( 1000, 0, 0) );
var line = new THREE.Line( geometry, material );
scene.add( line );


// input from the slider
var rangeslider = document.getElementById("test5"); 
var output = document.getElementById("demo"); 
output.innerHTML = rangeslider.value; 
  
rangeslider.oninput = function() { 
  output.innerHTML = this.value; 
  console.log(this.value)
  animateWave(this.value)
} 

var count = 1.9; // sets the scale for R

// animate the topological change
function animateWave(value) {
	var index = 0;
	// while (Math.abs(value - count) > 0) {
	for (var i = 0; i < AMOUNTX - 10; i++) {
		for (var j = 0; j < AMOUNTZ - 10; j++) {
			var current = waveGeometry.vertices[index++];
			var max_y = 0;
			var R = 100*Math.sqrt(1/Math.abs(count - 1))
			// debugger;
			try {
		
			if (count - 1 > 0) {
				current.y = Math.sqrt(Math.pow(R, 2) + Math.pow(current.x, 2) + Math.pow(current.z, 2)); //basically set radius with omega — given hubble distance.
			} else {
				current.y = Math.sqrt(Math.pow(R, 2) + Math.pow(current.x, 2) - Math.pow(current.z, 2)); //basically set radius with omega — given hubble distance.
			}
		}
			catch(error) {
				console.log(index)
			}
			waveGeometry.verticesNeedUpdate = true;
			max_y = Math.sign(current.y)*Math.max(max_y, Math.abs(current.y));
		}
	}
	count += 0.001;
	// camera.position.y = 1.2*max_y;
	}
// }

// animate loop
var animate = function () {
	controls.update();
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

animate();