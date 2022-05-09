import React, { useState } from 'react';
import styled from 'styled-components';

const InvisibleCheckbox = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
`;

const ToggleSwitchOn = styled.span`
`;

const ToggleSwitchOff = styled.span`
`;

const ToggleSwitch = ({on='', off='', defaultValue=false, onChange=()=>{}}) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
      <InvisibleCheckbox type="checkbox" value={value} onChange={toggle}/>
      {value ? <ToggleSwitchOn/> : <ToggleSwitchOff/>}
      <span>{value ? on : off}</span>
    </>
  );
};

export default ToggleSwitch;