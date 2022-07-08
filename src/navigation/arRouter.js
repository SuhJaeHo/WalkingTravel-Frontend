import React from "react";

import { ViroARScene, ViroText } from "@viro-community/react-viro";
import { ViroARSceneNavigator } from "@viro-community/react-viro";

const initialScene = () => {
  return (
    <ViroARScene>
      <ViroText
        text={"Hello AR"}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -5]}
      />
    </ViroARScene>
  );
};

export default function ARRouter() {
  return (
    <ViroARSceneNavigator
      style={{ flex: 1 }}
      initialScene={{
        scene: initialScene,
      }}
    />
  );
}
