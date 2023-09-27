const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add objects, lights, etc., to your scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Variables to store gyroscope data and mouse position
let gyroscope = null;
let mouseX = 0;
let mouseY = 0;

// Request gyroscope permission and start reading
function requestGyroscopePermission() {
  if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          window.addEventListener('devicemotion', handleOrientation);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('devicemotion', handleOrientation);
  }
}

// Update mouse position
window.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function handleOrientation(event) {
  if (!gyroscope) {
    gyroscope = new THREE.Vector3();
  }

  gyroscope.x = event.beta;
  gyroscope.y = event.gamma;
  gyroscope.z = event.alpha;
}

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  // Update animation logic here
  if (gyroscope) {
    cube.rotation.x = gyroscope.x * (Math.PI / 180) + mouseY;
    cube.rotation.y = gyroscope.y * (Math.PI / 180) + mouseX;
  }

  renderer.render(scene, camera);
};

requestGyroscopePermission();

animate();


(function(){function e(){window.addEventListener("MozOrientation",function(c){d.push("MozOrientation"),a.x=c.x-b.x,a.y=c.y-b.y,a.z=c.z-b.z},!0),window.addEventListener("devicemotion",function(c){d.push("devicemotion"),a.x=c.accelerationIncludingGravity.x-b.x,a.y=c.accelerationIncludingGravity.y-b.y,a.z=c.accelerationIncludingGravity.z-b.z},!0),window.addEventListener("deviceorientation",function(c){d.push("deviceorientation"),a.alpha=c.alpha-b.alpha,a.beta=c.beta-b.beta,a.gamma=c.gamma-b.gamma},!0)}var a={x:null,y:null,z:null,alpha:null,beta:null,gamma:null},b={x:0,y:0,z:0,alpha:0,beta:0,gamma:0},c=null,d=[];window.gyro={},gyro.frequency=500,gyro.calibrate=function(){for(var c in a)b[c]=typeof a[c]=="number"?a[c]:0},gyro.getOrientation=function(){return a},gyro.startTracking=function(b){c=setInterval(function(){b(a)},gyro.frequency)},gyro.stopTracking=function(){clearInterval(c)},gyro.hasFeature=function(a){for(var b in d)if(a==d[b])return!0;return!1},gyro.getFeatures=function(){return d},e()})(window)

gyro.startTracking(function(o) {
			var b = document.getElementById('example'),
					f = document.getElementById('features');
			f.innerHTML = gyro.getFeatures();
			b.innerHTML = 
  "<p> x = " + o.x + "</p>" +
										  "<p> y = " + o.y + "</p>" +
										  "<p> z = " + o.z + "</p>" +
										  "<p> alpha = " + o.alpha + "</p>" +
										  "<p> beta = " + o.beta + "</p>" +
										  "<p> gamma = " + o.gamma + "</p>";
		});