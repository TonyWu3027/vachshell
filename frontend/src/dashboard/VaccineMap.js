import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Title from './Title';
import ReactMapboxGl, {Marker} from "react-mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import refrige from "./refrige.png"
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

const Map = ReactMapboxGl({accessToken: "pk.eyJ1IjoidG9ueXd1MzAyNyIsImEiOiJja2tzMTg3eWUza20wMnBxdGd3YWh6ZmV3In0.zCETiM2ZypI3bimnDdbDFg"})

export default function VaccineMap() {
    const theme = useTheme();

    return (
		<React.Fragment>
			<Title>All Containers</Title>
				<Map 
					style="mapbox://styles/mapbox/streets-v8" 
					containerStyle={{
						height: '100vh',
						width: '100vh'
					}}
					center={[113.24, 23.15]}
					zoom={[7]}
				>
					<Marker
						coordinates={[113.91093685750693, 22.51905711299981]}
					>
						<img src={refrige} width={"30px"} />
					</Marker>
				</Map>
		</React.Fragment>
    );
}