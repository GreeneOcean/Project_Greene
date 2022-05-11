import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 3em;
  height: 1.6em;
  margin-right: .4em;
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
  background-color: #999;
  border-radius: .8em;

  :before {
    position: absolute;
    content: "";
    height: 1.2em;
    width: 1.2em;
    left: .2em;
    bottom: .2em;
    background-color: white;
    border-radius: 50%;
  }
`;

const ToggleSwitchOn = styled(ToggleSwitchOff)`
  background-color: var(--color1);

  :before {
    -webkit-transform: translateX(1.4em);
    -ms-transform: translateX(1.4em);
    transform: translateX(1.4em);
  }
`;

const ToggleSwitch = ({on='', off='', defaultValue=false, onChange=()=>{}}) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = (e) => {
    onChange(!value);
    setValue(!value);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      toggle();
    }
  };

  return (
    <SwitchContainer>
    <Switch tabIndex="0" onKeyDown={handleKeyDown}>
      <InvisibleCheckbox name="charityOnly" type="checkbox" checked={defaultValue} isChecked={value} onChange={toggle}/>
      {value ? <ToggleSwitchOn/> : <ToggleSwitchOff/>}
    </Switch>
    <span>{value ? on : off}</span>
    </SwitchContainer>
  );
};

export default ToggleSwitch;