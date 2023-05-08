import { Button, HStack } from "@chakra-ui/react";
import { FaBackward, FaForward } from "react-icons/fa";
interface Props {
  next?: string;
  previous?: string;
  onClick: (request: string) => void;
}
const PageNavigationButton = ({ next, previous, onClick }: Props) => {
  return (
    <HStack justifyContent="space-between" margin={2}>
      {previous && (
        <Button onClick={() => onClick(previous)}>
          <FaBackward />
        </Button>
      )}
      {next && (
        <Button onClick={() => onClick(next)}>
          <FaForward />
        </Button>
      )}
    </HStack>
  );
};

export default PageNavigationButton;
