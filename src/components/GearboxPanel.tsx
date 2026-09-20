import React from 'react';
import { GearboxState } from '../types';
import { Cog, Unplug, CheckCircle2 } from 'lucide-react';

interface GearboxPanelProps {
  gearboxState: GearboxState;
  onToggleGearbox: () => void;
}

export const GearboxPanel: React.FC<GearboxPanelProps> = ({ gearboxState, onToggleGearbox }) => {
  const isCoupled = gearboxState === 'ACOPLADA';

  return (
    <div
      id="panel-gearbox"
      className="bg-[#151B23] border border-[#2A3441] rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2A3441]/70 pb-3 mb-4">
        <div>
          <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#00B8D9] uppercase block">
            [RF-06]
          </span>
          <h2 className="text-xs sm:text-sm font-tech font-bold tracking-widest text-[#9AA6B2] uppercase">
            CAJA DE CAMBIOS
          </h2>
        </div>

        {/* State Indicator */}
        <div
          id="status-gearbox-indicator"
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-tech font-bold tracking-wider transition-colors ${
            isCoupled
              ? 'bg-[#22C55E]/15 border-[#22C55E] text-[#22C55E]'
              : 'bg-[#64748B]/20 border-[#64748B] text-[#9AA6B2]'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isCoupled ? 'bg-[#22C55E] shadow-[0_0_8px_#22C55E]' : 'bg-[#64748B]'
            }`}
          />
          <span>● {gearboxState}</span>
        </div>
      </div>

      {/* Mechanical Gearbox Coupling Schematic Visual */}
      <div className="my-2 p-4 bg-[#0B0F14]/70 rounded-xl border border-[#2A3441]/50 flex flex-col items-center justify-center">
        <div className="text-[10px] font-tech text-[#9AA6B2] uppercase mb-2">
          REPRESENTACIÓN VISUAL DEL ACOPLAMIENTO
        </div>

        {/* Coupling mechanism visual */}
        <div className="w-full max-w-xs flex items-center justify-center gap-2 h-16 relative">
          {/* Section Left */}
          <div className="flex items-center">
            <div className="w-14 sm:w-16 h-6 bg-[#1C2430] border border-[#2A3441] rounded-l-lg flex items-center justify-center">
              <span className="text-[9px] font-mono-code text-[#9AA6B2]">TRANSMISIÓN</span>
            </div>
            {/* Coupling teeth left */}
            <div className="flex flex-col gap-1">
              <div className={`w-2 h-1.5 rounded-xs transition-colors ${isCoupled ? 'bg-[#00B8D9]' : 'bg-[#64748B]'}`} />
              <div className={`w-2 h-1.5 rounded-xs transition-colors ${isCoupled ? 'bg-[#00B8D9]' : 'bg-[#64748B]'}`} />
            </div>
          </div>

          {/* Coupling central block */}
          <div
            className={`px-3 py-1.5 rounded-lg border flex items-center justify-center transition-all duration-200 shadow-md ${
              isCoupled
                ? 'bg-[#00B8D9]/20 border-[#00B8D9] text-[#00B8D9] scale-100'
                : 'bg-[#1C2430] border-[#64748B] text-[#64748B] scale-90 translate-x-1.5'
            }`}
          >
            <Cog className="w-5 h-5" />
          </div>

          {/* Section Right */}
          <div className="flex items-center">
            {/* Coupling teeth right */}
            <div className="flex flex-col gap-1">
              <div className={`w-2 h-1.5 rounded-xs transition-colors ${isCoupled ? 'bg-[#00B8D9]' : 'bg-[#64748B]'}`} />
              <div className={`w-2 h-1.5 rounded-xs transition-colors ${isCoupled ? 'bg-[#00B8D9]' : 'bg-[#64748B]'}`} />
            </div>
            <div className="w-14 sm:w-16 h-6 bg-[#1C2430] border border-[#2A3441] rounded-r-lg flex items-center justify-center">
              <span className="text-[9px] font-mono-code text-[#9AA6B2]">SISTEMA</span>
            </div>
          </div>
        </div>

        <div className="mt-2 text-center">
          <span className="text-xs font-tech text-[#F5F7FA]">
            {isCoupled ? 'Caja de cambios: Acoplada' : 'Caja de cambios: Desacoplada'}
          </span>
        </div>
      </div>

      {/* Action Button: ACOPLAR / DESACOPLAR */}
      <button
        id="btn-toggle-gearbox"
        onClick={onToggleGearbox}
        className={`w-full mt-3 py-3.5 px-4 rounded-xl font-tech font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-150 active:scale-[0.98] cursor-pointer ${
          isCoupled
            ? 'bg-[#1C2430] hover:bg-[#2A3441] text-[#F5F7FA] border border-[#2A3441] hover:border-[#00B8D9]/50'
            : 'bg-[#00B8D9] hover:bg-[#00cce6] text-[#0B0F14] shadow-[0_0_14px_rgba(0,184,217,0.3)]'
        }`}
      >
        {isCoupled ? <Unplug className="w-4 h-4 text-[#F59E0B]" /> : <CheckCircle2 className="w-4 h-4 text-[#0B0F14]" />}
        <span>{isCoupled ? 'DESACOPLAR' : 'ACOPLAR'}</span>
      </button>

      {/* Description caption */}
      <p className="text-[11px] text-[#9AA6B2] text-center mt-2.5">
        {isCoupled
          ? 'Caja de cambios en estado acoplada.'
          : 'Caja de cambios en estado desacoplada.'}
      </p>
    </div>
  );
};
