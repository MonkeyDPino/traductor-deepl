import { Button } from "react-bootstrap";
import { ArrowsIcon } from "./Icons";

interface InterchangeButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

const InterchangeButton: React.FC<InterchangeButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: "#3b3a3a",
      }}
    >
      <ArrowsIcon color="#fff" />
    </Button>
  );
};

export default InterchangeButton;
