import React from 'react';
import { useMemo } from 'react';
import { Text3D, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FONT_URL } from '../../constants';

export const BirthdayCake = ({ icingColor, baseColor, frostingColor, candles = 0, cakeText = 'Happy Birthday', hoverMessage, hoverMessageColor }) => {
    // Generate candle positions in a circle
    const candlePositions = useMemo(() => {
        if (candles === 0) return [];
        const radius = 0.8; // Increased radius to avoid text overlap
        const positions = [];
        for (let i = 0; i < candles; i++) {
            const angle = (i / candles) * Math.PI * 2;
            positions.push({
                x: Math.cos(angle) * radius,
                z: Math.sin(angle) * radius,
                color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'][i % 8]
            });
        }
        return positions;
    }, [candles]);

    return (
        <group position={[0, 2.52, 0]}>
            {/* Bottom Cake Layer */}
            <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
                <cylinderGeometry args={[1.2, 1.2, 0.8, 32]} />
                <meshStandardMaterial
                    color={baseColor || '#FFB7B2'}
                    roughness={0.9}
                    metalness={0.0}
                />
            </mesh>

            {/* Bottom Layer Frosting */}
            <mesh position={[0, 0.81, 0]}>
                <cylinderGeometry args={[1.22, 1.22, 0.05, 32]} />
                <meshStandardMaterial
                    color={frostingColor || '#FDF5E6'}
                    roughness={0.8}
                    metalness={0.0}
                />
            </mesh>

            {/* Top Cake Layer */}
            <mesh castShadow receiveShadow position={[0, 1.3, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 0.8, 32]} />
                <meshStandardMaterial
                    color={baseColor || '#FFB7B2'}
                    roughness={0.9}
                    metalness={0.0}
                />
            </mesh>

            {/* Top Layer Frosting */}
            <mesh position={[0, 1.71, 0]}>
                <cylinderGeometry args={[0.92, 0.92, 0.05, 32]} />
                <meshStandardMaterial
                    color={frostingColor || '#FDF5E6'}
                    roughness={0.8}
                    metalness={0.0}
                />
            </mesh>

            {/* Decorative Icing Flowers on Bottom Layer */}
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const x = Math.cos(angle) * 1.2;
                const z = Math.sin(angle) * 1.2;
                return (
                    <group key={`flower-bottom-${i}`} position={[x, 0.5, z]} rotation={[0, -angle, 0]}>
                        <IcingFlower color={icingColor} />
                    </group>
                );
            })}

            {/* Decorative Icing Flowers on Top Layer */}
            {Array.from({ length: 10 }).map((_, i) => {
                const angle = (i / 10) * Math.PI * 2;
                const x = Math.cos(angle) * 0.9;
                const z = Math.sin(angle) * 0.9;
                return (
                    <group key={`flower-top-${i}`} position={[x, 1.4, z]} rotation={[0, -angle, 0]}>
                        <IcingFlower color={icingColor} scale={0.8} />
                    </group>
                );
            })}

            {/* Text on Top of Cake */}
            {cakeText && (
                <group position={[0, 1.74, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <Center disableZ key={cakeText}>
                        <Text3D
                            font={FONT_URL}
                            size={Math.max(0.12, Math.min(0.22, 1.5 / cakeText.length))}
                            height={0.03}
                            curveSegments={12}
                            bevelEnabled
                            bevelThickness={0.01}
                            bevelSize={0.005}
                            bevelSegments={5}
                            letterSpacing={0.02}
                        >
                            {cakeText}
                            <meshStandardMaterial
                                color={icingColor || '#AEC6CF'}
                                metalness={0}
                                roughness={0.8}
                            />
                        </Text3D>
                    </Center>
                </group>
            )}

            {/* Candles */}
            {candlePositions.map((pos, i) => (
                <group key={i} position={[pos.x, 1.75, pos.z]}>
                    {/* Candle Body */}
                    <mesh castShadow>
                        <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
                        <meshStandardMaterial color={pos.color} roughness={0.3} />
                    </mesh>

                    {/* Candle Wick */}
                    <mesh position={[0, 0.22, 0]}>
                        <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
                        <meshStandardMaterial color="#2C2C2C" />
                    </mesh>

                    {/* Flame */}
                    <mesh position={[0, 0.3, 0]}>
                        <coneGeometry args={[0.03, 0.12, 8]} />
                        <meshStandardMaterial
                            color="#FFA500"
                            emissive="#FF6B00"
                            emissiveIntensity={1.5}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>

                    {/* Flame Glow */}
                    <pointLight
                        position={[0, 0.3, 0]}
                        color="#FFA500"
                        intensity={0.3}
                        distance={1}
                    />
                </group>
            ))}
            {/* Floating Message */}
            {hoverMessage && (
                <group position={[0, 3.2, 0]}>
                    <FloatingText text={hoverMessage} color={hoverMessageColor} />
                </group>
            )}
        </group>
    );
};

const IcingFlower = ({ color, scale = 1 }) => {
    return (
        <mesh scale={scale} rotation={[Math.PI / 2, 0, 0]}>
            <torusKnotGeometry args={[0.06, 0.02, 64, 8, 2, 3]} />
            <meshStandardMaterial
                color={color || '#AEC6CF'}
                roughness={0.7}
                metalness={0.0}
            />
        </mesh>
    );
};

const FloatingText = ({ text, color }) => {
    const meshRef = React.useRef();

    // Simple floating animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            <Center disableZ key={text}>
                <Text3D
                    font={FONT_URL}
                    size={0.4}
                    height={0.05}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.01}
                    bevelSegments={5}
                >
                    {text}
                    <meshStandardMaterial
                        color={color || '#FFD700'}
                        metalness={0.8}
                        roughness={0.1}
                        emissive={color || '#FFD700'}
                        emissiveIntensity={0.2}
                    />
                </Text3D>
            </Center>
        </group>
    );
};

export default BirthdayCake;
