import React from 'react';
import { useStore } from '../../store/useStore';
import { ALL_COLORS, CAKE_TEMPLATES } from '../../constants/palettes';

export default function CustomizerPanel() {
    const { cakeConfig, updateConfig, setCakeConfig } = useStore();

    const applyTemplate = (template) => {
        setCakeConfig({
            ...cakeConfig,
            baseColor: template.baseColor,
            frostingColor: template.frostingColor,
            icingColor: template.icingColor,
        });
    };

    return (
        <div className="h-full overflow-y-auto p-6 space-y-8">
            {/* Cake Templates */}
            <div>
                <h3 className="text-xl font-cursive text-bakery-brown mb-4 drop-shadow-sm">Cake Templates</h3>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {CAKE_TEMPLATES.map((template) => (
                        <button
                            key={template.name}
                            onClick={() => applyTemplate(template)}
                            className="p-3 rounded-xl bg-white/40 backdrop-blur-sm border-2 border-white/50 hover:border-bakery-brown hover:bg-white/60 transition-all text-left group"
                            title={template.description}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <div
                                    className="w-4 h-4 rounded-full border border-white/50"
                                    style={{ backgroundColor: template.baseColor }}
                                />
                                <div
                                    className="w-4 h-4 rounded-full border border-white/50"
                                    style={{ backgroundColor: template.frostingColor }}
                                />
                                <div
                                    className="w-4 h-4 rounded-full border border-white/50"
                                    style={{ backgroundColor: template.icingColor }}
                                />
                            </div>
                            <span className="text-sm font-semibold text-bakery-brown group-hover:text-opacity-100 text-opacity-80">
                                {template.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-cursive text-bakery-brown mb-4 drop-shadow-sm">Base Flavor</h3>
                <div className="flex flex-wrap gap-3">
                    {ALL_COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => updateConfig('baseColor', color.value)}
                            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${cakeConfig.baseColor === color.value ? 'border-bakery-brown scale-110 ring-2 ring-bakery-brown/30' : 'border-white/50'
                                }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-cursive text-bakery-brown mb-4 drop-shadow-sm">Frosting Color</h3>
                <div className="flex flex-wrap gap-3">
                    {ALL_COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => updateConfig('frostingColor', color.value)}
                            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${cakeConfig.frostingColor === color.value ? 'border-bakery-brown scale-110 ring-2 ring-bakery-brown/30' : 'border-white/50'
                                }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-cursive text-bakery-brown mb-4 drop-shadow-sm">Icing Color</h3>
                <div className="flex flex-wrap gap-3">
                    {ALL_COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => updateConfig('icingColor', color.value)}
                            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${cakeConfig.icingColor === color.value ? 'border-bakery-brown scale-110 ring-2 ring-bakery-brown/30' : 'border-white/50'
                                }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-cursive text-bakery-brown mb-4 drop-shadow-sm">Candles</h3>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={cakeConfig.candles}
                    onChange={(e) => updateConfig('candles', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/50 rounded-lg appearance-none cursor-pointer accent-pink-400"
                />
                <div className="text-center text-bakery-brown mt-2 font-medium">{cakeConfig.candles} Candles</div>
            </div>

            <div>
                <h3 className="text-xl font-cursive text-bakery-brown mb-4 drop-shadow-sm">Cake Message</h3>
                <input
                    type="text"
                    value={cakeConfig.cakeText}
                    onChange={(e) => updateConfig('cakeText', e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-white/50 focus:border-bakery-brown outline-none font-cursive text-xl bg-white/40 backdrop-blur-sm shadow-inner text-bakery-brown placeholder-bakery-brown/50"
                    placeholder="Happy Birthday"
                    maxLength={20}
                />
            </div>

            <div>
                <h3 className="text-xl font-cursive text-bakery-brown mb-4 drop-shadow-sm">Floating Message</h3>
                <input
                    type="text"
                    value={cakeConfig.hoverMessage}
                    onChange={(e) => updateConfig('hoverMessage', e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-white/50 focus:border-bakery-brown outline-none font-cursive text-xl bg-white/40 backdrop-blur-sm shadow-inner text-bakery-brown placeholder-bakery-brown/50 mb-4"
                    placeholder="Make a Wish"
                    maxLength={20}
                />
                <div className="flex flex-wrap gap-3">
                    {ALL_COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => updateConfig('hoverMessageColor', color.value)}
                            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${cakeConfig.hoverMessageColor === color.value ? 'border-bakery-brown scale-110 ring-2 ring-bakery-brown/30' : 'border-white/50'
                                }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}
