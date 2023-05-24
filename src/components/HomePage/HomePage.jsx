import {Box, Button, Heading, Stack, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function HomePage() {

  const history = useNavigate()

  return (
    <>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}>
        <Heading
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Generate Your Invoice With<br />
          <Text as='span' color={'green.400'}>Invoice Generator</Text>
        </Heading>
        <div color={'gray.500'} fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}>
          Generate Your invoice using Invoice Generator and save your self of the hassle of calculating the GST.
        </div>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}
          style={{
            marginTop: 20,
          }}
        >
          <Button
            colorScheme={'green'}
            bg={'green.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'green.500',
            }}
            onClick={() => history('/invoice')}
          >
            Generate Invoice
          </Button>
          <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
            Learn more
          </Button>
        </Stack>
      </Stack>
    </>
  );
}