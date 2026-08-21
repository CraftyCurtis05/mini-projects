class SchoolCatalog {
    constructor(level) {
      this._level = level;
      this._schools = [];
    }
    get level() {
      return this._level;
    }
    get schools() {
      return this._schools;
    }
    addSchool(newSchool) {
      this._schools.push(newSchool);
    }
  }
  
  class School {
    constructor(name, level, numberOfStudents, testScores) {
      this._name = name;
      this._level = level;
      this._numberOfStudents = numberOfStudents;
      this._testScores = testScores;
    }
    get name() {
      return this._name;
    }
    get level() {
      return this._level;
    }
    get numberOfStudents() {
      return this._numberOfStudents;
    }
    get testScores() {
      return this._testScores;
    }
    set numberOfStudents(newNumberOfStudents) {
      if (typeof newNumberOfStudents === 'number') {
        this._numberOfStudents = newNumberOfStudents;
      } else {
        console.log('Invalid input: numberOfStudents must be set to a Number.');
      }  
    }
    quickFacts() {
      console.log(`${this._name} educates ${this._numberOfStudents} students at the ${this._level} school level.`);
    }
    static pickSubstituteTeacher(substituteTeachers) {
      const length = substituteTeachers.length;
      const random = Math.floor(Math.random() * (length - 1));
      if (length === 0) {
        console.log('Error: There are no subsitute teachers available.');
      } else {
        console.log(substituteTeachers[random]);
      }
    }
    addTestScore(newTestScore) {
      if (typeof newTestScore === 'number') {
        this._testScores.push(newTestScore);
      } else {
        console.log('Invalid input: newTestScore must be set to a Number.')
      }  
    }
    getAverageTestScores() {
      const length = this._testScores.length;
      let sum = 0;
      for (let i = 0; i < length; i++) {
        sum += this._testScores[i];
      }
      console.log(sum / length);
    }
  }
  
  class PrimarySchool extends School {
    constructor(name, numberOfStudents, pickupPolicy, testScores) {
      super(name, 'primary', numberOfStudents, testScores);
      this._pickupPolicy = pickupPolicy;
    }
    get pickupPolicy() {
      return this._pickupPolicy;
    }
  }
  
  class MiddleSchool extends School {
    constructor(name, numberOfStudents, testScores) {
      super(name, 'middle', numberOfStudents, testScores);
    }
  }
  
  class HighSchool extends School {
    constructor(name, numberOfStudents, sportsTeams, testScores) {
      super(name, 'high', numberOfStudents, testScores);
      this._sportsTeams = sportsTeams;
    }
    get sportsTeams() {
      for (let i = 0; i < this._sportsTeams.length; i++) {
        console.log(this._sportsTeams[i]);
      }
    }
  }
  
  const catalog = new SchoolCatalog();
  
  const lorraineHansbury = new PrimarySchool('Lorraine Hansbury', 514, 'Students must be picked up by a parent, guardian, or a family member over the age of 13.', []);
  lorraineHansbury.quickFacts();
  
  School.pickSubstituteTeacher(['Jamal Crawford', 'Lou Williams', 'J. R. Smith', 'James Harden', 'Jason Terry', 'Manu Ginobli']);
  
  const canalWinchester = new MiddleSchool('Canal Winchester', 345, []);
  canalWinchester.addTestScore(40);
  canalWinchester.addTestScore(50);
  canalWinchester.addTestScore(60);
  canalWinchester.getAverageTestScores();
  
  const alSmith = new HighSchool('Al E. Smith', 415, ['Baseball', 'Basketball', 'Volleyball', 'Track and Field'], []);
  alSmith.sportsTeams;
  
  catalog.addSchool(lorraineHansbury);
  catalog.addSchool(canalWinchester);
  catalog.addSchool(alSmith);
  console.log(catalog);