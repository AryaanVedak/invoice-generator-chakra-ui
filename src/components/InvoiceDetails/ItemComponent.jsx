import {Card, CardBody, CardHeader, Heading, Text} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const ItemComponent = ({title, description, amount}) => {
  return (
      <Card >
        <CardHeader style={{paddingBottom: '0'}}>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <CardBody style={{marginTop: '0'}}>
          <Heading size='sm'>{description}</Heading>
          <Text>{amount}</Text>
        </CardBody>
      </Card>
  )
}

export default ItemComponent