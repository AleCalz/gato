export const Square = ({ children, updateBoard, idx, isSelected }) => {
  const classname = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(idx);
  };
  return (
    <div onClick={handleClick} className={classname}>
      {children}
    </div>
  );
};