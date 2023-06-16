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
import usePlatform from "../hooks/usePlatform";
interface Props {
  onSelectPlatform: (platform: Platform | null) => void;
  selectedPlatformId: number | null;
}
const PlatformSelector = ({ onSelectPlatform, selectedPlatformId }: Props) => {
  const { data:platforms } = usePlatforms();
  const platform = usePlatform(selectedPlatformId)
  return (
    <Box marginRight={5}>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
          {selectedPlatformId ? (
            <Text>Platform: {platform?.name}</Text>
          ) : (
            <Text>Platform: All</Text>
          )}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onSelectPlatform(null)}>All</MenuItem>
          {platforms?.results.map((platform) => (
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
