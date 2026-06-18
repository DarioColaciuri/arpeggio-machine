import { useState, useMemo } from 'react';
import { computeChordNotes } from './data/notes';
import { CHORD_DEFINITIONS } from './data/chords';
import Fretboard from './components/Fretboard';
import NoteSelector from './components/NoteSelector';
import ChordTypeSelector from './components/ChordTypeSelector';
import useAudio from './hooks/useAudio';
import './index.css';

function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedChord, setSelectedChord] = useState(null);
  const [notation, setNotation] = useState('sharp');
  const { playChord } = useAudio();

  const highlightedNotes = useMemo(() => {
    if (!selectedNote || !selectedChord) return new Set();
    const intervals = CHORD_DEFINITIONS[selectedChord]?.intervals;
    if (!intervals) return new Set();
    return new Set(computeChordNotes(selectedNote, intervals));
  }, [selectedNote, selectedChord]);

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    if (selectedChord) {
      const intervals = CHORD_DEFINITIONS[selectedChord].intervals;
      playChord(note, intervals);
    }
  };

  const handleChordSelect = (chord) => {
    setSelectedChord(chord);
    if (selectedNote) {
      const intervals = CHORD_DEFINITIONS[chord].intervals;
      playChord(selectedNote, intervals);
    }
  };

  return (
    <>
      <header>
        <h1 className="titulo">Arpeggio machine</h1>
      </header>
      <main>
        <Fretboard highlightedNotes={highlightedNotes} rootNote={selectedNote} notation={notation} />
        <div className="selector">
          <h3 className="titulo-notas">Note</h3>
          <NoteSelector
            selectedNote={selectedNote}
            onSelect={handleNoteSelect}
            notation={notation}
            onNotationChange={setNotation}
          />
          <h3 className="titulo-arpegio">Type</h3>
          <ChordTypeSelector selectedChord={selectedChord} onSelect={handleChordSelect} />
        </div>
      </main>
      <footer>
        <p className="footer">Dario Colaciuri</p>
      </footer>
    </>
  );
}

export default App;
