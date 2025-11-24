import React, { useState } from 'react';
import Scene from '../3d/Scene';
import CustomizerPanel from './CustomizerPanel';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export default function CakeCreator() {
    const navigate = useNavigate();
    const { cakeConfig, randomizeCake } = useStore();
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    React.useEffect(() => {
        randomizeCake();
    }, []);

    const handleBake = () => {
        // In a real app, we would save to Supabase here
        const mockId = Math.random().toString(36).substring(7);
        navigate(`/${mockId}`);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gradient-to-b from-pink-100 to-purple-200">
            {/* 3D Preview Panel */}
            <div className="w-full md:w-2/3 h-full relative flex items-center justify-center">
                <Scene
                    candlesLit={true}
                    icingColor={cakeConfig.icingColor}
                    baseColor={cakeConfig.baseColor}
                    frostingColor={cakeConfig.frostingColor}
                    candles={cakeConfig.candles}
                    cakeText={cakeConfig.cakeText}
                    hoverMessage={cakeConfig.hoverMessage}
                    hoverMessageColor={cakeConfig.hoverMessageColor}
                />
                <Link to="/" className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all z-20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-bakery-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </Link>
            </div>

            {/* Floating Toggle Button (Mobile Only) */}
            <button
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className="md:hidden fixed top-4 right-4 bg-white/90 backdrop-blur-sm text-bakery-brown p-2.5 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all z-40 flex items-center justify-center"
                aria-label="Toggle customization panel"
            >
                {isPanelOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Overlay for mobile when panel is open */}
            {isPanelOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsPanelOpen(false)}
                />
            )}

            {/* Customization Panel */}
            <div className={`
                fixed md:relative inset-y-0 right-0 w-80 md:w-1/3 
                bg-white/90 md:bg-white/30 backdrop-blur-md shadow-2xl 
                z-40 md:z-10 flex flex-col border-l border-white/50
                transform transition-transform duration-300 ease-in-out
                ${isPanelOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            `}>
                <div className="p-6 border-b border-white/20">
                    <h2 className="text-4xl font-cursive text-bakery-brown text-center drop-shadow-sm">Design Your Cake</h2>
                </div>

                <div className="flex-1 overflow-hidden">
                    <CustomizerPanel />
                </div>

                <div className="p-6 border-t border-white/20 bg-white/10">
                    <button
                        onClick={handleBake}
                        className="w-full py-4 bg-white/80 backdrop-blur-sm text-bakery-brown font-bold text-xl rounded-full shadow-lg hover:bg-white hover:shadow-2xl hover:scale-105 transition-all border-2 border-white/50"
                    >
                        Bake Now!
                    </button>
                </div>
            </div>
        </div>
    );
}
