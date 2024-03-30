import { Button, Form } from "react-bootstrap";
import { SectionType } from "../types.d";
import { ClipBoardIcon } from "./Icons";

export type TextAreaProps = {
  type: SectionType.FROM | SectionType.TO;
  loading?: boolean;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  showCopyButton?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({
  type,
  value,
  onChange,
  loading,
  placeholder,
  showCopyButton,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <Form.Control
        as="textarea"
        placeholder={loading ? "Cargando..." : placeholder}
        autoFocus={type === SectionType.FROM}
        readOnly={type === SectionType.TO}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ height: "200px" }}
      />
      {showCopyButton && (
        <Button
          variant="link"
          style={{ position: "absolute", left: 0, bottom: 0 }}
          onClick={() => {
            navigator.clipboard.writeText(value);
          }}
        >
          <ClipBoardIcon />
        </Button>
      )}
    </div>
  );
};

export default TextArea;
