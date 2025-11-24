import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { Physics } from '@react-three/rapier';
import { Table } from './Table';
import { TableCloth } from './TableCloth';
import { BirthdayCake } from './BirthdayCake';

export const Scene = ({ candlesLit, icingColor, baseColor, frostingColor, candles, cakeText, hoverMessage, hoverMessageColor }) => {
    return (
        <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
            <PerspectiveCamera makeDefault position={[0, 4, 12]} fov={50} />

            <color attach="background" args={['#fce7f3']} />

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <spotLight
                position={[5, 10, 5]}
                angle={0.5}
                penumbra={1}
                intensity={1.2}
                castShadow
                shadow-bias={-0.0001}
            />
            <pointLight position={[-3, 6, -3]} intensity={0.5} color="#ffffff" />
            <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#444444" />

            <Suspense fallback={null}>
                <Environment preset="studio" blur={0.8} />

                <Physics gravity={[0, -9.81, 0]}>
                    <Table />
                    <TableCloth />
                    <BirthdayCake
                        candlesLit={candlesLit}
                        icingColor={icingColor}
                        baseColor={baseColor}
                        frostingColor={frostingColor}
                        candles={candles}
                        cakeText={cakeText}
                        hoverMessage={hoverMessage}
                        hoverMessageColor={hoverMessageColor}
                    />
                </Physics>

                <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
            </Suspense>

            <OrbitControls
                enablePan={false}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2 - 0.1}
                dampingFactor={0.05}
                minDistance={2}
                maxDistance={50}
            />

            {/* <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                <Noise opacity={0.02} />
            </EffectComposer> */}
        </Canvas>
    );
};

export default Scene;
