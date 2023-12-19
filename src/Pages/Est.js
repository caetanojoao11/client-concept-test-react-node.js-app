import React, {useState} from 'react';

const Est = () => {

    const [isLineColored, setIsLineColored] = useState(true);


  const siloStyle = {
    width: '100px', // Adjust the width as needed
    height: '150px', // Adjust the height as needed
    display: 'inline-block',
    position: 'relative',
    margin: '10px',
  };

  const lineStyle = {
    position: 'absolute',
    width: '100px',
    backgroundColor: isLineColored ? 'red' : 'green',
    height: '100%',
    top: '0',
    left: '50%',
    transform: !isLineColored ? 'translateX(-50%)' : 'rotate(90deg) translateX(-50%)', 
  };

  const handleToggleColor = () => {
    if(!isLineColored){
        setIsLineColored(true)
    }
    else{
        setIsLineColored(false);
    }
  };

  return (
    <div>
        <button onClick={handleToggleColor}>LIGADO/DESLIGADO</button>
      <div style={siloStyle}>
        <div style={lineStyle}></div>
      </div>

      <div style={siloStyle}>
        
        <div style={lineStyle}></div>
      </div>

      <div style={siloStyle}>
        
        <div style={lineStyle}></div>
      </div>

      <div style={siloStyle}>
        
        {/* No line for the last silo */}
      </div>
    </div>
  );
};

export default Est;
