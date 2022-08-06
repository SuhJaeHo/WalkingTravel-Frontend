import React, { useState } from "react";

import { ViroARScene, ViroImage, ViroAnimations } from "@viro-community/react-viro";
import { ViroARSceneNavigator } from "@viro-community/react-viro";

import { useSelector } from "react-redux";

import { getArrowByBearing, getArrowByCompassHeading, getRotation } from "../utils/arArrow";
import { getDistance } from "../utils/distance";

const GuideScene = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, -5]);
  const [animation, setAnimation] = useState("moveRightLeft");

  const conformedRoutes = useSelector(state => state.destination.conformedRoutes);
  const conformedBearings = useSelector(state => state.destination.conformedBearings);
  const currentRouteIndex = useSelector(state => state.destination.currentRouteIndex);

  const currentRegion = useSelector(state => state.user.currentRegion);
  const compassHeading = useSelector(state => state.user.compassHeading);

  const rotateArrow = () => {
    const distanceToNextRoute = getDistance(currentRegion, conformedRoutes[currentRouteIndex + 1]);

    if (!currentRouteIndex) {
      const arrow = getArrowByCompassHeading(compassHeading, conformedBearings[currentRouteIndex]);
      setRotation(getRotation(arrow));

      return;
    }

    if (distanceToNextRoute > 30) {
      const arrow = "straight";

      setPosition([0, -1, -5]);
      setAnimation("moveNone");
      setRotation(getRotation(arrow));

      return;
    }

    const arrow = getArrowByBearing(conformedBearings[currentRouteIndex], conformedBearings[currentRouteIndex + 1]);

    if (arrow === "right") setAnimation("moveLeftRight");
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
      {currentRouteIndex === conformedRoutes.length - 1 ? (
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
