import { IReward } from './mission';

export interface IRat {
  name: string;
  id: number;
  stamina: number;
  cunning: number;
  athleticism: number;
  cuteness: number;
  size: number;
  equipment: IReward[];
  status: 'alive' | 'dead';
  present: boolean;
}
