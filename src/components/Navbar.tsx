import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/igdb-logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <HStack padding={2}>
      <Link to="/">
        <Image objectFit="cover" borderRadius={5} boxSize="50px" src={logo} />
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
