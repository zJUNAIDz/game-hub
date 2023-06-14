import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
// import { Platform } from "../hooks/useGames"
import usePlatforms, { Platform } from "../hooks/usePlatforms";
interface Props {
  onSelectPlatform: (platform: Platform | null) => void;
  selectedPlatform: Platform | null;
}
const PlatformSelector = ({ onSelectPlatform, selectedPlatform }: Props) => {
  const { data } = usePlatforms();
  return (
    <Box marginRight={5}>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
          {selectedPlatform ? (
            <Text>Platform: {selectedPlatform.name}</Text>
          ) : (
            <Text>Platform: All</Text>
          )}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onSelectPlatform(null)}>All</MenuItem>
          {data?.results.map((platform) => (
            <MenuItem
              onClick={() => onSelectPlatform(platform)}
              key={platform.id}
            >
              {platform.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default PlatformSelector;
