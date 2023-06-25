import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const GameCardContainer = ({ children }: Props) => {
  return (
    <Box
      transition="transform ease-in 0.2s"
      _hover={{ transform: "scale(1.03)" }}
      overflow="hidden"
      borderRadius={5}
    >
      {children}
    </Box>
  );
};

export default GameCardContainer;
