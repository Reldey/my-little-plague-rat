import { IItem } from './items';

export interface IRat {
  name: string;
  id: number;
  stamina: number;
  intelligence: number;
  athleticism: number;
  cuteness: number;
  size: number;
  equipment: IItem[];
  status: 'alive' | 'dead';
  // Whether or not the rat is in the rat pen
  present: boolean;
  age: number;
  careMistakes: number;
  initialSize: number;
}
