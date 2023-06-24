import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useGameQueryStore from "../store";

const SearchInput = () => {
 const setSearch = useGameQueryStore(select => select.setSearch);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      style={{ width: "100%" }}
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) setSearch(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement>
          <BsSearch />
        </InputLeftElement>
        <Input
          borderRadius={20}
          ref={ref}
          placeholder="Search Games..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
