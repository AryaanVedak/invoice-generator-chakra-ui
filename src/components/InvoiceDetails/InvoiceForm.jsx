import {
  Button,
  FormControl,
  FormLabel,
  GridItem, Heading,
  Input,
  SimpleGrid,
  useBreakpointValue,
  VStack,
  Text,
  Textarea,
  Card, Divider, NumberInput, NumberInputField
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import ItemComponent from "./ItemComponent.jsx";
import jsPDF from "jspdf";
import numWords from "num-words";

const InvoiceForm = () => {

  const colSpan = useBreakpointValue({base: 2, md: 1})
  const [product, setProduct] = useState([])
  const [buyName, setBuyName] = useState("FREUDENBERG GALA HOUSEHOLD PRODDUCT PRIVATE LIMITED")
  const [buyAddress, setBuyAddress] = useState()
  const [itemTitle, setItemTitle] = useState()
  const [itemDescription, setItemDescription] = useState()
  const [rate, setRate] = useState()
  const [gst, setGst] = useState(12)
  const [total, setTotal] = useState(0)
  const [counter, setCounter] = useState(0)
  const [billNo, setBillNo] = useState()
  const [date, setDate] = useState()

  const addProduct = () => {
    setCounter(counter+1)
    setTotal(total => total + rate + ((rate*(gst/2))/100)*2)
    setProduct(product => [...product,
      {
        id:  counter,
        buyName: buyName,
        buyAddress: buyAddress,
        itemTitle: itemTitle,
        itemDescription: itemDescription,
        rate: rate,
        gst: gst,
      }]
    )
    console.log(rate + gst)
  }
``
  useEffect(() => {
    // product.map(item => setTotal(item.rate + ((item.rate*(item.gst/2))/100)*2))
    console.log(date)
  },[date])

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  const finalTotal = toTitleCase(numWords(total))

  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#bill"), {
      callback: function (pdf) {
        const pageCount = doc.internal.getNumberOfPages();
        console.log(pageCount)
        doc.deletePage(pageCount)
        pdf.save("bill.pdf")
      }
    })
  }


  return(
    <>
    <Card w="full" boxShadow='xl' borderRadius='xl' style={{
      marginTop: '20px'
    }}>
      <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
        <VStack spacing={3} alignItems="flex-start">
          <Heading size="2xl">Invoice details</Heading>
          <Text>Please fill the following details to generate your invoice</Text>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Buyer Name</FormLabel>
              <Input placeholder="Freudenerg Gala" value={buyName} onChange={(e) =>  setBuyName(e.target.value)}/>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <Textarea
                placeholder='902/903/904, B-Wing, O2 Galleria, Plot No. 23/24, Minevera Industrial Estate Off LBS Marg, Opp Asha Nagar'
                size='sm'
                resize='vertical'
                value={buyAddress}
                onChange={(e) => setBuyAddress(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Divider border={"1px"} borderColor={'grey'}/>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Bill Number</FormLabel>
              <Input placeholder="OC250" onChange={(e) =>  setBillNo(e.target.value)}/>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Bill Date</FormLabel>
              <Input
                placeholder="Select Bill Date"
                size="md"
                type={"date"}
                onChange={(e) => setDate(e.target.value)}
                format="DD/MM/YY"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Item Title</FormLabel>
              <Input placeholder="Item Title" onChange={(e) =>  setItemTitle(e.target.value)}/>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Item Description</FormLabel>
              <Input placeholder="Item Description" onChange={(e) => setItemDescription(e.target.value)}/>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Rate</FormLabel>
              <NumberInput>
                <NumberInputField onChange={(e) =>  setRate(parseInt(e.target.value))}/>
              </NumberInput>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>GST</FormLabel>
              <NumberInput defaultValue={12}>
                <NumberInputField  value={rate} onChange={(e) =>  setGst(parseInt(e.target.value))}/>
              </NumberInput>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <Button size="lg" w="full" onClick={addProduct}>
              Add Item
            </Button>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <Button size="lg" w="full" colorScheme='blue' onClick={generatePDF}>
              Generate Invoice
            </Button>
          </GridItem>
          <GridItem colSpan={2}>
            <Divider border={"1px"} borderColor={'grey'}/>
          </GridItem>
          <GridItem colSpan={2}>
            <Heading size="lg">Items</Heading>
          </GridItem>
          <GridItem colSpan={2}>
            {
              product.map(prod => // eslint-disable-next-line react/jsx-key
                <ItemComponent
                  title={prod.itemTitle}
                  description={prod.itemDescription}
                  amount={prod.rate}
                />
              )
            }
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Card>
    <Card w="full" boxShadow='xl' borderRadius='xl' style={{
      marginTop: '20px',
      // display: 'none'
    }}>
      <div className="wholePrintBody page-break" id="bill" style={{marginBottom: 0}}>
        <header style={{marginTop: 125}}>
          <div className="allBorder">
            <section className="leftSection ">
              <p style={{margin: 5, fontSize: 14, fontWeight: 'bold'}}>OMKAR CREATIONS</p>
              <p className="address" style={{margin: 5}}>
                A-401 Prakriti Aprt, M.S. Road, Mittal Park,<br/>
                Raghunath Nagar, Thane(W),<br/>
                Dist.Thane-400604,Maharashtra
              </p>
              <p style={{margin: 5}}>
                <b>Mob</b>
                <label className="ph_no">8779674027</label>
              </p>
            </section>
            <section className="rightSection ">
              <table style={{margin: 5}}>
                <tr>
                  <td>Invoice No.</td>
                  <td>
                    <label>{billNo}</label>
                  </td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>
                    <label>{date}</label>
                  </td>
                </tr>
                <tr>
                  <td>GST No.</td>
                  <td>
                    <label>27AFFPV7912N1ZP</label>
                  </td>
                </tr>
              </table>
            </section>
            <div className="clearfix"></div>
          </div>
        </header>
        <br/>
        <main>
          <section className="medicalDetails allBorder">
            <div>
              <div style={{margin: 5, fontSize: 14, fontWeight: 'bold'}}>BUYER</div>
              <div style={{fontWeight: 'bold', fontSize: 12, margin: 5}}>FREUDENBERG &nbsp;&nbsp;&nbsp;GALA &nbsp;LIMITED &nbsp;COMPANY</div>
              <div className="buyer-address" style={{margin: 5}}>
                902/903/904, B-Wing, O2 Galleria, Plot No. 23/24, Minevera Industrial Estate Off LBS Marg, Opp Asha Nagar<br/>
                Mulund(W), Mumbai - 400604, Maharashtra.<br/>
                GSTIN: 27AADCG4345E1ZT<br/>
                PAN: AADCG4345E
                {buyAddress}
              </div>
              <div className="clearfix"></div>
            </div>
          </section>
          <section className="itemDetailSection allBorder">
            <div>
              <table cellSpacing="0" className="billProductDetailsTable bottomBorder">
                <thead>
                <tr>
                  <th rowSpan="2">Sr. No.</th>
                  <th rowSpan="2" colSpan="3">Description</th>
                  <th rowSpan="2">HSN Code</th>
                  <th rowSpan="2">Rate</th>
                  <th rowSpan="2">Quantity</th>
                  <th rowSpan="2">Amount</th>
                  <th rowSpan="2" colSpan="2">Taxable Value</th>
                  <th colSpan="2">CGST</th>
                  <th colSpan="2">SGST/UGST</th>
                  <th rowSpan="2">Tax Amount</th>
                  <th rowSpan="2">Total Amount</th>
                </tr>
                <tr>
                  <th style={{borderLeft: "1px solid black"}}>Rate</th>
                  <th>Amount</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {
                  product.map(item =>
                    // eslint-disable-next-line react/jsx-key,no-unexpected-multiline
                    <tr>
                      <td>{item.id + 1}</td>
                      <td colSpan="3"><b>{item.itemTitle}</b><br/>{item.itemDescription}</td>
                      <td></td>
                      <td>{item.rate}</td>
                      <td>1</td>
                      <td>{item.rate}</td>
                      <td colSpan="2">{item.rate}</td>
                      <td>{item.gst / 2}%</td>
                      <td>{(item.rate * (item.gst / 2)) / 100}</td>
                      <td>{item.gst / 2}%</td>
                      <td>{(item.rate * (item.gst / 2)) / 100}</td>
                      <td>{((item.rate * (item.gst / 2)) / 100) * 2}</td>
                      <td>{item.rate + ((item.rate * (item.gst / 2)) / 100) * 2}</td>
                    </tr>
                  )
                }
                <tr>
                  <th colSpan="15" style={{border: "1px solid black", borderBottom: "0px"}}></th>
                  <th style={{border: "1px solid black", borderBottom: "0px", fontSize: "10px"}}>{total}</th>
                </tr>
                </tbody>

              </table>
              <p>Amount Chargable(in words): {finalTotal}</p>
            </div>
            <div className="terminology topBorder">
              <div>
                <table className="terminologyLeftTable">
                  <h3 className="bank-details">Bank Details</h3>
                  <tr>
                    <td>Bank:</td>
                    <td colSpan={2}>Punjab & Sind Bank</td>
                  </tr>
                  <tr>
                    <td>Account No:</td>
                    <td colSpan={2}>1256985621245</td>
                  </tr>
                  <tr>
                    <td>Branch</td>
                    <td colSpan={2}>Thane Branch</td>
                  </tr>
                  <tr>
                    <td>IFSC Code</td>
                    <td colSpan={2}>PSB00045</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td colSpan={2}>Tulsi Shyam Teen Hath Naka, Thane(W), 400604</td>
                  </tr>
                </table>
                <table className="terminologyRightTable">
                  <p className="sign">
                    Omkar Creations <br/>
                    Authorized Signatory
                  </p>
                </table>
              </div>
              <div className="clearfix"></div>
            </div>
          </section>
        </main>
        <p style={{marginTop: 0}}>Declaration: * No Complaint regarding this bill will be entertained if not noticed in writing within 7 days.</p>
      </div>
    </Card>
  </>
  )
}

export default InvoiceForm