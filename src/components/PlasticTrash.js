/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Engine, Render, World, Body, Bodies } from 'matter-js';
import { plasticState } from '../states';
import { plasticPercentState } from '../selector';
import { BLUE_THRESHOLD, RED_THRESHOLD } from '../constants';
import bg1 from '../assets/plastic_kits/bg1.svg';
import bg2 from '../assets/plastic_kits/bg2.svg';
import bg3 from '../assets/plastic_kits/bg3.svg';

const STATIC_DENSITY = 15;
const PARTICLE_SIZE = 40;
const PARTICLE_BOUNCINESS = 0.5;

// console.log(document.getElementById('plastic1'));

const PlasticTrash = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const [constraints, setConstraints] = useState();
  const [scene, setScene] = useState();
  const [initialized, setInitialized] = useState(false);
  const [numPlastics, setNumPlastics] = useRecoilState(plasticState);
  const plasticPercent = useRecoilValue(plasticPercentState);

  const handleResize = useCallback(() => {
    setConstraints(boxRef.current.getBoundingClientRect());
  });

  const handleClick = useCallback(() => {
    if (scene) {
      addPlastic(1);
      setNumPlastics(numPlastics + 1);
    }
  });

  const addPlastic = (iteration = 1) => {
    if (constraints) {
      const { width } = constraints;

      const randomX = Math.floor(Math.random() * -width) + width;
      //   const arrow = Vertices.fromPath(
      //     '40 0 40 20 100 20 100 80 40 80 40 100 0 50',
      //   );
      //   const plastic = [
      //     Svg.pathToVertices(document.getElementById('plastic1'), 30),
      //   ];

      // Bodies.fromVertices(
      //   randomX,
      //   0,
      //   plastic,
      //   {
      //     render: {
      //       fillStyle: '#556270',
      //       strokeStyle: '#556270',
      //       lineWidth: 1,
      //     },
      //   },
      //   true,
      // ),
      const plastic = [];
      for (let i = 0; i < iteration; i += 1) {
        plastic.push(
          Bodies.circle(randomX, -PARTICLE_SIZE, PARTICLE_SIZE, {
            restitution: PARTICLE_BOUNCINESS,
          }),
        );
      }
      setTimeout(() => {
        World.add(scene.engine.world, plastic);
      }, 500);
    }
  };

  const resizeRect = (rect, side, width, height) => {
    let [posX, posY] = [0, 0];
    let [topLeftX, topLeftY] = [0, 0];
    let [topRightX, topRightY] = [0, 0];
    let [bottomRightX, bottomRightY] = [0, 0];
    let [bottomLeftX, bottomLeftY] = [0, 0];

    switch (side) {
      case 'floor':
        [posX, posY] = [width / 2, height + STATIC_DENSITY / 2];
        [topLeftX, topLeftY] = [0, height];
        [topRightX, topRightY] = [width, height];
        [bottomRightX, bottomRightY] = [width, height + STATIC_DENSITY];
        [bottomLeftX, bottomLeftY] = [0, height + STATIC_DENSITY];
        break;
      case 'left':
        [posX, posY] = [-STATIC_DENSITY / 2, 500];
        [topLeftX, topLeftY] = [0, -500];
        [topRightX, topRightY] = [STATIC_DENSITY, -500];
        [bottomRightX, bottomRightY] = [STATIC_DENSITY, height * 2];
        [bottomLeftX, bottomLeftY] = [0, height * 2];
        break;
      case 'right':
        [posX, posY] = [width + STATIC_DENSITY / 2, 500];
        [topLeftX, topLeftY] = [width - STATIC_DENSITY, -500];
        [topRightX, topRightY] = [width, -500];
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
    const { width, height } = constraints || {};
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

    setConstraints(boxRef.current.getBoundingClientRect());
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

      if (!initialized) {
        addPlastic(numPlastics);
        setInitialized(!initialized);
      }
    }
  }, [scene, constraints]);

  return (
    <>
      <button
        type="button"
        style={{
          cursor: 'pointer',
          display: 'block',
          width: '300px',
          textAlign: 'center',
          marginBottom: '16px',
        }}
        onClick={() => handleClick()}
      >
        Generate
      </button>
      <div style={{ position: 'relative', width: '300px', height: '608px' }}>
        <div
          ref={boxRef}
          style={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              position: 'absolute',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '38px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -25%)',
            }}
          >
            {`${plasticPercent}%`}
          </p>
          <img
            src={
              plasticPercent >= RED_THRESHOLD
                ? bg3
                : plasticPercent >= BLUE_THRESHOLD
                ? bg2
                : bg1
            }
            style={{ position: 'absolute', zIndex: -1 }}
            alt="bg"
          />
          <canvas ref={canvasRef} />
        </div>
      </div>
    </>
  );
};

export default PlasticTrash;
