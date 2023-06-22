import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const loader = new THREE.TextureLoader();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");
let selectedPlanet = null;

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 40);
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Etoiles
const staticStarCount = 1000;
const staticStarGeometry = new THREE.SphereGeometry(1, 8, 8);
const staticStarMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const staticStarLight = new THREE.PointLight(0xffffff, 1, 1000, 1);
const staticStars = new THREE.Group();

for (let i = 0; i < staticStarCount; i++) {
  const staticStar = new THREE.Mesh(staticStarGeometry, staticStarMaterial);
  const x = (Math.random() - 0.5) * 1500;
  const y = (Math.random() - 0.5) * 1500;
  const z = (Math.random() - 0.5) * 1500;
  staticStar.position.set(x, y, z);
  const size = Math.random() * 2 + 0.5;

  staticStar.scale.set(size, size, size);

  staticStarLight.position.set(x, y, z);
  staticStars.add(staticStarLight);

  staticStars.add(staticStar);
}
scene.add(staticStars);

// Etoiles
const starCount = 100;
const starGeometry = new THREE.SphereGeometry(1, 8, 8);
const starMaterial = new THREE.MeshBasicMaterial({ color: "orange" });
const starLight = new THREE.PointLight("orange", 1, 500, 1);
const stars = new THREE.Group();

for (let i = 0; i < starCount; i++) {
  const star = new THREE.Mesh(starGeometry, starMaterial);
  const x = (Math.random() - 0.5) * 1500;
  const y = (Math.random() - 0.5) * 1500;
  const z = (Math.random() - 0.5) * 1500;
  star.position.set(x, y, z);
  const size = Math.random() * 2 + 0.5;
  starLight.position.set(x, y, z);
  stars.add(starLight);
  star.scale.set(size, size, size);
  stars.add(star);
}
scene.add(stars);

//soleil
const sunGeometry = new THREE.SphereGeometry(14, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("textures/sunSurfaceMaterial.jpg"),
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
// Lumière du soleil
const sunLight = new THREE.PointLight(0xffff00, 2, 1500, 1);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Planetes
const planetData = [
  {
    name: "Mercure",
    description:
      "La planète la plus proche du Soleil et la plus petite du système solaire.",
    rotationSpeed: 0.01,
    distance: 57.9,
    radius: 10.383,
    map: loader.load("textures/mercury.jpg"),
  },
  {
    name: "Vénus",
    description:
      "Une planète semblable à la Terre en termes de taille et de composition, mais avec une atmosphère dense et un effet de serre extrême.",
    rotationSpeed: 0.0065,
    distance: 108.2,
    radius: 10.949,
    map: loader.load("textures/venus.jpg"),
  },
  {
    name: "Terre",
    description: "Notre planète bleue, le seul endroit connu où la vie existe.",
    rotationSpeed: 0.0043,
    distance: 149.6,
    radius: 10,
    map: loader.load("textures/earth_map.jpg"),
    planet: null,
  },
  {
    name: "Mars",
    description:
      "La « planète rouge » avec des caractéristiques géologiques intéressantes et des recherches en cours sur la possibilité de vie passée.",
    rotationSpeed: 0.0023,
    distance: 227.9,
    radius: 10.532,
    map: loader.load("textures/mars.jpg"),
  },
  {
    name: "Jupiter",
    description:
      "La plus grande planète du système solaire avec des bandes de nuages colorés et une grande tache rouge caractéristique.",
    rotationSpeed: 0.001,
    distance: 378.5,
    radius: 21.209,
    map: loader.load("textures/jupiter.jpg"),
  },
  {
    name: "Saturne",
    description:
      "Connue pour ses magnifiques anneaux composés de glace et de poussière.",
    rotationSpeed: 0.0005,
    distance: 433.4,
    radius: 19.449,
    map: loader.load("textures/saturne.jpg"),
  },
  {
    name: "Uranus",
    description:
      "Une planète inclinée sur le côté avec une couleur bleu-vert unique due à la présence de méthane dans son atmosphère.",
    rotationSpeed: 0.0002,
    distance: 872.5,
    radius: 14.007,
    map: loader.load("textures/uranus.jpg"),
  },
  {
    name: "Neptune",
    description:
      "La planète la plus éloignée du Soleil avec une atmosphère dynamique et des vents violents.",
    rotationSpeed: 0.0002,
    distance: 995.1,
    radius: 13.883,
    map: loader.load("textures/neptune.jpg"),
  },
  {
    name: "Lune",
    description:
      "Le seul satellite naturel de la Terre, un compagnon fidèle qui influence les marées et fascine les astronomes.",
    rotationSpeed: 0.0022,
    distance: 8.00257,
    radius: 2.273,
    map: loader.load("textures/moon.jpg"),
  },
];

const planets = [];
planetData.forEach((data) => {
  const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32);
  const planetMaterial = new THREE.MeshLambertMaterial({ map: data.map });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  if (data.name !== "Lune") {
    planet.position.x = data.distance;
    scene.add(planet);
    planets.push(planet);
  }
  if (data.name === "Terre") {
    data.planet = planet;
  }
});

// Lune
const moonGeometry = new THREE.SphereGeometry(planetData[8].radius, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({
  map: loader.load("textures/moon.jpg"),
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Lumière de la lune
const moonLight = new THREE.PointLight(0xffffff, 2, 100);
moon.add(moonLight);

// Saturne anneau
const saturnRingGeometry = new THREE.RingGeometry(20, 25, 64);
const saturnRingMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("textures/saturne.jpg"),
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.5,
});
saturnRingGeometry.rotateX(-Math.PI / 2);
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
const saturn = planets[5];
saturn.add(saturnRing);

// Animate
const animate = () => {
  planets.forEach((planet, index) => {
    const data = planetData[index];
    const angle = (Date.now() * data.rotationSpeed) / 50;
    planet.position.x = Math.cos(angle) * data.distance;
    planet.position.z = Math.sin(angle) * data.distance;
    planet.rotation.y += data.rotationSpeed;
  });

  const earthData = planetData.find((data) => data.name === "Terre");
  const moonData = planetData.find((data) => data.name === "Lune");
  const moonDistance = earthData.radius + moonData.distance;
  const moonAngle = (Date.now() * moonData.rotationSpeed) / 1000;
  moon.position.x =
    Math.cos(moonAngle) * moonDistance + earthData.planet.position.x;
  moon.position.z =
    Math.sin(moonAngle) * moonDistance + earthData.planet.position.z;
  moonMaterial.needsUpdate = true;

  if (selectedPlanet) {
    camera.lookAt(selectedPlanet.position);
    controls.target.copy(selectedPlanet.position);
  }
  for (let i = 0; i < stars.children.length; i++) {
    const star = stars.children[i];
    const radius = 0.25;
    star.position.x =
      star.position.x + Math.cos(Date.now() * 0.0001 + i) * radius;
    star.position.y =
      star.position.y + Math.sin(Date.now() * 0.0001 + i) * radius;
    star.position.z =
      star.position.z + Math.sin(Date.now() * 0.0001 + i) * radius;

    if (
      star.position.x < -750 ||
      star.position.x > 750 ||
      star.position.y < -750 ||
      star.position.y > 750 ||
      star.position.z < -750 ||
      star.position.z > 750
    ) {
      star.position.set(
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 1500
      );
    }
  }

  controls.update();

  if (selectedPlanet) {
    const distance = camera.position.distanceTo(selectedPlanet.position);
    const direction = new THREE.Vector3().subVectors(
      camera.position,
      selectedPlanet.position
    );
    direction.normalize();
    camera.position.copy(
      selectedPlanet.position.clone().add(direction.multiplyScalar(distance))
    );
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

function onDocumentMouseDown(event) {
  event.preventDefault();

  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(planets);
  if (intersects.length > 0) {
    const planet = intersects[0].object;
    if (planet === selectedPlanet) {
      selectedPlanet = null;
      const planetInfoElement = document.getElementById("planetInfo");
      planetInfoElement.innerHTML = "";
    } else {
      selectedPlanet = planet;
      const index = planets.indexOf(planet);
      const clickedPlanetData = planetData[index];
      const planetInfoElement = document.getElementById("planetInfo");
      planetInfoElement.innerHTML = `
        <strong>Nom :</strong> ${clickedPlanetData.name}<br>
        <strong>Rayon :</strong> ${clickedPlanetData.radius}<br>
        <strong>Distance du soleil :</strong> ${clickedPlanetData.distance}<br>
        <strong>Description :</strong> ${clickedPlanetData.description}
      `;
    }
  }
}

document.addEventListener("mousedown", onDocumentMouseDown, false);
