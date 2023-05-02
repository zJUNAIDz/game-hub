import { HStack, useColorMode } from "@chakra-ui/react";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  console.log(colorMode);
  // const handleSwitch = () => {
  // const iconVarient = colorMode === "dark" ? <BsFillMoonFill style={style} /> : <BsSunFill style={style}/>;

  //   toggleColorMode();
  //   setIcon(iconVarient);
  // };
  return (
    <HStack onClick={toggleColorMode} paddingX={5}>
      {colorMode === "dark" ? (
        <BsFillMoonFill style={{ fontSize: "2rem" }} />
      ) : (
        <BsSunFill style={{ fontSize: "2rem" }} />
      )}

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
