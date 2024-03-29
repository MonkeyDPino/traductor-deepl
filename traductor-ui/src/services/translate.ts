import * as deepl from "deepl-node";

const authKey = "e2014f0e-337d-4ce5-849d-bd077f115521:fx"; // Replace with your key
const translator = new deepl.Translator(authKey);

export const translate = async (
  text: string,
  sourceLang: deepl.SourceLanguageCode | null,
  targetLang: deepl.TargetLanguageCode
) => {
  const translation = await translator.translateText(
    text,
    sourceLang,
    targetLang
  );
  return translation.text;
};
