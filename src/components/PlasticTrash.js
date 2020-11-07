import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Engine,
  Render,
  World,
  Body,
  Bodies,
  Vertices,
  Svg,
  Common,
} from 'matter-js';
import decomp from 'poly-decomp';

window.decomp = decomp;

const STATIC_DENSITY = 15;
// const PARTICLE_SIZE = 30;
// const PARTICLE_BOUNCYNESS = 0.3;

const PlasticTrash = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const [constraints, setContraints] = useState();
  const [scene, setScene] = useState();

  const handleResize = useCallback(() => {
    setContraints(boxRef.current.getBoundingClientRect());
  });

  const handleClick = useCallback(() => {
    // Add a new "ball" everytime `someStateValue` changes
    if (scene) {
      const { width } = constraints;
      const randomX = Math.floor(Math.random() * -width) + width;
      const arrow = Vertices.fromPath(
        '40 0 40 20 100 20 100 80 40 80 40 100 0 50',
      );
      //   const plastic = Svg.pathToVertices()
      World.add(
        scene.engine.world,
        // Bodies.circle(randomX, -PARTICLE_SIZE, PARTICLE_SIZE, {
        //   restitution: PARTICLE_BOUNCYNESS,
        // }),
        Bodies.fromVertices(
          randomX,
          0,
          Common.choose([arrow]),
          {
            render: {
              fillStyle: '#556270',
              strokeStyle: '#556270',
              lineWidth: 1,
            },
          },
          true,
        ),
      );
    }
  });

  const resizeRect = (rect, side, width, height) => {
    let [posX, posY] = [0, 0];
    let [topLeftX, topLeftY] = [0, 0];
    let [topRightX, topRightY] = [0, 0];
    let [bottomRightX, bottomRightY] = [0, 0];
    let [bottomLeftX, bottomLeftY] = [0, 0];

    switch (side) {
      case 'floor':
        [posX, posY] = [width / 2, height - STATIC_DENSITY / 2];
        [topLeftX, topLeftY] = [0, height];
        [topRightX, topRightY] = [width, height];
        [bottomRightX, bottomRightY] = [width, height + STATIC_DENSITY];
        [bottomLeftX, bottomLeftY] = [0, height + STATIC_DENSITY];
        break;
      case 'left':
        [posX, posY] = [STATIC_DENSITY / 2, 0];
        [topLeftX, topLeftY] = [0, 0];
        [topRightX, topRightY] = [STATIC_DENSITY, 0];
        [bottomRightX, bottomRightY] = [STATIC_DENSITY, height * 2];
        [bottomLeftX, bottomLeftY] = [0, height * 2];
        break;
      case 'right':
        [posX, posY] = [width - STATIC_DENSITY / 2, 0];
        [topLeftX, topLeftY] = [width - STATIC_DENSITY, 0];
        [topRightX, topRightY] = [width, 0];
        [bottomRightX, bottomRightY] = [width, height * 2];
        [bottomLeftX, bottomLeftY] = [width - STATIC_DENSITY, height * 2];
        break;
      default:
        break;
    }
    Body.setPosition(rect, {
      x: posX,
      y: posY,
    });
    Body.setVertices(rect, [
      { x: topLeftX, y: topLeftY },
      { x: topRightX, y: topRightY },
      { x: bottomRightX, y: bottomRightY },
      { x: bottomLeftX, y: bottomLeftY },
    ]);
  };

  useEffect(() => {
    let width;
    let height;
    if (constraints) {
      width = constraints.width;
      height = constraints.height;
    }
    const engine = Engine.create({});
    const render = Render.create({
      element: boxRef.current,
      engine,
      canvas: canvasRef.current,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
      },
    });
    const box = [1, 2, 3].map(() =>
      Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
        isStatic: true,
        render: {
          fillStyle: 'blue',
        },
      }),
    );
    World.add(engine.world, box);
    Engine.run(engine);
    Render.run(render);
    setContraints(boxRef.current.getBoundingClientRect());
    setScene(render);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (constraints) {
      const { width, height } = constraints;
      // Dynamically update canvas and bounds
      scene.bounds.max.x = width;
      scene.bounds.max.y = height;
      scene.options.width = width;
      scene.options.height = height;
      scene.canvas.width = width;
      scene.canvas.height = height;
      // Dynamically update floor
      const box = scene.engine.world.bodies;
      resizeRect(box[0], 'floor', width, height);
      resizeRect(box[1], 'left', width, height);
      resizeRect(box[2], 'right', width, height);
    }
  }, [scene, constraints]);

  return (
    <div
      style={{
        position: 'relative',
        height: '500px',
        width: '300px',
      }}
    >
      <button
        type="button"
        style={{
          cursor: 'pointer',
          display: 'block',
          width: '100%',
          textAlign: 'center',
          marginBottom: '16px',
        }}
        onClick={() => handleClick()}
      >
        Generate
      </button>
      <div
        ref={boxRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default PlasticTrash;
