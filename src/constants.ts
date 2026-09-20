import { GearInfo, SimulationState } from './types';

export const GEARS_DATA: Record<number, GearInfo> = {
  1: {
    number: 1,
    name: 'PRIMERA MARCHA',
  },
  2: {
    number: 2,
    name: 'SEGUNDA MARCHA',
  },
  3: {
    number: 3,
    name: 'TERCERA MARCHA',
  },
  4: {
    number: 4,
    name: 'CUARTA MARCHA',
  },
  5: {
    number: 5,
    name: 'QUINTA MARCHA',
  },
  6: {
    number: 6,
    name: 'SEXTA MARCHA',
  },
};

export const MIN_GEAR = 1;
export const MAX_GEAR = 6;

// Initial demonstration state (Section 13)
// Modo: NORMAL
// Marcha: 1
// Embrague: LIBERADO
// Caja de cambios: ACOPLADA
// Engranaje: ENGRANADO
export const INITIAL_SIMULATION_STATE: SimulationState = {
  currentGear: 1,
  mode: 'NORMAL',
  clutch: 'LIBERADO',
  gearbox: 'ACOPLADA',
  gearsState: {
    1: 'ENGRANADO',
    2: 'DESENGRANADO',
    3: 'DESENGRANADO',
    4: 'DESENGRANADO',
    5: 'DESENGRANADO',
    6: 'DESENGRANADO',
  },
};
