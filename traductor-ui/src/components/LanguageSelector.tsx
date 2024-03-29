import Form from "react-bootstrap/Form";
import { LANGUAGES, AUTOLANGUAGE } from "../constants";
import { FromLanguages, Languages, SectionType } from "../types.d";

type LanguageSelectorProps =
  | {
      type: SectionType.FROM;
      onChange: (language: FromLanguages) => void;
      value: FromLanguages;
    }
  | {
      type: SectionType.TO;
      onChange: (language: Languages) => void;
      value: Languages;
    };

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  type,
  onChange,
  value,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Languages);
  };

  return (
    <Form.Select
      aria-label="Default select example"
      value={value}
      onChange={handleChange}
    >
      {type === SectionType.FROM &&
        Object.entries(AUTOLANGUAGE).map(([code, language]) => (
          <option key={code} value={code}>
            {language}
          </option>
        ))}
      {Object.entries(LANGUAGES).map(([code, language]) => (
        <option key={code} value={code}>
          {language}
        </option>
      ))}
    </Form.Select>
  );
};

export default LanguageSelector;
