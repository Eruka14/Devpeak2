import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((visibility) => !visibility);
  };

  const Icon = visible ? (
    <FaEyeSlash onClick={toggleVisibility} />
  ) : (
    <FaEye onClick={toggleVisibility} />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePasswordToggle;
