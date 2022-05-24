import {useState} from 'react';

/**
 *Modal state hook and toggle status
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({});

  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    values,
    toggle,
    setValues,
    setIsOpen
  };
};
