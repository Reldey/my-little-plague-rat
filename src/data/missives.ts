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
  coinReward: number;
  time: number;
  originalTime: number;
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
    coinReward: 20,
    time: 30,
    originalTime: 30,
    status: 'available',
    id: 0,
  },
  {
    title: 'A Sneaky Situation',
    description: `Send a rat to acquire a bit more coin for us, this requires a rat that can sneak effectively.`,
    rewards: [],
    intelligenceReq: 3,
    athleticismReq: 1,
    cutenessReq: 1,
    ratSlots: 1,
    coinReward: 40,
    time: 30,
    originalTime: 30,
    status: 'available',
    id: 1,
  },
  {
    title: 'An Aggressive Agitator',
    description: `We need a large rat to scare to act as security for the pen for a while.
     One that's a bit more athletic will do.`,
    rewards: [],
    intelligenceReq: 1,
    athleticismReq: 3,
    cutenessReq: 1,
    ratSlots: 1,
    coinReward: 40,
    time: 30,
    originalTime: 30,
    status: 'available',
    id: 2,
  },
  {
    title: 'A Dance for Coins',
    description: `Training rats to be cute can be beneficial as well. Did you know some 
    people even keep them as pets? Send a cute one to town and see if it can make any coin with its tricks.`,
    rewards: [],
    intelligenceReq: 1,
    athleticismReq: 1,
    cutenessReq: 4,
    ratSlots: 1,
    coinReward: 30,
    time: 30,
    originalTime: 40,
    status: 'available',
    id: 3,
  },
  {
    title: 'Steal the Evidence',
    description: `Surveilance tells us that the clergy have caught wind of your opperation, 
    and worse have collected evidence. Send a very intelligent rat that can identify the evidence and bring it back for destruction.`,
    rewards: [],
    intelligenceReq: 8,
    athleticismReq: 4,
    cutenessReq: 2,
    ratSlots: 1,
    coinReward: 30,
    time: 30,
    originalTime: 40,
    status: 'available',
    id: 4,
  },
  {
    title: 'A Group Effort',
    description: `A bet has been wagered that not even two of your rats are stronger than a 
    competitor's Tarbagan marmot. Send two of your beefiest rats to prove them wrong.`,
    rewards: [],
    intelligenceReq: 4,
    athleticismReq: 12,
    cutenessReq: 4,
    ratSlots: 2,
    coinReward: 80,
    time: 30,
    originalTime: 30,
    status: 'available',
    id: 5,
  },
  {
    title: 'Coordinated Dance',
    description: `What's better than a dancing rat? Why three of course! Send your three cutest rats to collect even more coin in town.`,
    rewards: [],
    intelligenceReq: 6,
    athleticismReq: 6,
    cutenessReq: 14,
    ratSlots: 3,
    coinReward: 80,
    time: 30,
    originalTime: 30,
    status: 'available',
    id: 6,
  },
  {
    title: 'Big City Brawl',
    description: `Several guards are blocking an patrolling an important building. Send your burliest rats to neutralize them!`,
    rewards: [],
    intelligenceReq: 6,
    athleticismReq: 14,
    cutenessReq: 6,
    ratSlots: 3,
    coinReward: 80,
    time: 30,
    originalTime: 30,
    status: 'available',
    id: 7,
  },
  {
    title: 'The Final Advance',
    description: `This is it, the final mission. Ready your best trained rats, and take control castle.`,
    rewards: [],
    intelligenceReq: 50,
    athleticismReq: 50,
    cutenessReq: 50,
    ratSlots: 6,
    coinReward: 100,
    time: 60,
    originalTime: 60,
    status: 'available',
    id: 8,
  },
];
