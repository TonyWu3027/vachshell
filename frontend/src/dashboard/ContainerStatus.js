import React , {useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'

import Web3 from 'web3'
import abi from './assets/abi.json'
import addresses from './assets/address.json'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    3
  ],
})

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const web3 = new Web3(Web3.givenProvider)
const contractAddr = addresses.ropsten
const contract = new web3.eth.Contract(abi, contractAddr)
const deviceAddr = "0x580468f8989324aD3361bd6da4F13DC324d24c7b"

// Generate Order Data
function createData(id) {
  return { id, manufacturer: "Beijing BioTech" };
}


const rows = [
  createData("0x4f5a8e1f"),
  createData("0x8eb3Afc9"),
  createData("0x1a4d67eB"),
  createData("0x9943ffe2"),
  createData("0x2cf6d2e8")
];


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});


export default function ContainerStatus() {
  const classes = useStyles();

  const [temp, setTemp] = useState(15);
  const [efficacy, setEfficacy] = useState(true);

  return (
    <React.Fragment>
      <Title>Container Status</Title>
      <Typography component="p" variant="h4" color={temp>8 ? "error" : "primary"}>
        {temp}°C
      </Typography>
      {temp>8 ?
        <Typography variant="subtitle2" color="error" >
          Exposed since 21:03 05 Feb 2021
        </Typography> : <div />
      }
      <Typography variant="subtitle2" color="textSecondary" >
        Container 0x580468f...c7b
      </Typography>
      <Typography variant="subtitle2" color="primary" >
        Vaccination Centre | 
        Shenzhen, Guangdong Province, China
      </Typography>
      <Table size="small"  >
        <TableHead>
          <TableRow>
            <TableCell>Vaccine ID</TableCell>
            <TableCell>Manufacturer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.manufacturer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        efficacy ? <div />
        :
        <Card className={classes.root} variant="outlined" style={{marginTop: 20+'px'}} >
        <CardContent>
          <Typography variant="h5" component="h2" color = "error">
            Ineffective
          </Typography>
          <Typography className={classes.pos} color="error">
            All vaccines in the containers are ineffective.
          </Typography>
        </CardContent>
      </Card>
      }
      
    </React.Fragment>
  );
}