import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

const SortSelector = () => {
  return (
    <Box >
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
          Ordered by: Relevance{" "}
        </MenuButton>
        <MenuList>
          <MenuItem>All</MenuItem>
          <MenuItem>Rating</MenuItem>
          <MenuItem>relevance</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SortSelector;
