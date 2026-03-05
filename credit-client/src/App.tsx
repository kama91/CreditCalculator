import { useMemo, useState, type CSSProperties } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreditTerms from './Components/CreditTerms';
import CreditDetails from './Components/CreditDetails';

const fontOptions = [
  { label: 'System', value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" },
  { label: 'Georgia', value: "Georgia, 'Times New Roman', serif" },
  { label: 'Trebuchet', value: "'Trebuchet MS', 'Segoe UI', sans-serif" },
  { label: 'Courier', value: "'Courier New', monospace" },
];

function App() {
  const [backgroundColor, setBackgroundColor] = useState<string>('#282c34');
  const [fontFamily, setFontFamily] = useState<string>(fontOptions[0].value);

  const appStyle = useMemo(
    () =>
      ({
        '--app-bg': backgroundColor,
        '--app-font': fontFamily,
      }) as CSSProperties,
    [backgroundColor, fontFamily]
  );

  return (
    <div className="App" style={appStyle}>
      <div className="theme-toolbar">
        <label>
          Фон:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>
        <label>
          Шрифт:
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            {fontOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<CreditTerms />} />
          <Route path="/creditDetails" element={<CreditDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
