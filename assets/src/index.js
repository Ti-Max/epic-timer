//https://pierfrancesco-soffritti.medium.com/how-to-organize-the-structure-of-a-three-js-project-77649f58fa3f
import { Scene } from "./Scene";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scene = new Scene(canvas);

addEventListeners();
render();

function addEventListeners(){
    window.addEventListener( 'resize', onWindowResize );
    document.addEventListener('keydown', scene.onKeyDown);
	document.addEventListener('keyup', scene.onKeyUp);
}

function onWindowResize (){
    canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

    scene.onWindowResize();
}

function render() {
    requestAnimationFrame(render);
    scene.update();
}