import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Box, Button } from "@chakra-ui/react";
import styles from "./challenge.module.scss";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const Challenge = () => {
  const [output, setOutput] = useState("");
  const [test, setTest] = useState({});
  const { applicant, testId } = useParams();
  const [editorValue, setEditorValue] = useState("");
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTest = async () => {
      await axios
        .get(`test/${testId}`)
        .then((res) => {
          console.log("res", res);
          setTest(res.data);
          setEditorValue(res.data.initialIDECode);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTest();
  }, []);

  const onChange = React.useCallback((value, viewUpdate) => {
    setEditorValue(value);
  }, []);

  const handleTest = async () => {
    setIsTestLoading(true);
    await axios
      .post("/code/test", {
        code: editorValue,
        language: "js",
      })
      .then((res) => {
        setIsTestLoading(false);
        console.log(res);
        setOutput(res.data.output);
      })
      .catch((error) => {
        setIsTestLoading(false);
        console.log(error);
      });
  };

  const submitSolution = async () => {
    setSubmissionLoading(true);
    await axios
      .post("code/submit", { code: editorValue, testId: testId })
      .then((res) => {
        setSubmissionLoading(false);
        navigate("/test-completed");
        console.log("res", res);
      })
      .catch((error) => {
        setSubmissionLoading(false);
        console.log("error", error);
      });
  };

  if (test.completed) {
    return <Navigate to="/test-expired" />;
  }

  return (
    <div className={styles.challenge}>
      <div>
        <div className={styles.quiz}>
          <p>{test.question}</p>
          <Button
            size="sm"
            variant="outline"
            backgroundColor="#4F46E5"
            color="#fff"
            isLoading={submissionLoading}
            _hover={{ bg: "#6366f1" }}
            onClick={submitSolution}
          >
            Submit solution
          </Button>
        </div>
        <div className={styles.editorArea}>
          <div className={styles.editorWrapper}>
            <div>
              <Box pb="10px" textAlign="right">
                <Button
                  size="sm"
                  variant="outline"
                  ml="10px"
                  disabled
                  _disabled={{
                    opacity: ".1",
                    bg: "#000",
                  }}
                  onClick={handleTest}
                  isLoading={isTestLoading}
                >
                  Run test
                </Button>
              </Box>
              <CodeMirror
                theme={dracula}
                value={editorValue}
                height="400px"
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles.outputWrapper}>
            <p>Output</p>
            <div
              className={styles.output}
              style={output.error ? { color: "#bd5f5f" } : { color: "white" }}
            >
              {output.data}
            </div>
          </div>
        </div>
        <div className={styles.buttons}></div>
      </div>
      <div></div>
    </div>
  );
};

export default Challenge;
