import { useState } from 'react';
import { CHORD_DEFINITIONS, CATEGORY_ORDER, CATEGORY_LABELS } from '../data/chords';

const grouped = {};
CATEGORY_ORDER.forEach((cat) => {
  grouped[cat] = Object.keys(CHORD_DEFINITIONS).filter(
    (name) => CHORD_DEFINITIONS[name].category === cat
  );
});

const CATEGORY_COLORS = {
  basic: 'var(--color-cat-basic)',
  seventh: 'var(--color-cat-seventh)',
  sixth: 'var(--color-cat-sixth)',
  extended: 'var(--color-cat-extended)',
  altered: 'var(--color-cat-altered)',
};

function ChordTypeSelector({ selectedChord, onSelect }) {
  const [collapsed, setCollapsed] = useState({});

  const toggle = (cat) => {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="selector-tipo" role="group" aria-label="Chord type selector">
      {CATEGORY_ORDER.map((cat, idx) =>
        grouped[cat].length > 0 ? (
          <div key={cat} className="chord-category">
            {idx > 0 && <div className="category-divider" />}
            <div
              className="category-header"
              onClick={() => toggle(cat)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(cat); } }}
              aria-expanded={!collapsed[cat]}
              aria-label={`Toggle ${CATEGORY_LABELS[cat]} chords`}
            >
              <span className={`category-arrow ${!collapsed[cat] ? 'open' : ''}`}>&#9654;</span>
              <h4 className="category-label">{CATEGORY_LABELS[cat]}</h4>
            </div>
            <div className={`chord-buttons ${collapsed[cat] ? 'collapsed' : ''}`}>
              {grouped[cat].map((name) => (
                <button
                  key={name}
                  className={`chordType ${selectedChord === name ? 'selected' : ''}`}
                  onClick={() => onSelect(name)}
                  style={{ '--cat-color': CATEGORY_COLORS[cat] }}
                  aria-label={`${name} chord`}
                  aria-current={selectedChord === name ? 'true' : undefined}
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
