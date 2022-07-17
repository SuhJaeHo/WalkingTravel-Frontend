import React, { useState } from "react";

import { StyleSheet } from "react-native";

import { ViroARScene, ViroImage } from "@viro-community/react-viro";
import { ViroARSceneNavigator } from "@viro-community/react-viro";

import { useSelector } from "react-redux";

import { getArrow, getRotation, getDistance } from "../utils/utils";

const GuideScene = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);

  const routes = useSelector(state => state.destination.destination.routes);
  const bearings = useSelector(state => state.destination.destination.bearings);
  const currentPointIndex = useSelector(state => state.destination.destination.currentPointIndex);
  const currentRegion = useSelector(state => state.user.currentRegion);

  const rotateArrow = () => {
    let arrow = getArrow(bearings[currentPointIndex], bearings[currentPointIndex + 1]);

    if (bearings[currentPointIndex + 2]) {
      if (
        bearings[currentPointIndex] === bearings[currentPointIndex + 1] &&
        getDistance(routes[currentPointIndex + 1], routes[currentPointIndex + 2]) < 10
      ) {
        arrow = getArrow(bearings[currentPointIndex], bearings[currentPointIndex + 2]);
      }
    }

    const prevPoint = currentRegion;
    const nextPoint = routes[currentPointIndex + 1];

    const distanceToNextPoint = getDistance(prevPoint, nextPoint);

    if (distanceToNextPoint > 20) arrow = "straight";

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

const styles = StyleSheet.create({
  distanceText: {
    fontSize: 20,
    fontWeight: "800",
    color: "black",
  },
});
