import { LANGUAGES, AUTOLANGUAGE } from "./constants";

type AutoLanguage = keyof typeof AUTOLANGUAGE;
type Languages = keyof typeof LANGUAGES;
type FromLanguages = AutoLanguage | Languages;

type State = {
  fromLanguage: FromLanguages;
  toLanguage: Languages;
  fromText: string;
  result: string;
  loading: boolean;
};

type Action =
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguages }
  | { type: "SET_TO_LANGUAGE"; payload: Languages }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };

enum SectionType {
  FROM = "from",
  TO = "to",
}

export { State, FromLanguages, Languages, AutoLanguage, Action, SectionType };
