// App.js
import React, { useState } from 'react';
import BoatGame from './Pages/BoatGame';
import Est from './Pages/Est';

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isComponentSelected, setIsComponentSelected] = useState(false);

  const renderComponent = (component) => {
    setSelectedComponent(component);
    setIsComponentSelected(true);
  };

  const goBack = () => {
    setSelectedComponent(null);
    setIsComponentSelected(false);
  };

  return (
    <div>
      {!isComponentSelected ? (
        <div>
          <button onClick={() => renderComponent(<BoatGame />)}>Boat Game</button>
          <button onClick={() => renderComponent(<Est />)}>Est</button>
        </div>
      ) : (
        <div>
          <button onClick={goBack}>Return</button>
          
          {selectedComponent}
        </div>
      )}
    </div>
  );
};

export default App;
