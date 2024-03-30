import { Button, Form } from "react-bootstrap";
import { SectionType } from "../types.d";
import { ClipBoardIcon, SpeakIcon } from "./Icons";

export type TextAreaProps = {
  type: SectionType.FROM | SectionType.TO;
  loading?: boolean;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  showCopyButton?: boolean;
  showSpeakButton?: boolean;
  onSpeak?: () => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  type,
  value,
  onChange,
  loading,
  placeholder,
  showCopyButton,
  showSpeakButton,
  onSpeak,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <Form.Control
        as="textarea"
        placeholder={loading ? "Cargando..." : placeholder}
        autoFocus={type === SectionType.FROM}
        readOnly={type === SectionType.TO}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: "180px",
          border: "none",
          resize: "none",
        }}
      />
      <div style={{ textAlign: "start" }}>
        {showCopyButton && (
          <Button
            variant="link"
            onClick={() => {
              navigator.clipboard.writeText(value);
            }}
            style={{ paddingRight: "5px" }}
          >
            <ClipBoardIcon />
          </Button>
        )}
        {showSpeakButton && (
          <Button variant="link" onClick={() => onSpeak && onSpeak()}>
            <SpeakIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TextArea;
