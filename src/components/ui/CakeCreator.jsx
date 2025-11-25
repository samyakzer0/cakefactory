import React, { useState } from 'react';
import Scene from '../3d/Scene';
import CustomizerPanel from './CustomizerPanel';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { saveCake } from '../../services/cakeService';
import confetti from 'canvas-confetti';

export default function CakeCreator() {
    const navigate = useNavigate();
    const { cakeConfig, randomizeCake } = useStore();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const triggerConfetti = () => {
        const scalar = 2;
        const triangle = confetti.shapeFromPath({
            path: "M0 10 L5 0 L10 10z",
        });
        const square = confetti.shapeFromPath({
            path: "M0 0 L10 0 L10 10 L0 10 Z",
        });
        const coin = confetti.shapeFromPath({
            path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
        });
        const tree = confetti.shapeFromPath({
            path: "M5 0 L10 10 L0 10 Z",
        });

        const defaults = {
            spread: 360,
            ticks: 60,
            gravity: 0,
            decay: 0.96,
            startVelocity: 20,
            shapes: [triangle, square, coin, tree],
            scalar,
        };

        const shoot = () => {
            confetti({
                ...defaults,
                particleCount: 30,
            });

            confetti({
                ...defaults,
                particleCount: 5,
            });

            confetti({
                ...defaults,
                particleCount: 15,
                scalar: scalar / 2,
                shapes: ["circle"],
            });
        };

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    };

    const handleBake = async () => {
        // Trigger confetti animation
        triggerConfetti();

        setIsSaving(true);
        setError(null);

        try {
            const { data, error } = await saveCake(cakeConfig);

            if (error) {
                setError('Failed to save your cake. Please try again.');
                setIsSaving(false);
                return;
            }

            // Navigate to the shareable URL
            navigate(`/${data.id}`);
        } catch (err) {
            console.error('Error saving cake:', err);
            setError('Something went wrong. Please try again.');
            setIsSaving(false);
        }
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
                    {error && (
                        <div className="mb-3 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <button
                        onClick={handleBake}
                        disabled={isSaving}
                        className="w-full py-4 bg-white/80 backdrop-blur-sm text-bakery-brown font-bold text-xl rounded-full shadow-lg hover:bg-white hover:shadow-2xl hover:scale-105 transition-all border-2 border-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {isSaving ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Baking...
                            </span>
                        ) : (
                            'Bake Now!'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
