import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';

export default function Cake() {
    const { cakeConfig } = useStore();
    const group = useRef();
    const [lit, setLit] = useState(true);

    // Simple animation
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = Math.sin(t / 4) * 0.1;
    });

    const toggleCandles = (e) => {
        e.stopPropagation();
        setLit(!lit);
    };

    return (
        <group ref={group} position={[0, 0.1, 0]} onClick={toggleCandles}>
            {/* Base Layer */}
            <mesh castShadow position={[0, 0.5, 0]}>
                <cylinderGeometry args={[1, 1, 1, 32]} />
                <meshStandardMaterial
                    color={cakeConfig.baseColor}
                    roughness={0.9}
                    metalness={0}
                />
            </mesh>

            {/* Frosting/Icing Drips (Simplified as a top layer for now) */}
            <mesh position={[0, 1.01, 0]}>
                <cylinderGeometry args={[1.02, 1.02, 0.1, 32]} />
                <meshStandardMaterial
                    color={cakeConfig.frostingColor}
                    roughness={0.7}
                    metalness={0}
                />
            </mesh>

            {/* Candles */}
            {Array.from({ length: cakeConfig.candles }).map((_, i) => {
                const angle = (i / cakeConfig.candles) * Math.PI * 2;
                const x = Math.cos(angle) * 0.5;
                const z = Math.sin(angle) * 0.5;
                return (
                    <group key={i} position={[x, 1.1, z]}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
                            <meshStandardMaterial color="#FFD700" />
                        </mesh>
                        {/* Flame */}
                        {lit && (
                            <mesh position={[0, 0.25, 0]}>
                                <sphereGeometry args={[0.05, 8, 8]} />
                                <meshBasicMaterial color="orange" />
                            </mesh>
                        )}
                    </group>
                );
            })}
        </group>
    );
}
