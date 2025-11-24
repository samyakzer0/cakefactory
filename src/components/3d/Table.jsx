import React from 'react';
import { COLORS } from '../../constants';

export const Table = () => {
    return (
        <group position={[0, 2.35, 0]}>
            {/* Table Top */}
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
                <boxGeometry args={[6, 0.3, 4]} />
                <meshStandardMaterial
                    color={COLORS.table}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {/* Legs */}
            {[
                [-2.8, -1.4, -1.8],
                [2.8, -1.4, -1.8],
                [-2.8, -1.4, 1.8],
                [2.8, -1.4, 1.8],
            ].map((pos, idx) => (
                <mesh key={idx} position={pos} castShadow receiveShadow>
                    <cylinderGeometry args={[0.15, 0.15, 2.5, 16]} />
                    <meshStandardMaterial color={COLORS.table} roughness={0.7} />
                </mesh>
            ))}
        </group>
    );
};

export default Table;
