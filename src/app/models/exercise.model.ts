import { PersonalScheme } from './personalScheme.model'
export class Exercise {
    public bodyPart: string;
    public name: string;
    public description: string;
    public reps: number;
    public sets: number;
   
   
  
    constructor(bodyPart: string, name: string, desc: string, reps: number, sets: number) {
      this.bodyPart = bodyPart;
      this.name = name;
      this.description = desc;
      this.reps = reps;
      this.sets = sets;
      
    }
  }