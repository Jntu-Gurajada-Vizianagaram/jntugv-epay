import React from "react";

export function Input({label, ...props}){
  return (
    <div style={{marginBottom:12}}>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}
