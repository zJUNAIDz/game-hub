// SORT button dynamics not impleented yet

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import useGameQueryStore from "../store";

const SortSelector = () => {
  const selectedSortOrder = useGameQueryStore(
    (select) => select.gameQuery.sortOrder
  );
  const setSelectedSortOrder = useGameQueryStore(
    (select) => select.setSortOrder
  );

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "-relevance", label: "Relevance" },
    { value: "-created", label: "Date Added" },
    { value: "-released", label: "Release Date" },
    { value: "-rating", label: "Average Rating" },
    { value: "--added", label: "Popularity" },
  ];
  const currentSortOrder = sortOptions.find(
    (order) => order.value === selectedSortOrder
  );
  console.log(selectedSortOrder);

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
          Ordered by: {currentSortOrder?.label || "Relevance"}
        </MenuButton>
        <MenuList>
          {sortOptions.map((option) => (
            <MenuItem
              onClick={() => setSelectedSortOrder(option.value)}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SortSelector;
