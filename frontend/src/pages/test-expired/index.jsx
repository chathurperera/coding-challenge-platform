import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const TestExpired = () => {
  return (
    <Flex
      width="100%"
      minH="100vh"
      border="1px solid "
      justifyContent="center"
      alignItems="center"
    >
      <Box maxW="400px">
        <Text fontSize="xl">Test Expired</Text>
      </Box>
    </Flex>
  );
};

export default TestExpired;
