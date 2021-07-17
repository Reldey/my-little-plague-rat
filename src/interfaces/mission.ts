export interface IReward {
  itemId: number;
  rewardAmmount: number;
}

export interface IMission {
  title: string;
  rewards: IReward[];
  powerRequirement: number;
  ratsNeeded: number;
  description: string;
}
