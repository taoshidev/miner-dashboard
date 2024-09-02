import { Container } from "@mantine/core";

import { MinerData } from "../../types";

import { Checkpoints } from "../Checkpoints";
import { Statistics } from "../Statistics";
import { Positions } from "../Positions";

interface MainProps {
  data: MinerData;
}

export const Main = ({ data }: MainProps) => {
  const { statistics, positions } = data;
  
  return (
    <Container fluid pt="72">
      <Checkpoints statistics={statistics} />
      <Statistics statistics={statistics} positions={positions} />
      <Positions positions={positions} />
    </Container>
  );
};