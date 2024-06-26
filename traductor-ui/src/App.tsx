import { Col, Row, Container, Button, Stack } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useStore from "./hooks/useStore";
import { ArrowsIcon, LogoIcon, LogoNameIcon } from "./components/Icons";
import LanguageSelector from "./components/LanguageSelector";
import { FromLanguages, SectionType } from "./types.d";
import TextArea from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import useDebounce from "./hooks/useDebounce";
import InterchangeButton from "./components/InterchangeButton";
import Header from "./components/Header";

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedFromText = useDebounce<string>(fromText, 1000);

  useEffect(() => {
    if (debouncedFromText !== "" && fromLanguage !== toLanguage) {
      // translate(
      //   debouncedFromText,
      //   fromLanguage === "auto" ? null : fromLanguage,
      //   toLanguage
      // ).then((res) => {
      //   if (res) {
      //     setResult(res.translation.text);
      //   }
      // });
      setResult("res.translation.text");
    }
  }, [debouncedFromText, fromLanguage, toLanguage]);

  const handleSpeak = (text: string, lang: FromLanguages) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col>
            <Stack gap={2}>
              <h2>From</h2>
              <LanguageSelector
                type={SectionType.FROM}
                onChange={setFromLanguage}
                value={fromLanguage}
              />
              <TextArea
                value={fromText}
                type={SectionType.FROM}
                onChange={setFromText}
                placeholder="Enter text"
                showSpeakButton
                onSpeak={() => handleSpeak(fromText, fromLanguage)}
              />
            </Stack>
          </Col>
          <Col xs={"auto"}>
            <InterchangeButton
              onClick={interchangeLanguages}
              disabled={fromLanguage === "auto"}
            />
          </Col>
          <Col>
            <Stack gap={2}>
              <h2>To</h2>
              <LanguageSelector
                type={SectionType.TO}
                onChange={setToLanguage}
                value={toLanguage}
              />
              <TextArea
                value={result}
                type={SectionType.TO}
                onChange={setResult}
                placeholder="Translation"
                loading={loading}
                showCopyButton
                showSpeakButton
                onSpeak={() => handleSpeak(result, toLanguage)}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
