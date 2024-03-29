import { useReducer } from "react";
import type { State, Action, FromLanguages, Languages } from "../types";

const initialState: State = {
  fromLanguage: "es",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

const reducer = (state: State, action: Action): State => {
  const { type } = action;
  switch (type) {
    case "INTERCHANGE_LANGUAGES":
      if (state.fromLanguage === "auto") {
        return state;
      }
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      };

    case "SET_FROM_LANGUAGE":
      return {
        ...state,
        fromLanguage: action.payload,
      };

    case "SET_TO_LANGUAGE":
      return {
        ...state,
        toLanguage: action.payload,
      };

    case "SET_FROM_TEXT":
      return {
        ...state,
        loading: true,
        fromText: action.payload,
      };

    case "SET_RESULT":
      return {
        ...state,
        loading: false,
        result: action.payload,
      };

    default:
      return state;
  }
};

const useStore = () => {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  const setFromLanguage = (fromLanguage: FromLanguages) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload: fromLanguage });
  };

  const setToLanguage = (toLanguage: Languages) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload: toLanguage });
  };

  const setFromText = (fromText: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload: fromText });
  };

  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setResult = (result: string) => {
    dispatch({ type: "SET_RESULT", payload: result });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    interchangeLanguages,
  };
};

export default useStore;
