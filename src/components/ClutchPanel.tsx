import React from 'react';
import { ClutchState } from '../types';
import { Disc } from 'lucide-react';

interface ClutchPanelProps {
  clutchState: ClutchState;
  onToggleClutch: () => void;
}

export const ClutchPanel: React.FC<ClutchPanelProps> = ({ clutchState, onToggleClutch }) => {
  const isPressed = clutchState === 'ACTIVADO';

  return (
    <div
      id="panel-clutch"
      className="bg-[#151B23] border border-[#2A3441] rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2A3441]/70 pb-3 mb-4">
        <div>
          <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#00B8D9] uppercase block">
            [RF-05]
          </span>
          <h2 className="text-xs sm:text-sm font-tech font-bold tracking-widest text-[#9AA6B2] uppercase">
            EMBRAGUE
          </h2>
        </div>

        {/* State Indicator */}
        <div
          id="status-clutch-indicator"
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-tech font-bold tracking-wider transition-colors ${
            isPressed
              ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#F59E0B]'
              : 'bg-[#22C55E]/15 border-[#22C55E] text-[#22C55E]'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isPressed ? 'bg-[#F59E0B] animate-pulse' : 'bg-[#22C55E]'
            }`}
          />
          <span>● {clutchState}</span>
        </div>
      </div>

      {/* Mechanical Clutch & Pedal Visual Graphic */}
      <div className="my-2 p-4 bg-[#0B0F14]/70 rounded-xl border border-[#2A3441]/50 flex flex-col sm:flex-row items-center justify-around gap-4">
        {/* Pedal representation */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-tech text-[#9AA6B2] uppercase mb-1">PEDAL</span>
          <div className="relative w-16 h-20 flex items-center justify-center">
            {/* Pedal mount / pivot */}
            <div className="absolute top-1 w-8 h-2 bg-[#2A3441] rounded" />
            <div
              className="absolute top-2 w-1.5 h-12 bg-[#64748B] origin-top transition-transform duration-200"
              style={{ transform: isPressed ? 'rotate(18deg)' : 'rotate(0deg)' }}
            />
            {/* Footpad */}
            <div
              className={`absolute bottom-2 w-12 h-6 rounded-md border flex items-center justify-center transition-all duration-200 shadow-md ${
                isPressed
                  ? 'translate-y-2 bg-[#F59E0B] border-[#F59E0B] text-[#0B0F14]'
                  : 'translate-y-0 bg-[#1C2430] border-[#2A3441] text-[#9AA6B2]'
              }`}
            >
              <span className="text-[9px] font-mono-code font-bold tracking-tighter">
                {isPressed ? 'PISADO' : 'LIBRE'}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-16 bg-[#2A3441]/60" />

        {/* Mechanism Visual Graphic */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-tech text-[#9AA6B2] uppercase mb-1">MECANISMO DE EMBRAGUE</span>
          <div className="flex items-center gap-3 h-16 px-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                  isPressed
                    ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B]'
                    : 'bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]'
                }`}
              >
                <Disc className="w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-tech font-bold text-[#F5F7FA]">
                {isPressed ? 'ESTADO: ACTIVADO' : 'ESTADO: LIBERADO'}
              </span>
              <span className="text-[10px] text-[#9AA6B2] font-mono-code">
                {isPressed ? 'Pedal accionado por el usuario' : 'Pedal en posición de reposo'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button: PISAR PEDAL / SOLTAR PEDAL */}
      <button
        id="btn-toggle-clutch"
        onClick={onToggleClutch}
        className={`w-full mt-3 py-3.5 px-4 rounded-xl font-tech font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-150 active:scale-[0.98] cursor-pointer ${
          isPressed
            ? 'bg-[#1C2430] hover:bg-[#2A3441] text-[#F5F7FA] border border-[#F59E0B]/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
            : 'bg-[#00B8D9] hover:bg-[#00cce6] text-[#0B0F14] shadow-[0_0_14px_rgba(0,184,217,0.3)]'
        }`}
      >
        <Disc className="w-4 h-4" />
        <span>{isPressed ? 'SOLTAR PEDAL' : 'PISAR PEDAL'}</span>
      </button>

      {/* Description caption */}
      <p className="text-[11px] text-[#9AA6B2] text-center mt-2.5">
        {isPressed
          ? 'Embrague activado mediante el control de pedal.'
          : 'Embrague liberado en su estado base.'}
      </p>
    </div>
  );
};
