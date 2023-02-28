import React, { useEffect } from "react";
import styles from "./all-tests.module.scss";
import PageTitle from "@/components/PageTitle";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineDelete, AiOutlineCopy } from "react-icons/ai";
import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "@/api/axios";
import { toast } from "react-toastify";

const AllTests = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllTests = async () => {
      await axiosPrivate
        .get("test")
        .then((res) => {
          console.log("res", res);
          setTests(res.data.tests);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getAllTests();
  }, []);

  const deleteTest = async (testId) => {
    await axiosPrivate
      .delete(`test/${testId}`)
      .then((res) => {
        const filteredTests = tests.filter((test) => {
          return test._id !== testId ? test : "";
        });
        setTests(filteredTests);
        toast.success("Test deleted successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  const viewTest = (testId) => {
    console.log("clicked", testId);
    navigate(`/view-test/${testId}`);
  };

  const copyLink = async (testData) => {
    const link = `http://localhost:5173/challenge/${testData.applicant}/${testData._id}`;
    await navigator.clipboard.writeText(link);
  };

  return (
    <>
      <Box pt="20px" maxW="1800px">
        <PageTitle title="All tests" subtitle="Find all your test here" />
        <TableContainer mt="20px" maxW="800px">
          <Table variant="simple" colorScheme="teal" size="sm">
            <Thead>
              <Tr>
                <Th>Applicant</Th>
                <Th>Created At</Th>
                <Th>Completed</Th>
                <Th>Results</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tests.map((test) => {
                return (
                  <Tr key={test._id}>
                    <Td>{test.applicant}</Td>
                    <Td>{moment(test.createdAt).format("MMMM Do YYYY")}</Td>
                    <Td>{test.completed ? "Yes" : "No"}</Td>
                    {test.completed ? (
                      <Td>
                        {test.testCases.length} /{" "}
                        {
                          test.testCases.filter((test) => test.passed === true)
                            .length
                        }
                      </Td>
                    ) : (
                      <Td>-</Td>
                    )}
                    <Td>
                      <div>
                        <IconButton
                          icon={<AiOutlineEye />}
                          onClick={() => viewTest(test._id)}
                          mr="10px"
                        />
                        <IconButton
                          icon={<AiOutlineDelete />}
                          onClick={() => deleteTest(test._id)}
                          mr="10px"
                        />
                        <IconButton
                          icon={<AiOutlineCopy />}
                          onClick={() => copyLink(test)}
                        />
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AllTests;
