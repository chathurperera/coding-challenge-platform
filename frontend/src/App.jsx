import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Challenge from "./pages/challenge";
import CreateTest from "./pages/create-test";
import Login from "./pages/login";
import { ChakraProvider } from "@chakra-ui/react";
import EditTest from "./pages/edit-test";
import AdminLayout from "./components/AdminLayout";
import AllTests from "./pages/all-tests";
import TestExpired from "./pages/test-expired";
import SubmissionCompleted from "./pages/submission-completed";
import ViewTest from "./pages/view-test";
import Register from "./pages/register";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<AllTests />} />
            <Route path="create-test" element={<CreateTest />} />
            <Route path="edit/:testId" element={<EditTest />} />
            <Route path="view-test/:testId" element={<ViewTest />} />
          </Route>
          <Route path="test-expired" element={<TestExpired />} />
          <Route path="test-completed" element={<SubmissionCompleted />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/challenge/:applicant/:testId" element={<Challenge />} />
        </Routes>
        <ToastContainer style={{ fontSize: "15px" }} />
      </ChakraProvider>
    </>
  );
};

export default App;
