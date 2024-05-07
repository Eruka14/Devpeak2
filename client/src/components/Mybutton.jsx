import React from "react";

const Mybutton = (props) => {
  return (
    <button
      className={`border-[1px] border-slate-300 rounded-md py-2 px-4 m-2 text-xs ${props.style}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Mybutton;
