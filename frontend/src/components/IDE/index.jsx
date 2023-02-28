import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import Spinner from "../Spinner";
import styles from "./IDE.module.scss";
import axios from "../../api/axios";

const IDE = ({ setOutput, initialCode }) => {
  const [editorValue, setEditorValue] = useState("");
  const [isTestLoading, setIsTestLoading] = useState(false);

  useEffect(() => {
    setEditorValue(initialCode);
  }, []);
  
  const onChange = React.useCallback((value, viewUpdate) => {
    setEditorValue(value);
    console.log("value", value);
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

  return (
    <div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleTest}>
          {isTestLoading && <Spinner />} Run test
        </button>
      </div>
      <CodeMirror
        theme={dracula}
        value={editorValue}
        height="400px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </div>
  );
};

export default IDE;
