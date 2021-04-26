import { Suspense, useRef } from 'react'
import { Canvas, extend, useThree, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, VOXLoader, VOXMesh } from 'three-stdlib'
import { Vector3 } from 'three'
import PropTypes from 'prop-types'

extend({ OrbitControls })

const CameraControls = ({ width, height }) => {
  const {
    camera,
    gl: { domElement }
  } = useThree()

  const controls = useRef()
  useFrame((state) => controls.current.update())

  console.log(new Vector3((2.5 * width) - 2.5, 0, (5 * height) - 10))

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      target={new Vector3((2.5 * width) - 2.5, 0, (2.5 * height) - 1.5)}
      enablePan={false}
      enableZoom={false}
      maxPolarAngle={1.5}
      minPolarAngle={1}
      minDistance={40}
    />
  )
}

CameraControls.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

const Loading = () => {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}

const Voxel = ({ model, position }) => {
  const vox = useLoader(VOXLoader, model)

  return vox.map((chunk, index) => {
    const mesh = new VOXMesh(chunk)
    mesh.position.set(...position)
    mesh.scale.set(0.9, 0.9, 0.9)
    mesh.castShadow = true
    mesh.receiveShadow = true
    return <primitive key={index} object={mesh} />
  })
}

Voxel.propTypes = {
  model: PropTypes.string,
  position: PropTypes.array
}

export default function Garden ({ garden }) {
  return (
    <Canvas>
      <CameraControls width={garden.length} height={garden[0].length} />
      <ambientLight intensity={0.4} />
      <pointLight position={[30, 5, 20]} intensity={0.3} />
      <Suspense fallback={<Loading />}>
        {
          garden.map((row, i) => {
            return row.map((plant, j) => {
              return plant
                ? <Voxel key={`${i}${j}`} model={plant} position={[5 * i, 0, 5 * j]} />
                : null
            })
          })
        }
      </Suspense>
    </Canvas>
  )
}

Garden.propTypes = {
  garden: PropTypes.arrayOf(PropTypes.array)
}
