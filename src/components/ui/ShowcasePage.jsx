import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Scene from '../3d/Scene';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function ShowcasePage() {
    const { id } = useParams();
    const { cakeConfig } = useStore(); // In a real app, we'd fetch config by ID

    return (
        <div className="flex flex-col h-screen w-full bg-pastel-cream relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Scene candlesLit={true} icingColor={cakeConfig.icingColor} baseColor={cakeConfig.baseColor} frostingColor={cakeConfig.frostingColor} candles={cakeConfig.candles} cakeText={cakeConfig.cakeText} />
            </div>

            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 pointer-events-none">
                <Link to="/" className="pointer-events-auto bg-white/80 p-3 rounded-full shadow hover:bg-white transition-colors">
                    🏠 Home
                </Link>
                <div className="bg-white/80 px-6 py-2 rounded-full shadow backdrop-blur-sm">
                    <span className="font-bold text-bakery-brown">Cake #{id}</span>
                </div>
            </div>


        </div>
    );
}
