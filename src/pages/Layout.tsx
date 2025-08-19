import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  return (
    <>
      <Box position="sticky" top="0" zIndex="1000">
      <Navbar />
      </Box>
      <Box padding={5}>
      <Outlet />
      </Box>
    </>
  );
};

export default Layout;
