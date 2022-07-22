import useModal from 'hooks/useModal';

function useDeleteTagDialog() {
  const {isOpen, setIsOpen, setValues, values} = useModal();

  return {
    open: isOpen,
    setOpen: setIsOpen,
    setTag: setValues,
    tag: values
  };
}

export default useDeleteTagDialog;
