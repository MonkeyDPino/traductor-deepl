import { Col, Row, Container, Button, Stack } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useStore from "./hooks/useStore";
import { ArrowsIcon } from "./components/Icons";
import LanguageSelector from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import TextArea from "./components/TextArea";
import { translate } from "./services/translate";
import { useEffect } from "react";

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

  useEffect(() => {
    const fetchTranslation = async () => {
      setResult(await translate("hello world", null, "es"));
    };
    fetchTranslation();
  }, []);

  return (
    <Container fluid>
      <h1>Google Translate</h1>
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
            />
          </Stack>
        </Col>
        <Col xs={"auto"}>
          <Button
            variant="primary"
            disabled={fromLanguage === "auto"}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </Button>
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
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
