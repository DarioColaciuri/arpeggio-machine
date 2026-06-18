import { STANDARD_TUNING, getNoteAtFret, formatNoteLabel } from '../data/notes';

const SINGLE_MARKERS = [3, 5, 7, 9, 15, 17, 19, 21];
const DOUBLE_MARKERS = [12, 24];

function FretCell({ note, highlighted, isRoot, notation }) {
  return (
    <div className={`nota-wrapper ${highlighted ? 'on' : ''} ${highlighted && isRoot ? 'root' : ''}`}>
      <img
        className="nota-dot"
        src="/nota.png"
        alt={note}
      />
      {highlighted && <span className="note-label">{formatNoteLabel(note, notation)}</span>}
    </div>
  );
}

function Fretboard({ highlightedNotes, rootNote, notation }) {
  const markers = [];
  SINGLE_MARKERS.forEach((fret) => {
    markers.push({ id: `m-${fret}`, fret, row: '3 / 5', cls: 'single' });
  });
  DOUBLE_MARKERS.forEach((fret) => {
    markers.push({ id: `m-${fret}-top`, fret, row: '2 / 4', cls: 'double-top' });
    markers.push({ id: `m-${fret}-bot`, fret, row: '4 / 6', cls: 'double-bot' });
  });

  return (
    <div className="guitarra">
      <div className="nut" style={{ gridColumn: '2', gridRow: '1 / 7' }} />
      {STANDARD_TUNING.map((openNote, stringIndex) => {
        const row = 6 - stringIndex;
        const isOpenOn = highlightedNotes.has(openNote);
        const isOpenRoot = isOpenOn && openNote === rootNote;
        return (
          <div key={stringIndex} className="string-row">
            <div
              className="string-label"
              style={{ gridColumn: '1', gridRow: row }}
            >
              {isOpenOn ? (
                <div className={`nota-wrapper on ${isOpenRoot ? 'root' : ''}`}>
                  <img className="nota-dot" src="/nota.png" alt={openNote} />
                  <span className="note-label">{formatNoteLabel(openNote, notation)}</span>
                </div>
              ) : (
                <span className="string-name">{openNote}</span>
              )}
            </div>
            {Array.from({ length: 24 }, (_, fret) => {
              const note = getNoteAtFret(openNote, fret + 1);
              const on = highlightedNotes.has(note);
              return (
                <div
                  key={fret}
                  className={`strings string-${stringIndex} ${stringIndex < 3 ? 'wound' : 'plain'}`}
                  style={{ gridColumn: fret + 3, gridRow: row }}
                >
                  <FretCell
                    note={note}
                    highlighted={on}
                    isRoot={on && note === rootNote}
                    notation={notation}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      {markers.map((m) => (
        <div
          key={m.id}
          className={`fret-marker ${m.cls}`}
          style={{ gridColumn: m.fret + 2, gridRow: m.row }}
        />
      ))}
    </div>
  );
}

export default Fretboard;
