import { HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsGlobe } from "react-icons/bs";
import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import Platform  from "../entities/Platform";
export interface Props {
  platforms: Platform[];
}
const PlatformIconsList = ({ platforms }: Props) => {
  const IconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    mac: FaApple,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    ios: MdPhoneIphone,
    android: FaAndroid,
    linux: FaLinux,
    web: BsGlobe,
  };
  return (
    <HStack>
      {platforms.map((platform) => (
        <Icon
          key={platform.id}
          fontSize="14px"
          color="gray.400"
          as={IconMap[platform.slug]}
        />
      ))}
    </HStack>
  );
};

export default PlatformIconsList;
