import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Scene from '../3d/Scene';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { getCakeById } from '../../services/cakeService';
import ShareButton from './ShareButton';

export default function ShowcasePage() {
    const { id } = useParams();
    const { cakeConfig, loadCakeConfig } = useStore();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCake() {
            setIsLoading(true);
            setError(null);

            try {
                const { data, error } = await getCakeById(id);

                if (error) {
                    setError('Cake not found. It may have been eaten! 🍰');
                    setIsLoading(false);
                    return;
                }

                if (data) {
                    loadCakeConfig(data);
                }

                setIsLoading(false);
            } catch (err) {
                console.error('Error loading cake:', err);
                setError('Failed to load cake. Please try again.');
                setIsLoading(false);
            }
        }

        loadCake();
    }, [id, loadCakeConfig]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-pink-100 to-purple-200">
                <div className="text-center">
                    <svg className="animate-spin h-12 w-12 text-bakery-brown mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-xl font-cursive text-bakery-brown">Loading your cake...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-pink-100 to-purple-200 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md text-center">
                    <div className="text-6xl mb-4">😢</div>
                    <h2 className="text-2xl font-cursive text-bakery-brown mb-4">{error}</h2>
                    <Link
                        to="/create"
                        className="inline-block px-6 py-3 bg-bakery-brown text-white font-semibold rounded-full shadow-lg hover:bg-opacity-90 hover:scale-105 transition-all"
                    >
                        Create Your Own Cake
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-full bg-gradient-to-b from-pink-100 to-purple-200 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
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
            </div>

            {/* Top Navigation */}
            <div className="absolute top-4 left-4 z-10">
                <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all border-2 border-white/50"
                >
                    <svg className="w-5 h-5 text-bakery-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-semibold text-bakery-brown">Home</span>
                </Link>
            </div>

            {/* Bottom Action Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
                    {/* Create Your Own Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            to="/create"
                            className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-bakery-brown font-semibold rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all border-2 border-white/50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Create Your Own</span>
                        </Link>
                    </motion.div>

                    {/* Share Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <ShareButton cakeId={id} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
