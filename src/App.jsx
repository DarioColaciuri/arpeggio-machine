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
  const { playChord, playing } = useAudio();

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
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header>
        <img
          className="header-icon"
          src="/guitar-head-svgrepo-com.svg"
          alt=""
          role="presentation"
        />
        <h1 className={`titulo ${playing ? 'playing' : ''}`}>
          Arpeggio machine
          <svg className={`speaker-icon ${playing ? 'active' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </h1>
      </header>
      <div
        id="main-content"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {selectedNote && selectedChord
          ? `Playing ${selectedNote} ${selectedChord}`
          : selectedNote
            ? `Selected note ${selectedNote}`
            : ''}
      </div>
      <main>
        <Fretboard highlightedNotes={highlightedNotes} rootNote={selectedNote} notation={notation} />
        <div className="selector">
          <h3 className="section-title">Note</h3>
          <NoteSelector
            selectedNote={selectedNote}
            onSelect={handleNoteSelect}
            notation={notation}
            onNotationChange={setNotation}
          />
          <h3 className="section-title">Type</h3>
          <ChordTypeSelector selectedChord={selectedChord} onSelect={handleChordSelect} />
        </div>
      </main>
      <footer>
        <p className="footer">Dario Colaciuri</p>
      </footer>
    </div>
  );
}

export default App;
