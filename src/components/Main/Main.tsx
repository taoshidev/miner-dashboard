import { Container } from "@mantine/core";

import { Checkpoints } from "../Checkpoints";
import { Statistics } from "../Statistics";
import { OverviewGraph } from "../OverviewGraph";
import { Margins } from "../Margins";

import { Positions } from "../Positions";

export const Main = ({ data }) => {
  
  return (
    <Container fluid pt="72">
      
      <Checkpoints data={data?.statistics} />
      
      <Statistics data={data} />
      
      {/*<OverviewGraph miner={data?.statistics}/>*/}
      
      {/*<Margins miner={data?.statistics}/>*/}
      
      <Positions positions={data.positions} />
    
    </Container>
  );
};