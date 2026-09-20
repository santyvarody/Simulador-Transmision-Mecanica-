export type TransmissionMode = 'NORMAL' | 'DEPORTIVO' | 'MANUAL';

export type ClutchState = 'LIBERADO' | 'ACTIVADO';

export type GearboxState = 'ACOPLADA' | 'DESACOPLADA';

export type GearMeshState = 'ENGRANADO' | 'DESENGRANADO';

export interface GearInfo {
  number: number;
  name: string;
}

export interface SimulationState {
  currentGear: number; // 1 to 6
  mode: TransmissionMode;
  clutch: ClutchState;
  gearbox: GearboxState;
  gearsState: Record<number, GearMeshState>;
}

export interface SystemEventLog {
  id: string;
  timestamp: string;
  requirementCode: 'RF-01' | 'RF-02' | 'RF-03' | 'RF-04' | 'RF-05' | 'RF-06' | 'RF-07';
  title: string;
  description: string;
}
