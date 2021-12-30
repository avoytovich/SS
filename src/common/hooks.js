import { useState } from 'react';

/**
 *Modal state hook and toggle status
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggle,
  };
};
