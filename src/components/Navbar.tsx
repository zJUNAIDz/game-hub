import { HStack, Image, Text } from "@chakra-ui/react"
import logo from '../assets/logo.png'
const Navbar = () => {
  return (
    <HStack>
      <Image boxSize='50px' borderRadius='5px' src={logo}/>
      <Text >Hello</Text>
    </HStack>
  )
}

export default Navbar