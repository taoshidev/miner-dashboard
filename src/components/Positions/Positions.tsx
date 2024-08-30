import { useState, Fragment } from "react";
import { Text, Box, Button, Divider, Table, Title } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import { formatDate, toNormalizePercent } from "../../utils";

import { Orders } from "../Orders";


const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("trade_pair", {
    header: "Trade Pair",
    cell: (info) => {
      return (
        <Text size="sm">
          {info.getValue()[1]}
        </Text>
      );
    },
  }),
  columnHelper.accessor("position_type", {
    header: "Position Type",
    cell: (info) => (
      <Text size="sm">
        {info.getValue()}
      </Text>
    
    ),
  }),
  columnHelper.accessor("open_ms", {
    header: "Open",
    cell: (info) => (
      <Text size="sm">
        {formatDate(info.getValue())}
      </Text>
    
    ),
  }),
  columnHelper.accessor("close_ms", {
    header: "Close",
    cell: (info) => (
      <Text size="sm">
        {formatDate(info.getValue())}
      </Text>
    
    ),
  }),
  columnHelper.accessor("return_at_close", {
    header: "Return",
    cell: (info) => (
      <Text size="sm">
        {toNormalizePercent(info.getValue())}
      </Text>
    ),
  }),
  columnHelper.display({
    id: "expander",
    cell: ({ row }) => (
      <Box ta="right">
        <Button variant="light" size="sm" onClick={() => row.toggleExpanded()}>
          View Orders
        </Button>
      </Box>
    ),
  }),
];

export const Positions = ({ positions }: PositionsProps) => {
  const [sorting] = useState<SortingState>([{ id: "open_ms", desc: false }]);
  
  const table = useReactTable({
    data: positions,
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
      },
      sorting,
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  
  return (
    <Box>
      <Title order={3} mb="sm">Positions</Title>
      <Divider my="md" />
      <Table horizontalSpacing="0">
        <Table.Tbody>
          <Table.Tr>
            <Table.Td colSpan={4}>
              <Table>
                <Table.Thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Table.Tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <Table.Th key={header.id}>
                          <Text size="sm" fw={700}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          </Text>
                        </Table.Th>
                      ))}
                    </Table.Tr>
                  ))}
                </Table.Thead>
                <Table.Tbody>
                  {table.getRowModel().rows.map((row) => (
                    <Fragment key={row.id}>
                      <Table.Tr>
                        {row.getVisibleCells().map((cell) => (
                          <Table.Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Table.Td>
                        ))}
                      </Table.Tr>
                      {row.getIsExpanded() && <Orders orders={row.original.orders} />}
                    </Fragment>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Box>
  );
};
