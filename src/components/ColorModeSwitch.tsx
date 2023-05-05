import { Badge, useColorMode } from "@chakra-ui/react";
import { BsFillMoonFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Badge onClick={toggleColorMode} padding={2} borderRadius={5}>
      {colorMode === "dark" ? (
        <FaSun style={{ fontSize: "1.5rem" }} />
      ) : (
        <BsFillMoonFill style={{ fontSize: "1.5rem" }} />
      )}
    </Badge>
  );
};

export default ColorModeSwitch;
