import Form from "react-bootstrap/Form";
import { LANGUAGES, AUTOLANGUAGE } from "../constants";
import { FromLanguages, Languages, SectionType } from "../types.d";
import { Select, Option } from "@mui/joy";

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
  const handleChange = (
    e:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element, Element>
      | null
  ) => {
    // onChange(e.target.value as Languages);
    console.log(e);
  };

  return (
    <Select
      aria-label="Default select example"
      value={value}
      onChange={(e) => handleChange(e)}
    >
      {type === SectionType.FROM &&
        Object.entries(AUTOLANGUAGE).map(([code, language]) => (
          <Option key={code} value={code}>
            {language}
          </Option>
        ))}
      {Object.entries(LANGUAGES).map(([code, language]) => (
        <Option key={code} value={code}>
          {language}
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSelector;
