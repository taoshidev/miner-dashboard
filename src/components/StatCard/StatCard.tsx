import {Card, Group, Text, Tooltip, ThemeIcon, Box} from "@mantine/core";
import {IconHelp} from "@tabler/icons-react";

type StatCardProps = {
  title: string;
  item: Score | number; // Accept both Score and number
  isPercentage?: boolean;
  sigFigs?: number;
  tooltipText: string;
};

export const StatCard = ({ title, item, isPercentage = false, sigFigs = 4, tooltipText }: StatCardProps) => {
  const value = typeof item === "number" ? item : item.value; // Get the number value
  const rank = typeof item === "number" ? null : item.rank;
  const percentile = typeof item === "number" ? null : item.percentile;

  return (
    <Box>
    <Card withBorder>
      <Group style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 'xs' }}>
        <Group style={{ alignItems: 'center' }}>
          <Text size="sm" fw="bold">{title}</Text>
          <Tooltip
            label={tooltipText}
            withArrow
            multiline
            styles={{
              tooltip: {
                maxWidth: '20vw',
                padding: '8px',
                whiteSpace: 'normal', // Ensures text wraps
              },
            }}
          >
            <ThemeIcon variant="transparent" color="gray">
              <IconHelp size={16} stroke={1.4} />
            </ThemeIcon>
          </Tooltip>
        </Group>
        <Text size="sm" style={{ flexGrow: 1, textAlign: 'right' }} fw="bold">
          {value !== undefined && value !== null && !isNaN(value)
            ? isPercentage
              ? `${(value * 100).toFixed(sigFigs)}%`
              : value.toFixed(sigFigs)
            : "N/A"}
        </Text>
      </Group>
      {rank !== null && (
        <Group style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 'xs' }}>
          <Text size="xs" c="gray">Rank</Text>
          <Text size="xs" style={{ textAlign: 'right' }}>{rank}</Text>
        </Group>
      )}
      {percentile !== null && (
        <Group style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text size="xs" c="gray">Percentile</Text>
          <Text size="xs" style={{ textAlign: 'right' }}>
            {(percentile * 100).toFixed(0)}%
          </Text>
        </Group>
      )}
    </Card>
    </Box>
  );
};