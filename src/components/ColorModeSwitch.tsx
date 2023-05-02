import { HStack, useColorMode } from "@chakra-ui/react";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack onClick={toggleColorMode} paddingX={5}>
      {colorMode === "dark" ? (
        <BsFillMoonFill style={{ fontSize: "2rem" }} />
      ) : (
        <BsSunFill style={{ fontSize: "2rem" }} />
      )}
    </HStack>
  );
};

export default ColorModeSwitch;
