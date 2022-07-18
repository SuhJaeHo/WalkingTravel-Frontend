import React, { useState } from "react";

import { StyleSheet } from "react-native";

import { ViroARScene, ViroImage, ViroAnimations } from "@viro-community/react-viro";
import { ViroARSceneNavigator } from "@viro-community/react-viro";

import { useSelector } from "react-redux";

import { getArrow, getRotation, getDistance } from "../utils/utils";

const GuideScene = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, -5]);
  const [animation, setAnimation] = useState("moveRightLeft");

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

    if (currentPointIndex !== routes.length - 1) {
      const prevPoint = currentRegion;
      const nextPoint = routes[currentPointIndex + 1];

      const distanceToNextPoint = getDistance(prevPoint, nextPoint);

      if (distanceToNextPoint > 20) arrow = "straight";
    }

    if (arrow === "right") setAnimation("moveLeftRight");

    if (arrow === "left") setAnimation("moveRightLeft");

    if (arrow === "straight") {
      setPosition([0, -1, -5]);
      setAnimation("moveNone");
    }

    setRotation(getRotation(arrow));
  };

  ViroAnimations.registerAnimations({
    moveRight: {
      duration: 1000,
      properties: { positionX: "+=0.3" },
      easing: "EaseIn",
    },
    moveLeft: {
      duration: 1000,
      properties: { positionX: "-=0.3" },
      easing: "EaseIn",
    },
    moveNone: {
      duration: 1000,
      properties: { positionX: "0" },
    },
    moveUp: {
      duration: 1000,
      properties: { positionY: "+=0.3" },
      easing: "EaseIn",
    },
    moveDown: {
      duration: 1000,
      properties: { positionY: "-=0.3" },
      easing: "EaseIn",
    },
    moveRightLeft: [["moveRight", "moveLeft"]],
    moveLeftRight: [["moveLeft", "moveRight"]],
    moveUpDown: [["moveUp", "moveDown"]],
  });

  return (
    <ViroARScene>
      {currentPointIndex === routes.length - 1 ? (
        <ViroImage
          source={require("../assets/arrivePing.png")}
          width={2}
          height={2}
          position={[0, 0, -5]}
          animation={{ name: "moveUpDown", loop: true, run: true, interruptible: true }}
        />
      ) : (
        <ViroImage
          source={require("../assets/arrow.png")}
          width={2}
          height={2}
          position={position}
          rotation={rotation}
          onLoadEnd={() => rotateArrow()}
          animation={{ name: animation, loop: true, run: true, interruptible: true }}
        />
      )}
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
