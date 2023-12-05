import React, { useEffect } from "react";

const Select = ({
  label,
  name, 
  simple,
  multi,
  value,
  handleChange,
  isValid,
  adrs,
  required,
  disabled
}) => {

  
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
      <label htmlFor={`validation${name}${adrs ? `_${adrs}`: ''}`} className="form-label mandatory"> {label} </label>
      <select
        name={name}
        id={`validation${name}${adrs ? `_${adrs}`: ''}`}
        className="form-select" 
        value={value || ""}
        onChange={handleAdrs}
        onChangeCapture={isValid}
        onBlur={isValid} 
        required
        disabled={disabled || false}
      >
        <option disabled value={''}>-----------------</option>
        {simple &&
          simple.map((ele, i) => {
            return (
              <option key={i} value={ele}>
                {ele}
              </option>
            );
          })}

        {multi &&
          multi.map((ele, i) => {
            return (
              <option key={i} value={ele.short}>
                {ele.full}
              </option>
            );
          })}
      </select>
      <div className="invalid-feedback"></div>
    </div>
  );
};

export default Select;
