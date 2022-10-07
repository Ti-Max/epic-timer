import * as THREE from 'three';

export class Scene {
    constructor() {
        //basic scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

        renderer.setSize(canvas.width, canvas.height);
        scene.background = new THREE.Color(0xCCffCC);

        this.update = function () {
            renderer.render(scene, camera);
        };

        this.onWindowResize = function () {
            camera.aspect = canvas.innerWidth / canvas.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(canvas.width, canvas.height);
        };

        this.onKeyDown = function (event) {
        };

        this.onKeyUp = function (event) {
        };
        
    }
}