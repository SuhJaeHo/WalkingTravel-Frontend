import React, { useState } from "react";

import { ViroARScene, ViroImage } from "@viro-community/react-viro";
import { ViroARSceneNavigator } from "@viro-community/react-viro";

import { useSelector } from "react-redux";

import { getArrow, getRotation } from "../utils/utils";

const GuideScene = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);

  const isNear = useSelector(state => state.destination.destination.isNear);
  const bearings = useSelector(state => state.destination.destination.bearings);

  const rotateArrow = () => {
    const arrow = isNear ? getArrow(bearings[0], bearings[1]) : getArrow(bearings[0], bearings[0]);
    setRotation(getRotation(arrow));
  };

  return (
    <ViroARScene>
      <ViroImage
        source={require("../assets/arrow.png")}
        width={2}
        height={2}
        position={[0, 0, -5]}
        rotation={rotation}
        onLoadEnd={() => rotateArrow()}
      />
    </ViroARScene>
  );
};

export default function ARRouter() {
  return (
    <ViroARSceneNavigator
      style={{ flex: 1 }}
      initialScene={{
        scene: GuideScene,
      }}
    />
  );
}
