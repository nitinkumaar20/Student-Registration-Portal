import React, { useEffect } from "react";

const Field = ({label, name, disabled, value, isValid, handleChange, adrs, required=true, min, max, step, type='text'}) => {

  useEffect(() => { 
    let ele = document.getElementById(`validation${name}${adrs ? `_${adrs}`: ''}`); 
    if (required == false) {
      ele.removeAttribute('required') 
    } 
  }, [])

  const handleAdrs = (e) => {
    if(adrs && adrs != ''){
      handleChange(e, adrs)
    }
    else{
      handleChange(e)
    }  
  }
   
  return (
    <div className="col mb-3">
      <label htmlFor={`validation${name}${adrs ? `_${adrs}`: ''}`} className={`form-label ${required && 'mandatory'}`}>
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={`validation${name}${adrs ? `_${adrs}`: ''}`}
        name={name}
        disabled={disabled || false}
        value={value || ''}
        onBlur={isValid}
        onChangeCapture={isValid}
        onChange={handleAdrs}
        autoComplete="off" 
        required
        min={min}
        max={max}
        step={step} 
      />
      <div className="invalid-feedback"></div>
    </div>
  );
};

export default Field;
