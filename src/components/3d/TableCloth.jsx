import React, { useMemo } from 'react';
import { COLORS } from '../../constants';
import * as THREE from 'three';

export const TableCloth = () => {
    // Generating a procedurally deformed plane to simulate drape without expensive runtime softbody physics
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(6.5, 4.5, 64, 64);
        const pos = geo.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);

            // Simulating edges hanging down
            const distX = Math.abs(x) - 2.8;
            const distY = Math.abs(y) - 1.8;

            let zOffset = 0;

            if (distX > 0 || distY > 0) {
                const falloff = Math.max(distX, 0) + Math.max(distY, 0);
                zOffset = -Math.pow(falloff * 2, 1.5); // Curve downwards

                // Add ripples
                zOffset += Math.sin(x * 10) * 0.05 * falloff;
                zOffset += Math.cos(y * 10) * 0.05 * falloff;
            }

            pos.setZ(i, zOffset);
        }

        geo.computeVertexNormals();
        return geo;
    }, []);

    return (
        <mesh
            geometry={geometry}
            position={[0, 2.51, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
        >
            <meshStandardMaterial
                color={COLORS.cloth}
                roughness={0.9}
                metalness={0.1}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export default TableCloth;
