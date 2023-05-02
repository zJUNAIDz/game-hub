import { HStack, useColorMode } from "@chakra-ui/react";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack onClick={toggleColorMode} paddingX={5}>
      {colorMode === "dark" ? (
        <BsFillMoonFill style={{ fontSize: "1.5rem" }} />
      ) : (
        <BsSunFill style={{ fontSize: "1.5rem" }} />
      )}
    </HStack>
  );
};

export default ColorModeSwitch;
