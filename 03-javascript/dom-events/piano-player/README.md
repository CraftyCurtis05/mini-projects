# Piano Player

An interactive piano exercise I used to practice DOM events and changing the interface in response to user input.

The original Codecademy version focused on mouse events and stepping through the Happy Birthday note guide. I kept that idea and added a small amount of functionality so the piano behaves more like the thing it represents.

## What I Practiced

- DOM selection
- pointer and keyboard events
- reusable event handlers
- changing classes and text in response to user input
- updating a step-by-step song guide
- using the Web Audio API for simple generated tones
- keeping mouse, keyboard, and button interaction working together

## Small UI Changes I Added

I kept the original piano and Happy Birthday guide, but cleaned up the markup and made the keys actual buttons.

I also added:

- piano tones generated with the Web Audio API
- computer keyboard shortcuts for each note
- visual key feedback while a note is being played
- visible keyboard focus
- a small status message showing the note being played
- responsive piano sizing
- a cleaner song-line reset function

There are no MP3 or audio files in this project. The browser creates each tone from its note frequency when a key is played.

## Keyboard Controls

```text
A = C
W = C#
S = D
E = D#
D = E
F = F
T = F#
G = G
Y = G#
H = A
U = A#
J = B
K = High C
```

## Bug I Fixed

The original Line 3 handler used:

```javascript
notefour.innerHTML = "E";
```

The actual variable is `noteFour`, so that typo stopped the lyric progression at that point. I corrected it while cleaning up the song controls.

## Built With

- HTML
- CSS
- JavaScript
- Web Audio API

## Project Structure

```text
├── index.html
├── main.js
└── style.css
```

## Running the Project

Open `index.html` in a modern browser.

Click or tap a piano key to play a note, or use the keyboard shortcuts above. The first audio interaction may require a click or key press because browsers do not allow pages to start audio automatically.

## Notes

I kept this as a DOM events project instead of turning it into a full music app. The sound and keyboard controls are there because they make the original interaction easier to understand and more useful when I come back to practice it.
