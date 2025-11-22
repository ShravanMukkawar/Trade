import React, { useMemo, useEffect, useRef } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

// Robot whose neck/head follow the cursor
export function HeadTrackingRobot(props) {
  const { scene } = useGLTF("/Secondary_robot_rigged.glb");

  // Clone the scene so it can be safely animated
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // Try to grab head bone by exact name or by partial match
  const head =
    nodes["mixamorig:Head"] ||
    Object.values(nodes).find((n) => n?.name && n.name.includes("Head"));

  // Store a global, normalized cursor position so head reacts even when mouse is not over the canvas
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1; // [-1, 1]
      const y = (e.clientY / window.innerHeight) * 2 - 1; // [-1, 1]
      cursorRef.current.x = x;
      cursorRef.current.y = y;
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  // Animate only the head toward cursor position (keep neck fixed to avoid shoulder stretching)
  useFrame(() => {
    if (!head) return;

    const { x, y } = cursorRef.current;

    // x/y are in [-1, 1]; increase factors for stronger motion
    const targetYaw = x * 0.8; // left/right
    const targetPitch = y * 0.5; // up/down (positive looks down, negative looks up)

    // Smoothly interpolate head rotation toward target (slightly faster response)
    head.rotation.y += (targetYaw - head.rotation.y) * 0.25;
    head.rotation.x += (targetPitch - head.rotation.x) * 0.25;
  });

  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={
            nodes.node_105cbe82_036a_4f3d_92ca_ece54745f2d1_mesh0.geometry
          }
          material={materials.mat_0}
          skeleton={
            nodes.node_105cbe82_036a_4f3d_92ca_ece54745f2d1_mesh0.skeleton
          }
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Secondary_robot_rigged.glb");
