import React from "react";
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const InputOutputPair = ({
  pair,
  readonly = true,
  handleChange,
  removePair,
  index,
}) => {
  return (
    <>
      <Flex mb="10px" alignItems="center">
        <Input
          readOnly={readonly}
          size="sm"
          maxW="300px"
          mr="10px"
          placeholder="Input"
          name="input"
          onChange={(e) => handleChange(e)}
          value={pair?.input}
          backgroundColor={readonly ? "#f9f9f9" : ""}
          color={readonly ? "#12121271" : ""}
        />
        <Input
          readOnly={readonly}
          size="sm"
          maxW="300px"
          name="output"
          onChange={(e) => handleChange(e)}
          value={pair?.output}
          placeholder="Output"
          backgroundColor={readonly ? "#f9f9f9" : ""}
          color={readonly ? "#12121271" : ""}
        />
        {readonly && (
          <IconButton
            aria-label="Add"
            size="sm"
            ml="10px"
            onClick={() => removePair(index)}
            icon={<DeleteIcon />}
          />
        )}
      </Flex>
    </>
  );
};

export default InputOutputPair;
