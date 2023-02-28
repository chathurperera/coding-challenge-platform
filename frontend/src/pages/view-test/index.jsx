import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import PageTitle from "@/components/PageTitle";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

const ViewTest = () => {
  const [editorValue, setEditorValue] = useState("");
  const { testId } = useParams();
  const [test, setTest] = useState({});

  const onChange = React.useCallback((value, viewUpdate) => {
    setEditorValue(value);
    console.log("value", value);
  }, []);

  useEffect(() => {
    axiosPrivate
      .get(`test/${testId}`)
      .then((res) => {
        setTest(res.data);
        setEditorValue(res.data.submittedSolution);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <Box pt="20px" maxW="1800px">
      <PageTitle title={`View/${testId}`} subtitle="Test Details" />
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="30px">
        <Box>
          <Text as="b" fontSize="xl">
            Applicant
          </Text>
          <Text fontSize="sm">{test.applicant}</Text>
        </Box>
        <Box>
          <Text as="b" fontSize="xl">
            Completed
          </Text>
          <Text fontSize="sm">{test.completed ? "Yes" : "No"}</Text>
        </Box>
        <Box>
          <Text as="b" fontSize="xl">
            Results
          </Text>
          <Text fontSize="sm">
            {test.testCases?.length} /
            {test.testCases?.filter((test) => test.passed === true).length}
          </Text>
        </Box>
      </Grid>

      <Box pt="30px" maxW="800px">
        <Text as="b" fontSize="xl">
          Submitted Code
        </Text>
        <CodeMirror
          theme={dracula}
          value={editorValue}
          height="400px"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
};

export default ViewTest;
