import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/igdb-logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
interface Props {
  onSearchQuery: (searchedQuery: string) => void;
}
const Navbar = ({ onSearchQuery }: Props) => {
  const [searchQuery, SetSearchQuery] = useState("");
  useEffect(() => {
    onSearchQuery(searchQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  return (
    <HStack padding={2}>
      <Image borderRadius={5} boxSize="50px" src={logo} />
      <SearchInput
        searchedQuery={searchQuery}
        onSearch={(searchQuery) => {
          SetSearchQuery(searchQuery);
        }}
      />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
