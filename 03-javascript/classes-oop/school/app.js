/* School Classes: inheritance practice with a small browser UI. */

class SchoolCatalog {
  constructor() {
    this._schools = [];
  }

  get schools() {
    return this._schools;
  }

  addSchool(school) {
    this._schools.push(school);
  }
}

class School {
  constructor(name, level, numberOfStudents) {
    this._name = name;
    this._level = level;
    this._numberOfStudents = numberOfStudents;
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

  quickFacts() {
    return `${this._name} has ${this._numberOfStudents} students at the ${this._level} school level.`;
  }

  addTestScore(score) {
    if (typeof score === "number") {
      this._testScores.push(score);
    }
  }

  getAverageTestScore() {
    if (this._testScores.length === 0) {
      return null;
    }

    const total = this._testScores.reduce((sum, score) => sum + score, 0);
    return total / this._testScores.length;
  }

  static pickSubstituteTeacher(teachers) {
    if (teachers.length === 0) {
      return "No substitute teachers available";
    }

    const randomIndex = Math.floor(Math.random() * teachers.length);
    return teachers[randomIndex];
  }
}

class PrimarySchool extends School {
  constructor(name, numberOfStudents) {
    super(name, "primary", numberOfStudents);
  }
}

class MiddleSchool extends School {
  constructor(name, numberOfStudents) {
    super(name, "middle", numberOfStudents);
  }
}

class HighSchool extends School {
  constructor(name, numberOfStudents) {
    super(name, "high", numberOfStudents);
  }
}

const catalog = new SchoolCatalog();
catalog.addSchool(new PrimarySchool("Lorraine Hansbury", 514));
catalog.addSchool(new MiddleSchool("Canal Winchester", 345));
catalog.addSchool(new HighSchool("Al E. Smith", 415));

function createSchool(name, level, students) {
  if (level === "primary") {
    return new PrimarySchool(name, students);
  }

  if (level === "high") {
    return new HighSchool(name, students);
  }

  return new MiddleSchool(name, students);
}

function renderSchools() {
  const list = document.querySelector("#school-list");

  if (!list) {
    return;
  }

  list.innerHTML = "";

  catalog.schools.forEach(school => {
    const item = document.createElement("li");
    item.className = "item";
    item.textContent = school.quickFacts();
    list.appendChild(item);
  });
}

const schoolForm = document.querySelector("#school-form");

if (schoolForm) {
  schoolForm.addEventListener("submit", event => {
    event.preventDefault();

    const nameInput = document.querySelector("#school-name");
    const level = document.querySelector("#school-level").value;
    const students = Number(document.querySelector("#student-count").value);
    const name = nameInput.value.trim();

    if (!name || students < 1) {
      return;
    }

    catalog.addSchool(createSchool(name, level, students));
    schoolForm.reset();
    renderSchools();
  });

  renderSchools();
}
