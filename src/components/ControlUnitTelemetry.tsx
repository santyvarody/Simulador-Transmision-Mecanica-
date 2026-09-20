import React from 'react';
import { SimulationState, SystemEventLog } from '../types';
import { Cpu, Activity } from 'lucide-react';

interface ControlUnitTelemetryProps {
  state: SimulationState;
  events: SystemEventLog[];
}

export const ControlUnitTelemetry: React.FC<ControlUnitTelemetryProps> = ({ state, events }) => {
  const isGearEngaged = state.gearsState[state.currentGear] === 'ENGRANADO';
  const isClutchFree = state.clutch === 'LIBERADO';
  const isGearboxCoupled = state.gearbox === 'ACOPLADA';

  return (
    <div
      id="panel-control-unit-telemetry"
      className="bg-[#151B23] border border-[#2A3441] rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2A3441]/70 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#00B8D9]/20 text-[#00B8D9] flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono-code font-semibold tracking-wider text-[#00B8D9] uppercase block">
              UNIDAD DE CONTROL
            </span>
            <h2 className="text-xs sm:text-sm font-tech font-bold tracking-widest text-[#9AA6B2] uppercase">
              ESTADO GENERAL DE LA SIMULACIÓN
            </h2>
          </div>
        </div>

        {/* Status badge */}
        <div
          id="status-system-active"
          className="px-3 py-1 rounded-full border border-[#22C55E]/40 bg-[#22C55E]/15 text-[#22C55E] text-xs font-tech font-bold flex items-center gap-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          <span>SISTEMA EN LÍNEA</span>
        </div>
      </div>

      {/* Neutral Transmission State Representation (Section 12) */}
      <div className="my-2 p-3 sm:p-4 bg-[#0B0F14]/70 rounded-xl border border-[#2A3441]/50">
        <div className="flex items-center justify-between text-[10px] font-tech text-[#9AA6B2] uppercase mb-2">
          <span>ESTADO DE LA TRANSMISIÓN</span>
          <span className="font-mono-code text-[#00B8D9]">
            RF-01 A RF-07
          </span>
        </div>

        {/* Neutral blocks: [ MARCHA ] [ EMBRAGUE ] [ CAJA ] [ ENGRANAJE ] */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {/* Block 1: Marcha */}
          <div className="p-2.5 rounded-lg bg-[#1C2430] border border-[#2A3441] flex flex-col items-center">
            <span className="text-[9px] font-mono-code text-[#9AA6B2]">MARCHA</span>
            <span className="text-base font-tech font-bold text-[#00B8D9]">
              {state.currentGear}ª
            </span>
            <span className="text-[9px] text-[#9AA6B2] font-mono-code">ACTIVA</span>
          </div>

          {/* Block 2: Embrague */}
          <div
            className={`p-2.5 rounded-lg border flex flex-col items-center transition-colors ${
              isClutchFree
                ? 'bg-[#1C2430] border-[#22C55E]/60 text-[#22C55E]'
                : 'bg-[#1C2430] border-[#F59E0B]/60 text-[#F59E0B]'
            }`}
          >
            <span className="text-[9px] font-mono-code text-[#9AA6B2]">EMBRAGUE</span>
            <span className="text-xs font-tech font-bold uppercase mt-1">
              {state.clutch}
            </span>
            <span className="text-[9px] font-mono-code mt-0.5 opacity-80">
              {isClutchFree ? 'LIBRE' : 'ACCIONADO'}
            </span>
          </div>

          {/* Block 3: Caja de cambios */}
          <div
            className={`p-2.5 rounded-lg border flex flex-col items-center transition-colors ${
              isGearboxCoupled
                ? 'bg-[#1C2430] border-[#22C55E]/60 text-[#22C55E]'
                : 'bg-[#1C2430] border-[#64748B] text-[#9AA6B2]'
            }`}
          >
            <span className="text-[9px] font-mono-code text-[#9AA6B2]">CAJA DE CAMBIOS</span>
            <span className="text-xs font-tech font-bold uppercase mt-1">
              {state.gearbox}
            </span>
            <span className="text-[9px] font-mono-code mt-0.5 opacity-80">
              {isGearboxCoupled ? 'CONECTADA' : 'DESCONECTADA'}
            </span>
          </div>

          {/* Block 4: Engranaje */}
          <div
            className={`p-2.5 rounded-lg border flex flex-col items-center transition-colors ${
              isGearEngaged
                ? 'bg-[#1C2430] border-[#22C55E]/60 text-[#22C55E]'
                : 'bg-[#1C2430] border-[#F59E0B]/60 text-[#F59E0B]'
            }`}
          >
            <span className="text-[9px] font-mono-code text-[#9AA6B2]">ENGRANAJE {state.currentGear}</span>
            <span className="text-xs font-tech font-bold uppercase mt-1">
              {isGearEngaged ? 'ENGRANADO' : 'DESENGRANADO'}
            </span>
            <span className="text-[9px] font-mono-code mt-0.5 opacity-80">
              {isGearEngaged ? 'ACTIVO' : 'LIBRE'}
            </span>
          </div>
        </div>
      </div>

      {/* Control Unit Summary Table (Section 11) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-2">
        <div className="bg-[#0B0F14]/70 p-2.5 rounded-lg border border-[#2A3441]">
          <span className="text-[10px] text-[#9AA6B2] font-tech uppercase block">Modo actual</span>
          <span className="text-xs font-mono-code font-bold text-[#F5F7FA]">{state.mode}</span>
        </div>
        <div className="bg-[#0B0F14]/70 p-2.5 rounded-lg border border-[#2A3441]">
          <span className="text-[10px] text-[#9AA6B2] font-tech uppercase block">Marcha actual</span>
          <span className="text-xs font-mono-code font-bold text-[#00B8D9]">
            {state.currentGear}
          </span>
        </div>
        <div className="bg-[#0B0F14]/70 p-2.5 rounded-lg border border-[#2A3441]">
          <span className="text-[10px] text-[#9AA6B2] font-tech uppercase block">Embrague</span>
          <span
            className={`text-xs font-mono-code font-bold ${
              state.clutch === 'LIBERADO' ? 'text-[#22C55E]' : 'text-[#F59E0B]'
            }`}
          >
            {state.clutch}
          </span>
        </div>
        <div className="bg-[#0B0F14]/70 p-2.5 rounded-lg border border-[#2A3441]">
          <span className="text-[10px] text-[#9AA6B2] font-tech uppercase block">Caja de cambios</span>
          <span
            className={`text-xs font-mono-code font-bold ${
              state.gearbox === 'ACOPLADA' ? 'text-[#22C55E]' : 'text-[#64748B]'
            }`}
          >
            {state.gearbox}
          </span>
        </div>
        <div className="bg-[#0B0F14]/70 p-2.5 rounded-lg border border-[#2A3441] col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[#9AA6B2] font-tech uppercase block">Engranaje</span>
          <span
            className={`text-xs font-mono-code font-bold ${
              isGearEngaged ? 'text-[#22C55E]' : 'text-[#F59E0B]'
            }`}
          >
            {state.currentGear} — {isGearEngaged ? 'ENGRANADO' : 'DESENGRANADO'}
          </span>
        </div>
      </div>

      {/* Live Event & RF Demonstration Log (Section 13) */}
      <div className="mt-3 pt-3 border-t border-[#2A3441]/70">
        <div className="flex items-center justify-between text-xs text-[#9AA6B2] mb-1.5">
          <span className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-[#00B8D9]" />
            <span className="font-tech font-bold uppercase">REGISTRO DE ACCIONES</span>
          </span>
          <span className="text-[10px] font-mono-code text-[#64748B]">Demostración de requisitos</span>
        </div>

        <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between text-[11px] p-1.5 rounded bg-[#0B0F14] border border-[#2A3441]/70"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="px-1.5 py-0.2 rounded bg-[#00B8D9]/20 text-[#00B8D9] font-mono-code font-bold text-[10px]">
                  {event.requirementCode}
                </span>
                <span className="text-[#F5F7FA] font-medium truncate">{event.title}</span>
              </div>
              <span className="text-[10px] font-mono-code text-[#64748B] shrink-0 ml-2">
                {event.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
