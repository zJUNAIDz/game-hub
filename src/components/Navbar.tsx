import { HStack, Image, useColorMode } from "@chakra-ui/react";
import logo from "../assets/igdb-logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode } = useColorMode();

  return (
    <HStack padding={2} justifyContent="space-between" bg={colorMode === "dark" ? "gray.900" : "white"} boxShadow="md">
      <Link to="/">
        <Image objectFit="cover" borderRadius={5} boxSize="50px" src={logo} />
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
