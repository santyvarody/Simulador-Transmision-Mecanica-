import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { GEARS_DATA, MIN_GEAR, MAX_GEAR } from '../constants';

interface GearIndicatorProps {
  currentGear: number;
  onShiftUp: () => void;
  onShiftDown: () => void;
  onDirectGearSelect: (gear: number) => void;
  isClutchEngaged?: boolean;
}

export const GearIndicator: React.FC<GearIndicatorProps> = ({
  currentGear,
  onShiftUp,
  onShiftDown,
  onDirectGearSelect,
}) => {
  const currentGearInfo = GEARS_DATA[currentGear] || GEARS_DATA[1];
  const canShiftDown = currentGear > MIN_GEAR;
  const canShiftUp = currentGear < MAX_GEAR;

  return (
    <div
      id="panel-gear-indicator"
      className="bg-[#151B23] border border-[#2A3441] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#2A3441]/80 transition-colors"
    >
      {/* Background accent radial glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#00B8D9]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section of card */}
      <div className="flex items-center justify-between border-b border-[#2A3441]/70 pb-3 mb-4">
        <div>
          <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#00B8D9] uppercase block">
            [RF-01 | RF-02 | RF-03]
          </span>
          <h2 className="text-xs sm:text-sm font-tech font-bold tracking-widest text-[#9AA6B2] uppercase">
            MARCHA ACTUAL
          </h2>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#1C2430] border border-[#2A3441] text-[11px] font-mono-code text-[#9AA6B2]">
          Rango: {MIN_GEAR} - {MAX_GEAR}
        </div>
      </div>

      {/* Central Big Gear Display (RF-01) */}
      <div className="flex flex-col items-center justify-center my-3 py-4 bg-[#0B0F14]/70 rounded-xl border border-[#2A3441]/50 relative">
        <div className="text-[11px] font-tech tracking-wider text-[#9AA6B2] uppercase mb-1">
          POSICIÓN DE TRANSMISIÓN
        </div>

        {/* Animated large numeral */}
        <div className="relative h-24 sm:h-28 flex items-center justify-center overflow-hidden w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentGear}
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="text-6xl sm:text-7xl font-bold font-tech text-[#F5F7FA] tracking-tight drop-shadow-[0_0_25px_rgba(0,184,217,0.35)]"
            >
              {currentGear}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text name of gear */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGearInfo.name}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-sm sm:text-base font-bold font-tech tracking-widest text-[#00B8D9] uppercase mt-1 px-4 py-0.5 rounded-full bg-[#00B8D9]/10 border border-[#00B8D9]/30"
          >
            {currentGearInfo.name}
          </motion.div>
        </AnimatePresence>

        <div className="text-[11px] text-[#9AA6B2] font-mono-code mt-2">
          Estado: <span className="text-[#F5F7FA] font-medium">Marcha {currentGear} seleccionada</span>
        </div>
      </div>

      {/* Direct Shift Selector Buttons (1 to 6 quick tap) */}
      <div className="grid grid-cols-6 gap-1.5 my-3">
        {[1, 2, 3, 4, 5, 6].map((g) => {
          const isSelected = g === currentGear;
          return (
            <button
              key={g}
              id={`btn-gear-direct-${g}`}
              onClick={() => onDirectGearSelect(g)}
              className={`py-1.5 rounded-lg text-xs font-tech font-bold transition-all ${
                isSelected
                  ? 'bg-[#00B8D9] text-[#0B0F14] shadow-[0_0_10px_rgba(0,184,217,0.5)] scale-105'
                  : 'bg-[#1C2430] hover:bg-[#2A3441] text-[#9AA6B2] hover:text-[#F5F7FA] border border-[#2A3441]'
              }`}
              title={`Seleccionar ${GEARS_DATA[g].name}`}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* Shift Controls (RF-02 SUBIR & RF-03 BAJAR) */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {/* BAJAR MARCHA (RF-03) */}
        <button
          id="btn-shift-down"
          onClick={onShiftDown}
          disabled={!canShiftDown}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-tech font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-150 active:scale-[0.98] ${
            canShiftDown
              ? 'bg-[#1C2430] hover:bg-[#2A3441] text-[#F5F7FA] border border-[#2A3441] hover:border-[#00B8D9]/50 shadow-md cursor-pointer'
              : 'bg-[#151B23] text-[#64748B] border border-[#2A3441]/40 cursor-not-allowed opacity-50'
          }`}
          title={canShiftDown ? 'Disminuir la marcha actual' : 'Límite inferior alcanzado'}
        >
          <ChevronDown className="w-5 h-5 text-[#00B8D9]" />
          <span>− BAJAR</span>
        </button>

        {/* SUBIR MARCHA (RF-02) */}
        <button
          id="btn-shift-up"
          onClick={onShiftUp}
          disabled={!canShiftUp}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-tech font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-150 active:scale-[0.98] ${
            canShiftUp
              ? 'bg-[#00B8D9] hover:bg-[#00cce6] text-[#0B0F14] shadow-[0_0_16px_rgba(0,184,217,0.35)] cursor-pointer'
              : 'bg-[#151B23] text-[#64748B] border border-[#2A3441]/40 cursor-not-allowed opacity-50'
          }`}
          title={canShiftUp ? 'Aumentar la marcha actual' : 'Límite superior alcanzado'}
        >
          <ChevronUp className="w-5 h-5 text-[#0B0F14]" />
          <span>+ SUBIR</span>
        </button>
      </div>
    </div>
  );
};
