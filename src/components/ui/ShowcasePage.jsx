import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Scene from '../3d/Scene';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { getCakeById } from '../../services/cakeService';
import ShareButton from './ShareButton';
import confetti from 'canvas-confetti';

export default function ShowcasePage() {
    const { id } = useParams();
    const { cakeConfig, loadCakeConfig } = useStore();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const triggerConfetti = () => {
        const scalar = 1.5;
        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0.5,
            decay: 0.94,
            startVelocity: 15,
            scalar,
        };

        confetti({
            ...defaults,
            particleCount: 50,
            shapes: ['circle', 'square'],
        });

        confetti({
            ...defaults,
            particleCount: 25,
            shapes: ['circle'],
        });
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        triggerConfetti();
        setTimeout(() => setCopied(false), 2000);
    };

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
                        className="inline-block px-6 py-3 bg-bakery-brown text-white font-semibold rounded-full shadow-lg hover:bg-opacity-90 transition-all"
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

            {/* Top Navigation - Home Icon Only */}
            <div className="absolute top-4 left-4 z-10">
                <Link
                    to="/"
                    className="flex items-center justify-center p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:border-bakery-brown/50 transition-all border-2 border-white/50"
                    aria-label="Home"
                >
                    <svg className="w-5 h-5 text-bakery-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </Link>
            </div>

            {/* Bottom Action Buttons */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="flex items-end justify-between">
                    {/* Create Your Own Button - Bottom Left */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="pb-[15px]"
                    >
                        <Link
                            to="/create"
                            className="px-6 py-3 bg-white/90 backdrop-blur-sm text-bakery-brown font-semibold rounded-full shadow-lg hover:bg-white hover:border-bakery-brown/50 transition-all border-2 border-white/50"
                        >
                            Create Your Own
                        </Link>
                    </motion.div>

                    {/* Share Section - Bottom Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="relative"
                    >
                        {/* Social Icons Above - Positioned Absolutely */}
                        <div className="absolute bottom-full right-0 mb-3 flex gap-3">
                            <a
                                href={`https://www.instagram.com/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:border-bakery-brown/50 transition-all border-2 border-white/50"
                                title="Share on Instagram"
                            >
                                <svg className="w-5 h-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>

                            <a
                                href={`https://wa.me/?text=${encodeURIComponent('Check out my custom cake! ' + window.location.href)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:border-bakery-brown/50 transition-all border-2 border-white/50"
                                title="Share on WhatsApp"
                            >
                                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                        </div>

                        {/* Copy Link Button - Aligned with Create Button */}
                        <button
                            onClick={handleCopyLink}
                            className="px-6 py-3 bg-white/90 backdrop-blur-sm text-bakery-brown font-semibold rounded-full shadow-lg hover:bg-white hover:border-bakery-brown/50 transition-all border-2 border-white/50"
                        >
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
