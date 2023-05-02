import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/igdb-logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
const Navbar = () => {
  return (
    <HStack padding={2} justifyContent="space-between">
      <Image borderRadius={5} boxSize="50px" src={logo} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
