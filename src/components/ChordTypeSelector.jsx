import { CHORD_DEFINITIONS, CATEGORY_ORDER, CATEGORY_LABELS } from '../data/chords';

function ChordTypeSelector({ selectedChord, onSelect }) {
  const grouped = {};
  CATEGORY_ORDER.forEach((cat) => {
    grouped[cat] = Object.keys(CHORD_DEFINITIONS).filter(
      (name) => CHORD_DEFINITIONS[name].category === cat
    );
  });

  return (
    <div className="selector-tipo">
      {CATEGORY_ORDER.map((cat) =>
        grouped[cat].length > 0 ? (
          <div key={cat} className="chord-category">
            <h4 className="category-label">{CATEGORY_LABELS[cat]}</h4>
            <div className="chord-buttons">
              {grouped[cat].map((name) => (
                <button
                  key={name}
                  className={`chordType ${selectedChord === name ? 'selected' : ''}`}
                  onClick={() => onSelect(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default ChordTypeSelector;
