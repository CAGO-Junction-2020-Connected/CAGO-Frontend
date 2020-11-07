/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { plasticPercentState } from '../selector';
import whale from '../assets/animation_kits/whale.gif';
import turtle from '../assets/animation_kits/turtle.gif';
import seagull from '../assets/animation_kits/seagull.gif';
import './EnvChart.css';

const EnvChart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const plasticPercent = useRecoilValue(plasticPercentState);

  const handleMouseEnter = (e) => {
    const animationElement = e.target;
    animationElement.style.animationPlayState = 'paused';
    animationElement.style.webkitAnimationPlayState = 'paused';
  };

  const handleClick = (target) => {
    const tooltip = document.getElementsByClassName('tooltiptext')[0];
    setModalVisible(!modalVisible);
    const visibility = modalVisible ? 'visible' : 'hidden';
    tooltip.style.visibility = visibility;
  };

  const handleMouseLeave = (e) => {
    const animationElement = e.target;
    animationElement.style.animationPlayState = 'running';
    animationElement.style.webkitAnimationPlayState = 'running';
  };

  return (
    <div className="chart" onClick={handleClick}>
      <div
        className="tooltip whale-anim"
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
      >
        <img src={whale} alt="whale" className="object whale" />
      </div>
      <div
        className="tooltip turtle-anim"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={turtle} alt="turtle" className="object turtle" />
      </div>
      <div
        className="tooltip seagull-anim"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={seagull} alt="seagull" className="object seagull" />
      </div>
      <div className="tooltiptext">
        <pre>
          {`Your monthly usage: ${plasticPercent}%\n\nYou have saved\nN seagulls\nM turtles\n or O whales`}
        </pre>
      </div>
    </div>
  );
};

export default EnvChart;
