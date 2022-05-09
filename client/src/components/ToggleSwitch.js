import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const InvisibleCheckbox = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
`;

const ToggleSwitchOff = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 50%;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
  }
`;

const ToggleSwitchOn = styled(ToggleSwitchOff)`
  background-color: green;

  &:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const ToggleSwitch = ({on='', off='', defaultValue=false, onChange=()=>{}}) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = (e) => {
    //console.log(e.target.value);
    onChange(!value);
    setValue(!value);
  };

  return (
    <Switch>
      <InvisibleCheckbox name="charityOnly" type="checkbox" checked={defaultValue} isChecked={value} onChange={toggle}/>
      {value ? <ToggleSwitchOn/> : <ToggleSwitchOff/>}
      <span>{value ? on : off}</span>
    </Switch>
  );
};

export default ToggleSwitch;