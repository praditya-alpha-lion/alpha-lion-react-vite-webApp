import React from "react";
import "../../stylesheet/switch.scss";
/**
 *
 * @param {string} size types 'small', 'medium', 'large'
 * @param {string} isOn active
 * @param {function} handleToggle checked
 * @param {string} color
 * @returns
 */
const Switch = (props) => {
  return (
    <div className='flex'>
      <input
        checked={props.isOn}
        onChange={props.handleToggle}
        type='checkbox'
        id={"react-switch-new"}
        className={`react-switch-checkbox`}
      />
      <span
        style={{ background: props.isOn && props.onColor }}
        className={`react-switch-label         
        ${props.size === "small" && "react-switch-label-small"}
        ${props.size === "medium" && "react-switch-label-medium"}
        ${props.size === "large" && "react-switch-label-large"} 
        `}
        htmlFor={"react-switch-new"}>
        <span
          className={`react-switch-button 
        ${props.size === "small" && "react-switch-button-small"}
        ${props.size === "medium" && "react-switch-button-medium"}
        ${props.size === "large" && "react-switch-button-large"} `}
        />
      </span>
    </div>
  );
};

export default Switch;
