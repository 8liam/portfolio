/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: alexeyshadrin80 (https://sketchfab.com/alexeyshadrin80)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/grid-b9df4bebf73d44caa241680b01943266
Title: Grid
*/
/* npx gltfjsx public/models/Grid.glb -S -T -t */

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Grid(props) {
  const { nodes, materials } = useGLTF('/models/Grid-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Empty_Mesh_gr1_0.geometry}
        material={materials.material}
        rotation={[-Math.PI, 0, -Math.PI]}
      />
    </group>
  )
}

useGLTF.preload('/models/Grid-transformed.glb')
