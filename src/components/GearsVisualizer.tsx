import React from 'react';
import { GearMeshState } from '../types';
import { GEARS_DATA } from '../constants';
import { Check, X } from 'lucide-react';

interface GearsVisualizerProps {
  currentGear: number;
  currentGearMeshState: GearMeshState;
  gearsMeshMap: Record<number, GearMeshState>;
  onEngageGear: () => void;
  onDisengageGear: () => void;
  onSelectGear: (gear: number) => void;
  isPowerFlowing: boolean;
}

// Stylized mechanical gear SVG
const MechanicalGearSVG: React.FC<{
  number: number;
  isCurrent: boolean;
  isEngaged: boolean;
  isSpinning: boolean;
}> = ({ number, isCurrent, isEngaged, isSpinning }) => {
  // Generate SVG gear teeth polygon/path
  const radius = 32;
  const innerRadius = 24;
  const hubRadius = 12;
  const toothDepth = 6;
  const numTeeth = 16; // Standard visual teeth count for demo

  const points: string[] = [];
  const angleStep = (2 * Math.PI) / numTeeth;

  for (let i = 0; i < numTeeth; i++) {
    const a0 = i * angleStep;
    const a1 = a0 + angleStep * 0.25;
    const a2 = a0 + angleStep * 0.5;
    const a3 = a0 + angleStep * 0.75;

    const rOuter = radius + toothDepth;
    const rInner = radius - 1;

    points.push(`${Math.cos(a0) * rInner + 45},${Math.sin(a0) * rInner + 45}`);
    points.push(`${Math.cos(a1) * rOuter + 45},${Math.sin(a1) * rOuter + 45}`);
    points.push(`${Math.cos(a2) * rOuter + 45},${Math.sin(a2) * rOuter + 45}`);
    points.push(`${Math.cos(a3) * rInner + 45},${Math.sin(a3) * rInner + 45}`);
  }

  const polygonPoints = points.join(' ');

  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
      <svg
        viewBox="0 0 90 90"
        className={`w-full h-full transition-transform duration-300 ${
          isSpinning ? 'animate-spin' : ''
        }`}
        style={{
          animationDuration: '3s',
          animationTimingFunction: 'linear',
        }}
      >
        {/* Outer teeth */}
        <polygon
          points={polygonPoints}
          fill={isCurrent ? (isEngaged ? '#00B8D9' : '#F59E0B') : '#1C2430'}
          stroke={isCurrent ? '#F5F7FA' : '#2A3441'}
          strokeWidth="1.5"
          opacity={isEngaged ? 1 : 0.65}
        />

        {/* Pitch circle guide */}
        <circle
          cx="45"
          cy="45"
          r={innerRadius}
          fill={isCurrent ? '#151B23' : '#0B0F14'}
          stroke={isCurrent ? '#00B8D9' : '#2A3441'}
          strokeWidth="1.5"
        />

        {/* Center hub hole */}
        <circle
          cx="45"
          cy="45"
          r={hubRadius}
          fill={isCurrent ? (isEngaged ? '#00B8D9' : '#F59E0B') : '#1C2430'}
          stroke="#2A3441"
          strokeWidth="1"
        />

        {/* Keyway shaft slot */}
        <rect
          x="43.5"
          y="32"
          width="3"
          height="8"
          fill="#0B0F14"
        />
      </svg>

      {/* Center Gear Number Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span
          className={`font-tech font-bold text-sm sm:text-base leading-none ${
            isCurrent
              ? isEngaged
                ? 'text-[#0B0F14] drop-shadow'
                : 'text-[#0B0F14]'
              : 'text-[#9AA6B2]'
          }`}
        >
          {number}
        </span>
      </div>
    </div>
  );
};

export const GearsVisualizer: React.FC<GearsVisualizerProps> = ({
  currentGear,
  currentGearMeshState,
  gearsMeshMap,
  onEngageGear,
  onDisengageGear,
  onSelectGear,
  isPowerFlowing,
}) => {
  const isEngaged = currentGearMeshState === 'ENGRANADO';

  return (
    <div
      id="panel-gears-section"
      className="bg-[#151B23] border border-[#2A3441] rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2A3441]/70 pb-3 mb-4">
        <div>
          <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#00B8D9] uppercase block">
            [RF-07]
          </span>
          <h2 className="text-xs sm:text-sm font-tech font-bold tracking-widest text-[#9AA6B2] uppercase">
            ENGRANAJES
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9AA6B2] hidden sm:inline">Engranaje activo:</span>
          <span className="px-2.5 py-1 rounded bg-[#00B8D9]/15 border border-[#00B8D9]/40 text-xs font-tech font-bold text-[#00B8D9]">
            ENGRANAJE {currentGear}
          </span>
        </div>
      </div>

      {/* Graphical Gear Representation Grid:
          ⚙ 1    ⚙ 2    ⚙ 3
          ⚙ 4    ⚙ 5    ⚙ 6
      */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 my-2">
        {[1, 2, 3, 4, 5, 6].map((gearNum) => {
          const isCurrent = gearNum === currentGear;
          const meshStatus = gearsMeshMap[gearNum] || (isCurrent ? currentGearMeshState : 'DESENGRANADO');
          const isThisEngaged = meshStatus === 'ENGRANADO';
          const isSpinning = isPowerFlowing && isCurrent && isThisEngaged;

          return (
            <div
              key={gearNum}
              id={`gear-slot-${gearNum}`}
              onClick={() => onSelectGear(gearNum)}
              className={`p-2 sm:p-3 rounded-xl border flex flex-col items-center justify-between transition-all cursor-pointer select-none relative ${
                isCurrent
                  ? isThisEngaged
                    ? 'bg-[#1C2430] border-[#00B8D9] shadow-[0_0_20px_rgba(0,184,217,0.3)] ring-1 ring-[#00B8D9]'
                    : 'bg-[#1C2430] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-[#0B0F14]/60 border-[#2A3441] hover:border-[#64748B] hover:bg-[#1C2430]/50'
              }`}
              title={`Engranaje ${gearNum} - Click para seleccionar`}
            >
              {/* Header inside slot */}
              <div className="w-full flex items-center justify-between text-[10px] font-tech text-[#9AA6B2] mb-1">
                <span className="flex items-center gap-1">
                  <span className="text-xs">⚙</span> {gearNum}
                </span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-mono-code ${
                    isThisEngaged ? 'text-[#22C55E] bg-[#22C55E]/10' : 'text-[#64748B] bg-[#2A3441]/40'
                  }`}
                >
                  {isThisEngaged ? 'ENG' : 'DES'}
                </span>
              </div>

              {/* Graphical animated Gear */}
              <MechanicalGearSVG
                number={gearNum}
                isCurrent={isCurrent}
                isEngaged={isThisEngaged}
                isSpinning={isSpinning}
              />

              {/* Neutral gear reference label (Section 9) */}
              <div className="mt-1.5 text-center">
                <span className="text-[10px] text-[#9AA6B2] font-mono-code block">
                  ENGRANAJE {gearNum}
                </span>
                {isCurrent && (
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-tech font-bold uppercase tracking-wider bg-[#00B8D9] text-[#0B0F14]">
                    SELECCIONADO
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Gear Status Label & Controls */}
      <div className="mt-4 pt-3 border-t border-[#2A3441]/70">
        {/* Dynamic Text as requested in RF-07:
            "ENGRANAJE 3 — ENGRANADO" */}
        <div className="bg-[#0B0F14] border border-[#2A3441] rounded-xl px-4 py-3 text-center mb-3">
          <div className="text-[11px] font-tech text-[#9AA6B2] uppercase mb-0.5">
            ESTADO DEL ENGRANAJE ACTIVO
          </div>
          <div
            id="status-gear-mesh-text"
            className="text-base sm:text-lg font-tech font-bold tracking-wider"
          >
            <span className="text-[#F5F7FA]">ENGRANAJE {currentGear}</span>
            <span className="text-[#9AA6B2] mx-2">—</span>
            <span className={isEngaged ? 'text-[#22C55E]' : 'text-[#F59E0B]'}>
              {currentGearMeshState}
            </span>
          </div>
        </div>

        {/* Action Controls: [ ENGRANAR ] and [ DESENGRANAR ] */}
        <div className="grid grid-cols-2 gap-3">
          <button
            id="btn-engage-gear"
            onClick={onEngageGear}
            disabled={isEngaged}
            className={`py-3 px-4 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isEngaged
                ? 'bg-[#151B23] text-[#64748B] border border-[#2A3441]/40 cursor-not-allowed opacity-60'
                : 'bg-[#22C55E] hover:bg-[#1fb355] text-[#0B0F14] shadow-[0_0_15px_rgba(34,197,94,0.3)]'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>ENGRANAR</span>
          </button>

          <button
            id="btn-disengage-gear"
            onClick={onDisengageGear}
            disabled={!isEngaged}
            className={`py-3 px-4 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              !isEngaged
                ? 'bg-[#151B23] text-[#64748B] border border-[#2A3441]/40 cursor-not-allowed opacity-60'
                : 'bg-[#1C2430] hover:bg-[#2A3441] text-[#F59E0B] border border-[#F59E0B]/50 hover:border-[#F59E0B]'
            }`}
          >
            <X className="w-4 h-4" />
            <span>DESENGRANAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
