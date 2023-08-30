import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import Message from "./Message";

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current === null) return;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set camera position
    camera.position.z = 5;

    // Render the scene
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
    console.log("render");
    // Clean up on component unmount
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div ref={canvasRef} />
        <Message />
    </>
  );
}

export default App;
