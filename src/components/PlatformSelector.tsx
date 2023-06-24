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
import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../store";

const PlatformSelector = () => {
  const selectedPlatformId = useGameQueryStore(
    (select) => select.gameQuery.platformId
  );
  const setSelectedPlatformId = useGameQueryStore(
    (select) => select.setPlatformId
  );

  const { data: platforms } = usePlatforms();
  const platform = usePlatform(selectedPlatformId);
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
          <MenuItem onClick={() => setSelectedPlatformId(null)}>All</MenuItem>
          {platforms?.results.map((platform) => (
            <MenuItem
              onClick={() => setSelectedPlatformId(platform.id)}
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
