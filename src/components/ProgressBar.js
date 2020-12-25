import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProgressBar = ({ percentage, speed, width, bgColor, progressColor }) => {
  const [progressBar, setProgressBar] = useState(0);
  const pace = percentage / speed;

  const updatePercentage = () => {
    setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, pace);
  };

  useEffect(
    () => {
      if (percentage > 0) updatePercentage();
    },
    [percentage]
  );

  useEffect(
    () => {
      if (progressBar < percentage) updatePercentage();
    },
    [progressBar]
  );

  return (
    <Svg width={width} viewBox="0 0 36 36">
      <Background
        bgColor={bgColor}
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <Progress
        isVisible={percentage ? 1 : 0}
        progressColor={progressColor}
        strokeDasharray={`${progressBar} ${100 - progressBar}`}
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <Text progressColor={progressColor} x="50%" y="57%">
        {percentage}%
      </Text>
    </Svg>
  );
};

const Svg = styled.svg`
  width: ${props => props.width};
`;

const Progress = styled.path`
  stroke: ${props => props.progressColor};
  stroke-width: ${props => (props.isVisible ? 2 : 0)};
  fill: none;
  stroke-linecap: round;
`;

const Background = styled.path`
  stroke: ${props => props.bgColor};
  fill: none;
  stroke-width: 2;
`;

const Text = styled.text`
  fill: ${props => props.progressColor};
  font-size: 0.9rem;
  text-anchor: middle;
`;

export default ProgressBar;
