import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

export type TextAreaProps = {
  type: SectionType.FROM | SectionType.TO;
  loading?: boolean;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
};

const TextArea: React.FC<TextAreaProps> = ({
  type,
  value,
  onChange,
  loading,
  placeholder,
}) => {
  return (
    <Form.Control
      as="textarea"
      placeholder={loading ? "Cargando..." : placeholder}
      autoFocus={type === SectionType.FROM}
      readOnly={type === SectionType.TO}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ height: "200px" }}
    />
  );
};

export default TextArea;
