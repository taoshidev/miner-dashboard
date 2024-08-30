import { Card, Box, Text, Title, Group, SimpleGrid } from "@mantine/core";
import {
  toHours,
  toPercent,
  toRemainingPercent,
  toNormalizePercent,
  toShortFloat,
} from "../../utils";

interface StatisticsProps {
  data: any;
}

export function Statistics({ data }: StatisticsProps) {
  const { statistics, positions } = data;
  const { weight, penalties, engagement, drawdowns } = statistics.data[0];
  
  return (
    <Box mb="xl">
      <Title order={3}>Statistics</Title>
      
      <SimpleGrid mb="lg" cols={4}>
        <Card withBorder>
          <Text size="sm" fw="bold" mb="md">
            Weight
          </Text>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" c="gray">
              Rank
            </Text>
            <Text size="xs">{weight.rank}</Text>
          </Group>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" c="gray">
              Percentile
            </Text>
            <Text size="xs">{toPercent(weight.percentile, 0)}</Text>
          </Group>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" c="gray">
              Value
            </Text>
            <Text size="xs">{toShortFloat(weight.value, 3)}</Text>
          </Group>
        
        </Card>
        
        <Card withBorder>
          <Text size="sm" fw="bold" mb="md">
            Drawdown
          </Text>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" c="gray">
              Approximate Drawdown
            </Text>
            <Text size="xs">{toRemainingPercent(drawdowns.approximate, 2)}</Text>
          </Group>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" c="gray">
              Recent Drawdown
            </Text>
            <Text size="xs">{toRemainingPercent(drawdowns.recent, 2)}</Text>
          </Group>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" c="gray" fw="bold">
              Effective Drawdown
            </Text>
            <Text size="xs">{toRemainingPercent(drawdowns.effective, 2)}</Text>
          </Group>
        </Card>
        
        <Card withBorder>
          <Text size="sm" fw="bold" mb="md">
            Engagement
          </Text>
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" c="gray">
              Number of Closed Positions
            </Text>
            <Text size="sm">{engagement.n_positions}</Text>
          </Group>
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" c="gray">
              Total Recorded Closed Position Duration
            </Text>
            <Text size="xs">{toHours(engagement.position_duration)} hr</Text>
          </Group>
        </Card>
        
        <Card bg="orange" c="white">
          <Text size="sm" fw="bold" mb="md">
            Positions
          </Text>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" opacity={0.8}>
              30-Day Returns
            </Text>
            <Text size="xs">
              {toNormalizePercent(positions.thirty_day_returns)}
            </Text>
          </Group>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" opacity={0.8}>
              All Time Returns
            </Text>
            <Text size="xs">
              {toNormalizePercent(positions.all_time_returns)}
            </Text>
          </Group>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" opacity={0.8}>
              Total Number of Positions
            </Text>
            <Text size="xs">{positions.n_positions}</Text>
          </Group>
          
          <Group justify="space-between" align="center" mb="xs">
            <Text size="xs" opacity={0.8}>
              Percentage Profitable
            </Text>
            <Text size="xs">{toPercent(positions.percentage_profitable, 0)}</Text>
          </Group>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
