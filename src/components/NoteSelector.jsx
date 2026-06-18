const WHITE_KEYS = [
  { note: "C" },
  { note: "D" },
  { note: "E" },
  { note: "F" },
  { note: "G" },
  { note: "A" },
  { note: "B" },
];

const BLACK_KEYS = [
  { note: "Csharp", sharp: "C#", flat: "Db", col: 0 },
  { note: "Dsharp", sharp: "D#", flat: "Eb", col: 1 },
  { note: "Fsharp", sharp: "F#", flat: "Gb", col: 3 },
  { note: "Gsharp", sharp: "G#", flat: "Ab", col: 4 },
  { note: "Asharp", sharp: "A#", flat: "Bb", col: 5 },
];

function NoteSelector({ selectedNote, onSelect, notation, onNotationChange }) {
  const handleWhiteClick = (note) => {
    onSelect(note);
  };

  const handleBlackClick = (note, newNotation) => {
    onNotationChange(newNotation);
    onSelect(note);
  };

  return (
    <div className="piano">
      <div className="white-keys">
        {WHITE_KEYS.map(({ note }) => (
          <button
            key={note}
            className={`white-key ${selectedNote === note ? 'selected' : ''}`}
            onClick={() => handleWhiteClick(note)}
          >
            {note}
          </button>
        ))}
      </div>
      <div className="black-keys">
        {BLACK_KEYS.map(({ note, sharp, flat, col }) => (
          <div
            key={note}
            className="black-key"
            style={{ left: `${((col + 1) / 7) * 100}%` }}
          >
            <button
              className={`half-top ${selectedNote === note && notation === 'sharp' ? 'selected' : ''}`}
              onClick={() => handleBlackClick(note, 'sharp')}
            >
              {sharp}
            </button>
            <button
              className={`half-bot ${selectedNote === note && notation === 'flat' ? 'selected' : ''}`}
              onClick={() => handleBlackClick(note, 'flat')}
            >
              {flat}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteSelector;
