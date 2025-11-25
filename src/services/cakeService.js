import { supabase, isMockMode } from '../lib/supabase';

/**
 * Save a cake configuration to the database
 * @param {Object} cakeConfig - The cake configuration object
 * @returns {Promise<{data: {id: string}, error: null} | {data: null, error: Error}>}
 */
export async function saveCake(cakeConfig) {
    try {
        // If in mock mode, return a mock ID
        if (isMockMode) {
            const mockId = Math.random().toString(36).substring(2, 15);
            return {
                data: { id: mockId },
                error: null
            };
        }

        // Transform camelCase to snake_case for database
        const dbCake = {
            layers: cakeConfig.layers,
            base_color: cakeConfig.baseColor,
            frosting_color: cakeConfig.frostingColor,
            icing_color: cakeConfig.icingColor,
            flavor: cakeConfig.flavor,
            toppings: cakeConfig.toppings || [],
            candles: cakeConfig.candles,
            cake_text: cakeConfig.cakeText,
            hover_message: cakeConfig.hoverMessage,
            hover_message_color: cakeConfig.hoverMessageColor,
        };

        const { data, error } = await supabase
            .from('cakes')
            .insert([dbCake])
            .select('id')
            .single();

        if (error) {
            console.error('Error saving cake:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('Exception saving cake:', error);
        return { data: null, error };
    }
}

/**
 * Get a cake configuration by ID
 * @param {string} id - The cake ID
 * @returns {Promise<{data: Object, error: null} | {data: null, error: Error}>}
 */
export async function getCakeById(id) {
    try {
        // If in mock mode, return a mock cake
        if (isMockMode) {
            return {
                data: {
                    id,
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
                },
                error: null
            };
        }

        const { data, error } = await supabase
            .from('cakes')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching cake:', error);
            return { data: null, error };
        }

        // Transform snake_case to camelCase for application
        const cakeConfig = {
            id: data.id,
            layers: data.layers,
            baseColor: data.base_color,
            frostingColor: data.frosting_color,
            icingColor: data.icing_color,
            flavor: data.flavor,
            toppings: data.toppings || [],
            candles: data.candles,
            cakeText: data.cake_text,
            hoverMessage: data.hover_message,
            hoverMessageColor: data.hover_message_color,
        };

        return { data: cakeConfig, error: null };
    } catch (error) {
        console.error('Exception fetching cake:', error);
        return { data: null, error };
    }
}

/**
 * Increment the view count for a cake
 * @param {string} id - The cake ID
 * @returns {Promise<{error: null} | {error: Error}>}
 */
export async function incrementViews(id) {
    try {
        // Skip in mock mode
        if (isMockMode) {
            return { error: null };
        }

        const { error } = await supabase.rpc('increment_cake_views', { cake_id: id });

        if (error) {
            console.error('Error incrementing views:', error);
            return { error };
        }

        return { error: null };
    } catch (error) {
        console.error('Exception incrementing views:', error);
        return { error };
    }
}
