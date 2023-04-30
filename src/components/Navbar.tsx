import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
const Navbar = () => {
  return (
    <HStack>
      <Image boxSize="50px" borderRadius="5px" src={logo} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
