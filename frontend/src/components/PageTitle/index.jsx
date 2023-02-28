import { Text } from "@chakra-ui/react";
import React from "react";
import style from "./PageTitle.module.scss";

const PageTitle = ({ title, subtitle }) => {
  return (
    <div>
      <Text fontSize="3xl" color="#000">{title}</Text>
      <Text fontSize="1xl">{subtitle}</Text>
    </div>
  );
};

export default PageTitle;
