import './App.css'
import Navbar from "./components/Navigation/Navbar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx"
import {Container, Flex, useColorMode} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import InvoiceForm from "./components/InvoiceDetails/InvoiceForm.jsx";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode === "dark") {
      toggleColorMode();
    }
  });
  return (
    <>
      <Navbar/>
        <Container maxW="7xl">
          <Flex
            justify={'center'}
            marginBottom={5}
            >
            <Routes>
              <Route path="/" element={
                <HomePage/>
              }/>
            </Routes>
            <Routes>
              <Route path="/invoice" element={
                <InvoiceForm/>
              }/>
            </Routes>
          </Flex>
          {/*<SignIn/>*/}
          {/*<Login/>*/}
        </Container>
    </>
  )
}

export default App
