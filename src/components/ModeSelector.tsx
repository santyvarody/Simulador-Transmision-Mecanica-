import React from 'react';
import { TransmissionMode } from '../types';
import { Gauge, Zap, Sliders } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: TransmissionMode;
  onModeChange: (mode: TransmissionMode) => void;
}

const MODES_CONFIG: Array<{
  id: TransmissionMode;
  label: string;
  icon: React.ElementType;
}> = [
  {
    id: 'NORMAL',
    label: 'NORMAL',
    icon: Gauge,
  },
  {
    id: 'DEPORTIVO',
    label: 'DEPORTIVO',
    icon: Zap,
  },
  {
    id: 'MANUAL',
    label: 'MANUAL',
    icon: Sliders,
  },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div
      id="panel-mode-selector"
      className="bg-[#151B23] border border-[#2A3441] rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2A3441]/70 pb-3 mb-4">
        <div>
          <span className="text-[11px] font-mono-code font-semibold tracking-wider text-[#00B8D9] uppercase block">
            [RF-04]
          </span>
          <h2 className="text-xs sm:text-sm font-tech font-bold tracking-widest text-[#9AA6B2] uppercase">
            MODO DE FUNCIONAMIENTO
          </h2>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#1C2430] border border-[#2A3441] text-[11px] font-tech font-bold text-[#F5F7FA]">
          MODO ACTUAL: <span className="text-[#00B8D9]">{currentMode}</span>
        </div>
      </div>

      {/* Mode selection buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2">
        {MODES_CONFIG.map((mode) => {
          const isSelected = currentMode === mode.id;
          const Icon = mode.icon;

          return (
            <button
              key={mode.id}
              id={`btn-mode-${mode.id.toLowerCase()}`}
              onClick={() => onModeChange(mode.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex flex-col gap-2 relative ${
                isSelected
                  ? 'bg-[#1C2430] border-[#00B8D9] shadow-[0_0_15px_rgba(0,184,217,0.25)]'
                  : 'bg-[#0B0F14]/60 border-[#2A3441] hover:bg-[#1C2430]/70 hover:border-[#2A3441]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-[#00B8D9]/20 text-[#00B8D9]' : 'bg-[#151B23] text-[#64748B]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isSelected && (
                  <span className="flex h-2 w-2 rounded-full bg-[#00B8D9] shadow-[0_0_8px_#00B8D9]" />
                )}
              </div>

              <div>
                <span
                  className={`block font-tech font-bold text-sm tracking-wider ${
                    isSelected ? 'text-[#F5F7FA]' : 'text-[#9AA6B2]'
                  }`}
                >
                  {mode.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mode Status Footer note */}
      <div className="mt-3 pt-3 border-t border-[#2A3441]/50 flex items-center justify-between text-xs text-[#9AA6B2]">
        <span>Selector de modo de transmisión:</span>
        <span className="font-mono-code text-[#00B8D9]">
          {currentMode}
        </span>
      </div>
    </div>
  );
};
