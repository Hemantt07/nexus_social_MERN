import { Brightness6 } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

export default function SwitchMode() {
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (lightMode) {
      localStorage.setItem('mode', lightMode)
    } else {
      localStorage.setItem('mode', lightMode)
    }

    if ( localStorage.getItem('mode') == 'true' ) {
      body.classList.add('light-mode');
    }else {
      body.classList.remove('light-mode');
    }
    
  }, [lightMode]);
  
  const toggleLightMode = () => {
    setLightMode(prevLightMode => !prevLightMode);
  };

  return (
    <div className='SwitchMode'>
         <Tooltip title={lightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
            <Brightness6 id="switchMode" onClick={toggleLightMode} />
        </Tooltip> 
    </div>
  )
}
