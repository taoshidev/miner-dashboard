import {useState, Fragment} from "react";
import {Text, Box, Button, Tooltip, Table} from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import {formatDate, toNormalizePercent, isRecent} from "../../utils";

import {Orders} from "../Orders";

import styles from "./positions.module.css";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("trade_pair", {
    header: "Trade Pair",
    cell: (info) => {
      return (
        <Text size="xs" ta="right">
          {info.getValue()[1]}
        </Text>
      );
    },
  }),
  columnHelper.accessor("position_type", {
    header: "Position Type",
    cell: (info) => (
      <Fragment>
        {isRecent(info.row.original.orders) ? (
          <Tooltip label="Results within 24hrs are hidden">
            <Text size="xs" c="orange" ta="right">
              Hidden
            </Text>
          </Tooltip>
        ) : (
          <Text size="xs" ta="right">
            {info.getValue()}
          </Text>
        )}
      </Fragment>
    ),
  }),
  columnHelper.accessor("open_ms", {
    header: "Open",
    cell: (info) => (
      <Fragment>
        {isRecent(info.row.original.orders) ? (
          <Tooltip label="Results within 24hrs are hidden">
            <Text size="xs" c="orange" ta="right">
              Hidden
            </Text>
          </Tooltip>
        ) : (
          <Text size="xs" ta="right">
            {formatDate(info.getValue())}
          </Text>
        )}
      </Fragment>
    ),
  }),
  columnHelper.accessor("close_ms", {
    header: "Close",
    cell: (info) => (
      <Fragment>
        {isRecent(info.row.original.orders) ? (
          <Tooltip label="Results within 24hrs are hidden">
            <Text size="xs" c="orange" ta="right">
              Hidden
            </Text>
          </Tooltip>
        ) : (
          <Text size="xs" ta="right">
            {formatDate(info.getValue())}
          </Text>
        )}
      </Fragment>
    ),
  }),
  columnHelper.accessor("return_at_close", {
    header: "Return",
    cell: (info) => (
      <Text size="xs" ta="right">
        {toNormalizePercent(info.getValue())}
      </Text>
    ),
  }),
  columnHelper.display({
    id: "expander",
    cell: ({row}) => (
      <Box ta="right">
        <Button variant="light" size="xs" onClick={() => row.toggleExpanded()}>
          View Orders
        </Button>
      </Box>
    ),
  }),
];

export const Positions = ({positions}: PositionsProps) => {
  const [sorting] = useState<SortingState>([{id: "open_ms", desc: false}]);

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
    <Table.Tr className={styles.tr}>
      <Table.Td colSpan={4} className={styles.td}>
        <Table className={styles.table} verticalSpacing="md">
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id} className={styles.tr}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id}>
                    <Text size="xs" fw={700} ta="right">
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
                {row.getIsExpanded() && <Orders orders={row.original.orders}/>}
              </Fragment>
            ))}
          </Table.Tbody>
        </Table>
      </Table.Td>
    </Table.Tr>
  );
}
