export class PersonalScheme {
    public bodyPart: string;
    public name: string;
    public description: string;
      
    constructor(bodyPart: string, name: string, desc: string) {
      this.bodyPart = bodyPart;
      this.name = name;
      this.description = desc;  
    }
  }