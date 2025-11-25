// Realistic cake templates based on real cake types
export const CAKE_TEMPLATES = [
    {
        name: 'Classic Vanilla',
        baseColor: '#F5E6D3', // Vanilla cake
        frostingColor: '#FFFEF0', // Vanilla buttercream
        icingColor: '#FFE4B5', // Light vanilla
        description: 'Traditional vanilla cake with buttercream frosting'
    },
    {
        name: 'Rich Chocolate',
        baseColor: '#4A2C2A', // Dark chocolate cake
        frostingColor: '#6B4423', // Chocolate ganache
        icingColor: '#3E2723', // Dark chocolate drizzle
        description: 'Decadent chocolate cake with chocolate ganache'
    },
    {
        name: 'Strawberry Dream',
        baseColor: '#FFB6C1', // Strawberry cake
        frostingColor: '#FFF0F5', // Strawberry cream
        icingColor: '#FF69B4', // Strawberry pink
        description: 'Fresh strawberry cake with cream cheese frosting'
    },
    {
        name: 'Red Velvet',
        baseColor: '#8B0000', // Deep red velvet
        frostingColor: '#FFFEF0', // Cream cheese frosting
        icingColor: '#DC143C', // Red accent
        description: 'Classic red velvet with cream cheese frosting'
    },
    {
        name: 'Black Forest',
        baseColor: '#3E2723', // Dark chocolate
        frostingColor: '#FFFEF0', // Whipped cream
        icingColor: '#8B0000', // Cherry red
        description: 'Chocolate cake with whipped cream and cherries'
    },
    {
        name: 'Lemon Bliss',
        baseColor: '#FFFACD', // Lemon cake
        frostingColor: '#FFFFFF', // White frosting
        icingColor: '#FFD700', // Lemon yellow
        description: 'Zesty lemon cake with lemon buttercream'
    },
    {
        name: 'Carrot Cake',
        baseColor: '#D2691E', // Carrot cake brown
        frostingColor: '#FFFEF0', // Cream cheese frosting
        icingColor: '#CD853F', // Caramel accent
        description: 'Spiced carrot cake with cream cheese frosting'
    },
    {
        name: 'Cookies & Cream',
        baseColor: '#F5F5F5', // Vanilla with cookie bits
        frostingColor: '#FFFFFF', // White frosting
        icingColor: '#2F4F4F', // Dark cookie crumbs
        description: 'Vanilla cake with Oreo frosting'
    },
    {
        name: 'Funfetti',
        baseColor: '#FFFEF0', // White cake
        frostingColor: '#FFB6C1', // Pink frosting
        icingColor: '#87CEEB', // Blue sprinkles
        description: 'Vanilla cake with colorful sprinkles'
    },
    {
        name: 'Salted Caramel',
        baseColor: '#D2691E', // Caramel cake
        frostingColor: '#DEB887', // Caramel frosting
        icingColor: '#8B4513', // Dark caramel drizzle
        description: 'Caramel cake with salted caramel frosting'
    },
    {
        name: 'Matcha Green Tea',
        baseColor: '#90EE90', // Matcha green
        frostingColor: '#F0FFF0', // Light cream
        icingColor: '#228B22', // Deep green
        description: 'Japanese matcha cake with white chocolate cream'
    },
    {
        name: 'Coconut Paradise',
        baseColor: '#FFFEF0', // White coconut
        frostingColor: '#FFFFFF', // Coconut cream
        icingColor: '#F5DEB3', // Toasted coconut
        description: 'Coconut cake with coconut cream frosting'
    }
];

// Legacy palettes for backward compatibility
export const PALETTES = CAKE_TEMPLATES.map(template => ({
    name: template.name,
    baseColor: template.baseColor,
    frostingColor: template.frostingColor,
    icingColor: template.icingColor
}));

// All available colors for customization
export const ALL_COLORS = [
    { name: 'Vanilla Cream', value: '#F5E6D3' },
    { name: 'Chocolate', value: '#4A2C2A' },
    { name: 'Strawberry Pink', value: '#FFB6C1' },
    { name: 'Red Velvet', value: '#8B0000' },
    { name: 'Lemon Yellow', value: '#FFFACD' },
    { name: 'Carrot Brown', value: '#D2691E' },
    { name: 'Matcha Green', value: '#90EE90' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Cream', value: '#FFFEF0' },
    { name: 'Caramel', value: '#DEB887' },
    { name: 'Dark Chocolate', value: '#3E2723' },
    { name: 'Cherry Red', value: '#DC143C' },
    { name: 'Lavender', value: '#E6E6FA' },
    { name: 'Mint', value: '#98FF98' },
    { name: 'Peach', value: '#FFDAB9' },
    { name: 'Gold', value: '#FFD700' },
];
