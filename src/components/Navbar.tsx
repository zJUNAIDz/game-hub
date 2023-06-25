import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/igdb-logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const Navbar = () => {
  return (
    <HStack padding={2}>
      <a target="_blank" href="https://igdb.vercel.app/">
        <Image borderRadius={5} boxSize="50px" src={logo} />
      </a>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
