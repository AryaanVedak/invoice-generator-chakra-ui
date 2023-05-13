import {Box, Button, ButtonGroup, Container, Flex, Heading, Spacer, useColorModeValue} from "@chakra-ui/react";

const Navbar =() => {
  return (
    <>
      <div style={{backgroundColor: "white"}}>
        <Container maxW='7xl'>
          <Flex minWidth='max-content'
                alignItems='center'
                gap='2'
                minH={'60px'}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
          >
            <Box p='2'>
              <Heading size='md'>Invoice Generator</Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap='2'>
              <Button colorScheme='teal'>Sign Up</Button>
              <Button colorScheme='teal'>Log in</Button>
            </ButtonGroup>
          </Flex>
        </Container>
      </div>
    </>
  )
}

export default Navbar