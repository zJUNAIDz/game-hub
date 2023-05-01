import { HStack, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const iconVarient = colorMode === "dark" ? <BsFillMoonFill /> : <BsSunFill />;

  const [icon, setIcon] = useState(iconVarient);

  console.log(colorMode);
  const handleSwitch = () => {
    toggleColorMode();
    setIcon(iconVarient);
  };
  return (
    <HStack onClick={handleSwitch} paddingX={5}>
      {icon}

      {/* {colorMode === "dark" ? <BsFillMoonFill /> : <BsSunFill />} */}
      {/* <label htmlFor="switch">
        <input
          // style={{ appearance: "none" }}
          onChange={toggleColorMode}
          checked={colorMode === "dark"}
          type="checkbox"
          name="color-mode-switch"
          id="switch"
        />
      </label> */}
    </HStack>
  );
};

export default ColorModeSwitch;
