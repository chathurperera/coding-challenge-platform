import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import axios, { axiosPrivate } from "@/api/axios";
import {
  FormControl,
  FormLabel,
  Button,
  Box,
  Flex,
  Textarea,
  Input,
} from "@chakra-ui/react";
import InputOutputPair from "@/components/InputOutputPair";
import { toast } from "react-toastify";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const CreateTest = () => {
  const [newPairValues, setNewPairValues] = useState({
    output: "",
    input: "",
  });
  const [testDetails, setTestDetails] = useState({
    applicant: "",
    testCases: [],
    initialIDECode: "",
    question: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddNewPair = () => {
    if (newPairValues.input && newPairValues.output) {
      setTestDetails((prevState) => {
        return {
          ...prevState,
          testCases: [...prevState.testCases, newPairValues],
        };
      });
    }
    setNewPairValues({
      output: "",
      input: "",
    });
  };

  //handle new pair inputs
  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewPairValues((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  //remove input output pairs
  const removePair = (pairIndex) => {
    const filteredItems = testDetails?.testCases.filter(
      (_, index) => index !== pairIndex
    );
    setTestDetails((prevState) => {
      return {
        ...prevState,
        testCases: filteredItems,
      };
    });
  };

  //Handle editor changes
  const onEditorChange = React.useCallback((value, viewUpdate) => {
    setTestDetails((prevState) => {
      return {
        ...prevState,
        initialIDECode: value,
      };
    });
  }, []);

  //handle create test
  const submitTest = async () => {
    if (!testDetails.question || testDetails.testCases === 0) {
      toast.error("Please fill all required fields");
    }

    setIsLoading(true);
    axiosPrivate
      .post("test/create", testDetails)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setTestDetails({
          applicant: "",
          testCases: [],
          initialIDECode: "",
          question: "",
        });

        toast.success("Test created successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
      });
  };

  return (
    <>
      <Box py="20px" maxW="1800px">
        <PageTitle title="Create test" subtitle="Create your test" />
        <Box maxW="60vw">
          <FormControl mt="20px" maxW="400px">
            <FormLabel>Applicant Name</FormLabel>
            <Input
              value={testDetails.applicant}
              onChange={(e) =>
                setTestDetails((prevState) => {
                  return {
                    ...prevState,
                    applicant: e.target.value,
                  };
                })
              }
            />
          </FormControl>

          <FormControl mt="20px">
            <FormLabel>Question</FormLabel>
            <Textarea
              value={testDetails.question}
              onChange={(e) =>
                setTestDetails((prevState) => {
                  return {
                    ...prevState,
                    question: e.target.value,
                  };
                })
              }
            />
          </FormControl>

          <FormControl mt="30px">
            <Flex justifyContent="space-between">
              <FormLabel>Add expected inputs and outputs pairs</FormLabel>
              <Button
                size="sm"
                variant="outline"
                backgroundColor="#4F46E5"
                color="#fff"
                _hover={{ bg: "#6366f1" }}
                onClick={handleAddNewPair}
              >
                Add new pair
              </Button>
            </Flex>
            {testDetails.testCases.map((pair, index) => {
              return (
                <InputOutputPair
                  pair={pair}
                  key={index}
                  index={index}
                  removePair={removePair}
                />
              );
            })}
            <InputOutputPair
              readonly={false}
              pair={newPairValues}
              handleChange={handleChange}
            />
          </FormControl>
          <FormControl mt="20px">
            <FormLabel>Test editor setup</FormLabel>
            <CodeMirror
              theme={dracula}
              value={testDetails.initialIDECode}
              height="400px"
              extensions={[javascript({ jsx: true })]}
              onChange={onEditorChange}
            />
          </FormControl>
          <Flex justifyContent="flex-end" mt="50px">
            <Button
              size="sm"
              variant="outline"
              ml="10px"
              disabled
              _disabled={{
                opacity: ".1",
                bg: "#000",
              }}
              isLoading={isLoading}
              onClick={submitTest}
            >
              Create Test
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default CreateTest;
