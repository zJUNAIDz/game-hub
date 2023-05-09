import { Badge, HStack, IconButton } from "@chakra-ui/react";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
interface Props {
  next?: string;
  previous?: string;
  currentPageNumber: number;
  onClick: (request: number) => void;
}
const PageNavigationButton = ({
  next,
  previous,
  onClick,
  currentPageNumber,
}: Props) => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentPageNumber]);
  if (!previous) currentPageNumber = 1;
  return (
    <HStack justifyContent="center" margin={2}>
      <IconButton
        onClick={() => onClick(currentPageNumber - 1)}
        aria-label="Previous Page"
        icon={<BsFillArrowLeftSquareFill />}
        isDisabled={!previous}
      />

      <Badge padding={2}>Page:{currentPageNumber}</Badge>
      <IconButton
        onClick={() => onClick(currentPageNumber + 1)}
        aria-label="Next Page"
        icon={<BsFillArrowRightSquareFill />}
        isDisabled={!next}
      />
    </HStack>
  );
};
export default PageNavigationButton;
