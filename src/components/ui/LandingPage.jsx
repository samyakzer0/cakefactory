import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Loader } from '@react-three/drei';
import { CakeShopModel } from '../3d/CakeShopModel';
import RotatingText from './RotatingText';

const LandingPage = () => {
    return (
        <div className="w-full h-screen relative bg-gradient-to-b from-pink-100 to-purple-200">

            <div className="absolute top-10 w-full text-center z-10 pointer-events-none flex flex-col items-center justify-center">
                <div className="flex items-center justify-center text-6xl md:text-8xl font-cursive text-bakery-brown drop-shadow-sm mb-2">
                    <span>Bake</span>
                    <RotatingText
                        texts={['Love', 'Cake']}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-pastel-pink text-bakery-brown overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg ml-4"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                    />
                </div>
            </div>

            <Canvas shadows camera={{ position: [10, 8, 10], fov: 45 }}>
                <fog attach="fog" args={['#fce7f3', 10, 40]} />
                <Suspense fallback={null}>
                    <group position={[0, -1, 0]}>
                        <CakeShopModel />

                        {/* Ground Plane */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
                            <planeGeometry args={[50, 50]} />
                            <meshStandardMaterial color="#e0e7ff" />
                        </mesh>

                        <ContactShadows
                            opacity={0.5}
                            scale={20}
                            blur={2}
                            far={4}
                            resolution={256}
                            color="#000000"
                        />
                    </group>

                    <Environment preset="sunset" />
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[5, 10, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize={[1024, 1024]}
                    />
                </Suspense>
                <OrbitControls
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2 - 0.1}
                    enablePan={false}
                    minDistance={5}
                    maxDistance={50}
                />
            </Canvas>
            <Loader />
        </div>
    );
};

export default LandingPage;
