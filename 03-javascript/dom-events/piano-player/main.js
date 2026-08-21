/* Piano Player: DOM events, keyboard input, and simple Web Audio notes. */

const noteFrequencies = {
  C4: 261.63,
  "C#4": 277.18,
  D4: 293.66,
  "D#4": 311.13,
  E4: 329.63,
  F4: 349.23,
  "F#4": 369.99,
  G4: 392.0,
  "G#4": 415.3,
  A4: 440.0,
  "A#4": 466.16,
  B4: 493.88,
  C5: 523.25,
};

const keyboardMap = {
  a: "c-key",
  w: "c-sharp-key",
  s: "d-key",
  e: "d-sharp-key",
  d: "e-key",
  f: "f-key",
  t: "f-sharp-key",
  g: "g-key",
  y: "g-sharp-key",
  h: "a-key",
  u: "a-sharp-key",
  j: "b-key",
  k: "high-c-key",
};

const pianoKeys = [...document.querySelectorAll(".piano .key")];
const status = document.querySelector("#status");

let audioContext;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
}

function playTone(noteName) {
  const frequency = noteFrequencies[noteName];

  if (!frequency) {
    return;
  }

  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.15, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    context.currentTime + 0.45
  );

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.45);
}

function pressKey(key) {
  if (!key || key.classList.contains("is-active")) {
    return;
  }

  key.classList.add("is-active");
  playTone(key.dataset.note);
  status.textContent = `Playing ${key.dataset.note}.`;
}

function releaseKey(key) {
  if (!key) {
    return;
  }

  key.classList.remove("is-active");
}

// Each piano button gets the same pointer behavior.
pianoKeys.forEach(key => {
  key.addEventListener("pointerdown", () => pressKey(key));
  key.addEventListener("pointerup", () => releaseKey(key));
  key.addEventListener("pointerleave", () => releaseKey(key));

  // Keyboard activation through Enter or Space still works like a normal button.
  key.addEventListener("click", event => {
    if (event.detail === 0) {
      pressKey(key);
      setTimeout(() => releaseKey(key), 180);
    }
  });
});

// I keep a separate key map so the computer keyboard feels like a small piano.
document.addEventListener("keydown", event => {
  if (event.repeat) {
    return;
  }

  const keyId = keyboardMap[event.key.toLowerCase()];
  const pianoKey = keyId ? document.querySelector(`#${keyId}`) : null;

  if (pianoKey) {
    event.preventDefault();
    pressKey(pianoKey);
  }
});

document.addEventListener("keyup", event => {
  const keyId = keyboardMap[event.key.toLowerCase()];
  const pianoKey = keyId ? document.querySelector(`#${keyId}`) : null;

  if (pianoKey) {
    releaseKey(pianoKey);
  }
});

/* Song guide */

const nextOne = document.querySelector("#first-next-line");
const nextTwo = document.querySelector("#second-next-line");
const nextThree = document.querySelector("#third-next-line");
const startOver = document.querySelector("#fourth-next-line");

const noteOne = document.querySelector("#letter-note-one");
const noteTwo = document.querySelector("#letter-note-two");
const noteThree = document.querySelector("#letter-note-three");
const noteFour = document.querySelector("#letter-note-four");
const noteFive = document.querySelector("#letter-note-five");
const noteSix = document.querySelector("#letter-note-six");

const wordOne = document.querySelector("#word-one");
const wordTwo = document.querySelector("#word-two");
const wordThree = document.querySelector("#word-three");
const wordFour = document.querySelector("#word-four");
const wordFive = document.querySelector("#word-five");
const wordSix = document.querySelector("#word-six");

const lastLyric = document.querySelector("#column-optional");

function showOnly(buttonToShow) {
  [nextOne, nextTwo, nextThree, startOver].forEach(button => {
    button.hidden = button !== buttonToShow;
  });
}

function showLineOne() {
  wordOne.textContent = "HAP-";
  wordTwo.textContent = "PY";
  wordThree.textContent = "BIRTH-";
  wordFour.textContent = "DAY";
  wordFive.textContent = "TO";
  wordSix.textContent = "YOU";

  noteOne.textContent = "G";
  noteTwo.textContent = "G";
  noteThree.textContent = "A";
  noteFour.textContent = "G";
  noteFive.textContent = "C";
  noteSix.textContent = "B";

  lastLyric.hidden = true;
  showOnly(nextOne);
}

nextOne.addEventListener("click", () => {
  noteFive.textContent = "D";
  noteSix.textContent = "C";

  lastLyric.hidden = true;
  showOnly(nextTwo);
});

nextTwo.addEventListener("click", () => {
  wordFive.textContent = "DEAR";
  wordSix.textContent = "FRI";

  noteThree.textContent = "G";
  noteFour.textContent = "E";
  noteFive.textContent = "C";
  noteSix.textContent = "B";

  lastLyric.hidden = false;
  showOnly(nextThree);
});

nextThree.addEventListener("click", () => {
  wordOne.textContent = "HAP-";
  wordTwo.textContent = "PY";
  wordThree.textContent = "BIRTH";
  wordFour.textContent = "DAY";
  wordFive.textContent = "TO";
  wordSix.textContent = "YOU!";

  noteOne.textContent = "F";
  noteTwo.textContent = "F";
  noteThree.textContent = "E";
  noteFour.textContent = "C";
  noteFive.textContent = "D";
  noteSix.textContent = "C";

  lastLyric.hidden = true;
  showOnly(startOver);
});

startOver.addEventListener("click", showLineOne);

showLineOne();
