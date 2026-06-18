export const CHROMATIC = [
  "C", "Csharp", "D", "Dsharp", "E", "F",
  "Fsharp", "G", "Gsharp", "A", "Asharp", "B"
];

export const NOTE_DISPLAY = {
  sharp: {
    "C": "C", "Csharp": "C#", "D": "D", "Dsharp": "D#",
    "E": "E", "F": "F", "Fsharp": "F#", "G": "G",
    "Gsharp": "G#", "A": "A", "Asharp": "A#", "B": "B"
  },
  flat: {
    "C": "C", "Csharp": "Db", "D": "D", "Dsharp": "Eb",
    "E": "E", "F": "F", "Fsharp": "Gb", "G": "G",
    "Gsharp": "Ab", "A": "A", "Asharp": "Bb", "B": "B"
  }
};

export function formatNoteLabel(note, notation = 'sharp') {
  return NOTE_DISPLAY[notation]?.[note] || note;
}

export const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"];

export function getNoteAtFret(openNote, fret) {
  const openIndex = CHROMATIC.indexOf(openNote);
  const noteIndex = (openIndex + fret) % 12;
  return CHROMATIC[noteIndex];
}

export function computeChordNotes(rootNote, intervals) {
  const rootIndex = CHROMATIC.indexOf(rootNote);
  return intervals.map((interval) => {
    const noteIndex = (rootIndex + interval) % 12;
    return CHROMATIC[noteIndex];
  });
}
