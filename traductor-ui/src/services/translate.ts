import { FromLanguages, Languages, translationResponse } from "../types";

export const translate = async (
  text: string,
  sourceLang: FromLanguages | null,
  targetLang: Languages
): Promise<translationResponse | false> => {
  try {
    const translation = await fetch(import.meta.env.VITE_TRANSLATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, sourceLang, targetLang }),
    });
    const json = await translation.json();
    return {
      translation: {
        text: json?.translation?.text as string,
      },
    };
  } catch (error) {
    console.error(error);
    return false;
  }
};
