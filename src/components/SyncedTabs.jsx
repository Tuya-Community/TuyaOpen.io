import React, { createContext, useContext, useState, useEffect } from 'react';
import './SyncedTabs.css';

const TabContext = createContext();

// Global synchronized tab state
let globalTabValue = null;
let listeners = [];

function setGlobalTab(value) {
  globalTabValue = value;
  listeners.forEach((cb) => cb(value));
}

export function SyncedTabs({ children, defaultValue = 'windows', values }) {
  const [selected, setSelected] = useState(globalTabValue || defaultValue);

  useEffect(() => {
    const cb = (val) => setSelected(val);
    listeners.push(cb);
    return () => {
      listeners = listeners.filter((l) => l !== cb);
    };
  }, []);

  const handleTabClick = (val) => {
    setGlobalTab(val);
    setSelected(val);
  };

  return (
    <TabContext.Provider value={{ selected, setSelected: handleTabClick, values }}>
      <div className="synced-tabs">
        <div className="tab-buttons">
          {values.map((tab) => (
            <button
              key={tab.value}
              className={selected === tab.value ? 'active' : ''}
              onClick={() => handleTabClick(tab.value)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">{children}</div>
      </div>
    </TabContext.Provider>
  );
}

export function SyncedTabItem({ value, children }) {
  const { selected } = useContext(TabContext);
  if (selected !== value) return null;
  return <div>{children}</div>;
}
