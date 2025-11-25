import { create } from 'zustand';
import { PALETTES, ALL_COLORS } from '../constants/palettes';

export const useStore = create((set) => ({
    cakeConfig: {
        layers: 2,
        baseColor: '#FFB7B2', // pastel pink
        frostingColor: '#FDF5E6', // cream
        icingColor: '#AEC6CF', // pastel blue
        flavor: 'Vanilla',
        toppings: [],
        candles: 1,
        cakeText: 'Happy Birthday',
        hoverMessage: 'Make a Wish',
        hoverMessageColor: '#FFD700', // Gold
    },
    setCakeConfig: (config) => set((state) => ({
        cakeConfig: { ...state.cakeConfig, ...config }
    })),
    updateConfig: (key, value) => set((state) => ({
        cakeConfig: { ...state.cakeConfig, [key]: value }
    })),
    randomizeCake: () => {
        const randomPalette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
        const randomHoverColor = ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)].value;
        set((state) => ({
            cakeConfig: {
                ...state.cakeConfig,
                baseColor: randomPalette.baseColor,
                frostingColor: randomPalette.frostingColor,
                icingColor: randomPalette.icingColor,
                hoverMessageColor: randomHoverColor,
            }
        }));
    },
    loadCakeConfig: (config) => set({ cakeConfig: config }),
    resetCakeConfig: () => set({
        cakeConfig: {
            layers: 2,
            baseColor: '#FFB7B2',
            frostingColor: '#FDF5E6',
            icingColor: '#AEC6CF',
            flavor: 'Vanilla',
            toppings: [],
            candles: 1,
            cakeText: 'Happy Birthday',
            hoverMessage: 'Make a Wish',
            hoverMessageColor: '#FFD700',
        }
    })
}));
