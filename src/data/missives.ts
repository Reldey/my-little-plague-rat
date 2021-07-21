import { IItem } from './items';
import { IRat } from './IRat';

export interface IMissive {
  title: string;
  description: string;
  rewards?: IItem[];
  intelligenceReq: number;
  athleticismReq: number;
  cutenessReq: number;
  ratSlots: number;
  goldReward: number;
  time: number;
  id: number;
  ratsSent?: IRat[];
  status: 'available' | 'inProgress' | 'completed' | 'failed';
}

export const missives: IMissive[] = [
  {
    title: 'A Simple Request',
    description: `We ask that you perform a simple task, send a rat to town, and 
    recall it back. A rat of minimal skill should be able to accomplish this.`,
    rewards: [],
    intelligenceReq: 1,
    athleticismReq: 1,
    cutenessReq: 1,
    ratSlots: 1,
    goldReward: 20,
    time: 30,
    status: 'available',
    id: 0,
  },
];
