import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const GameCardContainer = ({ children }: Props) => {
  return (
    <Box  overflow="hidden" borderRadius={5}>
      {children}
    </Box>
  );
};

export default GameCardContainer;
