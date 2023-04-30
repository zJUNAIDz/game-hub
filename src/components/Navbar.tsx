import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/igdb-logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
const Navbar = () => {
  return (
    <HStack justifyContent="space-between">
      <Image boxSize="50px" src={logo} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
