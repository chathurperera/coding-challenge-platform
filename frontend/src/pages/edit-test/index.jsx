import React, { useEffect, useState } from "react";
import styles from "./EditTest.module.scss";
import PageTitle from "@/components/PageTitle";
import axios from "@/api/axios";
import {
  FormControl,
  FormLabel,
  Button,
  Box,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import InputOutputPair from "@/components/InputOutputPair";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditTest = () => {
  const [newPairValues, setNewPairValues] = useState({
    output: "",
    input: "",
  });
  const [question, setQuestion] = useState("");
  const [pairs, setPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] = useState({});

  const { testId } = useParams();
  console.log("testId", testId);

  useEffect(() => {
    axios
      .get(`test/${testId}`)
      .then((res) => {
        setPairs(res.data.testCases);
        setQuestion(res.data.question);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleAddNewPair = () => {
    if (newPairValues.input && newPairValues.output) {
      setPairs((prevState) => {
        return [...prevState, newPairValues];
      });
    }
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

  //remove pairs
  const removePair = (pairIndex) => {
    const filteredItems = pairs.filter((_, i) => i !== pairIndex);
    setPairs(filteredItems);
  };

  const saveTest = async () => {
    if (!question || newPairValues.length === 0) {
      toast.error("Please fill all required fields");
    }

    console.log('save test');
    setIsLoading(true);
    axios
      .patch(`test/${testId}`, {
        question: question,
        testCases: pairs,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        toast.success("Test updated successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <Box p="20px" mx="auto" maxW="1800px">
        <PageTitle title="Edit test" subtitle="Edit the test" />
        <Box maxW="60vw">
          <FormControl mt="40px">
            <FormLabel>Question</FormLabel>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
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
            {pairs?.map((pair, index) => {
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
                onClick={saveTest}
              >
                Save changes
              </Button>
            </Flex>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default EditTest;
