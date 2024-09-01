import { Card, Group, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";
import chroma from "chroma-js";

type PenaltyCardProps = {
  title: string;
  item: number | undefined;
  isPercentage?: boolean;
  sigFigs?: number;
  tooltipText: string;
};

export const PenaltyCard = ({
  title,
  item,
  isPercentage = false,
  sigFigs = 4,
  tooltipText,
}: PenaltyCardProps) => {
  const value = item;
  const multiplier = 100000000;
  
  const getBackgroundColor = (value: number) => {
    return chroma("#E46026").darken(value * multiplier).hex(); // Orange background if value < 0.2, otherwise white
  };
  
  const getTextColor = (value: number) => {
    return value < 0.2 ? "#FFFFFF" : "#000000"; // White text if value < 0.2, otherwise black
  };
  
  return (
    <Card withBorder flex="1" h="100%" bg={getBackgroundColor(value!)}>
      <Group justify="space-between" align="center">
        <Group align="center" gap="xs">
          <Text size="sm" fw="bold" c={getTextColor(value!)}>{title}</Text>
          <Tooltip
            label={tooltipText}
            withArrow
            multiline
            styles={{
              tooltip: {
                maxWidth: "20vw",
                padding: "8px",
                whiteSpace: "normal", // Ensures text wraps
              },
            }}
          >
            <ThemeIcon variant="transparent" color="gray">
              <IconHelp size={16} stroke={1.4} />
            </ThemeIcon>
          </Tooltip>
        </Group>
        
        <Text size="sm" c={getTextColor(value!)}>
          {value !== undefined && value !== null && !isNaN(value)
            ? isPercentage
              ? `${(value * 100).toFixed(sigFigs)}%`
              : value.toFixed(sigFigs)
            : "N/A"}
        </Text>
      </Group>
    </Card>
  );
};