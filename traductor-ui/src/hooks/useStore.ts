import { useReducer } from "react";
import type { State, Action, FromLanguages, Languages } from "../types";

const initialState: State = {
  fromLanguage: "ES",
  toLanguage: "EN-US",
  fromText: "",
  result: "",
  loading: false,
};

const reducer = (state: State, action: Action): State => {
  const { type } = action;
  const hasFromText = state.fromText !== "";
  switch (type) {
    case "INTERCHANGE_LANGUAGES":
      if (state.fromLanguage === "auto") {
        return state;
      }

      return {
        ...state,
        loading: hasFromText,
        result: "",
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      };

    case "SET_FROM_LANGUAGE":
      return {
        ...state,
        loading: hasFromText && action.payload !== state.toLanguage,
        result: action.payload === state.toLanguage ? state.result : "",
        fromLanguage: action.payload,
      };

    case "SET_TO_LANGUAGE":
      return {
        ...state,
        loading: hasFromText && state.fromLanguage !== action.payload,
        result: state.fromLanguage === action.payload ? state.result : "",
        toLanguage: action.payload,
      };

    case "SET_FROM_TEXT":
      return {
        ...state,
        loading: action.payload !== "",
        result: "",
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
  const [state, dispatch] = useReducer(reducer, initialState);

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
    ...state,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    interchangeLanguages,
  };
};

export default useStore;
