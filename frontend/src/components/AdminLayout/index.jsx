import { Button, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const AdminLayout = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Grid position="relative" templateColumns="2fr 5fr" gap={6}>
      <Sidebar />
      <Outlet />
      <Box position="absolute" top="0" right="100px" pt="10px">
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          // backgroundColor="transparent"
          color="#000"
          _hover={{ bg: "#010203", color: "#fff" }}
          onClick={logout}
        >
          Sign out
        </Button>
      </Box>
    </Grid>
  );
};

export default AdminLayout;
