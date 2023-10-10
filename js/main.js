const arrayNotas = [
  "C",
  "Csharp",
  "D",
  "Dsharp",
  "E",
  "F",
  "Fsharp",
  "G",
  "Gsharp",
  "A",
  "Asharp",
  "B",
];

const compensationObjet = {
  12: 0,
  13: 1,
  14: 2,
  15: 3,
  16: 4,
  17: 5,
  18: 6,
  19: 7,
  20: 8,
  21: 9,
  22: 10,
  23: 11,
};

function turnOnNotes(arrayOfNotes) {
  const on_notas = document.querySelectorAll(".on");
  on_notas.forEach((nota) => {
    nota.classList.remove("on");
  });
  arrayOfNotes.forEach((note) => {
    document.querySelectorAll("#" + note).forEach((note) => {
      note.classList.add("on");
    });
  });
}

function compensateNotes(arrayOfIntervals) {
  const compensatedArrayOfIntervals = arrayOfIntervals.map((interval) => {
    if (interval === 12) return 0 ;
    if (compensationObjet[interval]) {
      return compensationObjet[interval];
    } else return interval;
  });
  return compensatedArrayOfIntervals;
}

const noteButtons = document.querySelectorAll(".noteButton");
const botones = document.querySelectorAll(".button");


noteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    noteButtons.forEach((button) => {
      button.classList.remove("selected");
    });
      botones.forEach((button) => {
        button.classList.remove("selected");
      })
    e.target.classList.add("selected");

    const id = e.target.id.slice(7);
    const on_notas = document.querySelectorAll(".on");
    on_notas.forEach((nota) => {
      nota.classList.remove("on");
    });

    document.querySelectorAll("#" + id).forEach((note) => {
      note.classList.add("on");
    });
  });
});

botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
      boton.classList.add("selected");
  
      botones.forEach(function (boton) {
      if (boton !== this) {
          boton.classList.remove("selected");
      }
      }, this);
  });
  });

// Seguramente existe alguna logica para no copiar todo el codigo en cada tipo de acorde

// ACORDE MAYOR ****************************************************************************************

const majorButton = document.querySelector(".major");
majorButton.addEventListener("click", (e) => {
  const selectedNote = document.querySelector(".selected");
  const note = selectedNote.id.slice(7);

  const root = arrayNotas.indexOf(note);
  const third = root + 4;
  const fifth = root + 7;

  const majorChordNotes = [root, third, fifth];

  const majorChord = compensateNotes(majorChordNotes).map((note) => {
    return arrayNotas[note];
  });
  turnOnNotes(majorChord);
});

// ACORDE MENOR ****************************************************************************************

const minorButton = document.querySelector(".minor");
minorButton.addEventListener("click", (e) => {
  const selectedNote = document.querySelector(".selected");
  const note = selectedNote.id.slice(7);

  const root = arrayNotas.indexOf(note);
  const thirdMinor = root + 3;
  const fifth = root + 7;

  const minorChordNotes = [root, thirdMinor, fifth];

  const minorChord = compensateNotes(minorChordNotes).map((note) => {
    return arrayNotas[note];
  });
  turnOnNotes(minorChord);
});

// ACORDE DISMINUIDO ****************************************************************************************

const diminishedButton = document.querySelector(".diminished");
diminishedButton.addEventListener("click", (e) => {
  const selectedNote = document.querySelector(".selected");
  const note = selectedNote.id.slice(7);

  const root = arrayNotas.indexOf(note);
  const thirdMinor = root + 3;
  const fifthDiminished = root + 6;

  const diminishedChordNotes = [root, thirdMinor, fifthDiminished];

  const diminishedChord = compensateNotes(diminishedChordNotes).map((note) => {
    return arrayNotas[note];
  });
  turnOnNotes(diminishedChord);
});

// ACORDE AUMENTADO ****************************************************************************************

const augmentedButton = document.querySelector(".augmented");
augmentedButton.addEventListener("click", (e) => {
  const selectedNote = document.querySelector(".selected");
  const note = selectedNote.id.slice(7);

  const root = arrayNotas.indexOf(note);
  const third = root + 4;
  const fifthAugmented = root + 8;

  const augmentedChordNotes = [root, third, fifthAugmented];

  const augmentedChord = compensateNotes(augmentedChordNotes).map((note) => {
    return arrayNotas[note];
  });
  turnOnNotes(augmentedChord);
});

// ACORDE SUS2 ****************************************************************************************

const sus2Button = document.querySelector(".sus2");
sus2Button.addEventListener("click", (e) => {
  const selectedNote = document.querySelector(".selected");
  const note = selectedNote.id.slice(7);

  const root = arrayNotas.indexOf(note);
  const second = root + 2;
  const fifth = root + 7;

  const sus2ChordNotes = [root, second, fifth];

  const sus2Chord = compensateNotes(sus2ChordNotes).map((note) => {
    return arrayNotas[note];
  });
  turnOnNotes(sus2Chord);
});

// ACORDE SUS4 ****************************************************************************************

const sus4Button = document.querySelector(".sus4");
sus4Button.addEventListener("click", (e) => {
  const selectedNote = document.querySelector(".selected");
  const note = selectedNote.id.slice(7);

  const root = arrayNotas.indexOf(note);
  const fourth = root + 5;
  const fifth = root + 7;

  const sus4ChordNotes = [root, fourth, fifth];

  const sus4Chord = compensateNotes(sus4ChordNotes).map((note) => {
    return arrayNotas[note];
  });
  turnOnNotes(sus4Chord);
});

// ACORDE 5 ****************************************************************************************

const powerChordButton = document.querySelector(".powerChord");
powerChordButton.addEventListener("click", (e) => {
  const selectedNote = document.querySelector(".selected");
  const note = selectedNote.id.slice(7);

  const root = arrayNotas.indexOf(note);
  const fifth = root + 7;

  const powerChordChordNotes = [root, fifth];

  const powerChordChord = compensateNotes(powerChordChordNotes).map((note) => {
    return arrayNotas[note];
  });
  turnOnNotes(powerChordChord);
});
