import { isEmpty } from "lodash";
import { useState, useEffect } from "react";
import { AppShell, Center, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { MinerData } from "../../types";
import { getMinerData } from "../../lib";

import { AppHeader } from "../AppHeader";
import { Main } from "../Main";

import "./App.css";

export const App = () => {
  const [opened, { toggle }] = useDisclosure();

  const [data, setData] = useState<MinerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(import.meta.env.VITE_MINER_URL);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const minerData = await getMinerData();

        setData(minerData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred"); // Optional: Handle non-Error objects
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Center>
        <Loader color="orange" type="dots" />
      </Center>
    );
  }

  if (isEmpty(data?.positions) || isEmpty(data?.statistics)) {
    return <Center>No data available.</Center>;
  }

  if (error) {
    return <Center>Error: {error}</Center>;
  }

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={opened} toggle={toggle} data={data?.statistics} />
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>
        <Main data={data as MinerData} />
      </AppShell.Main>
    </AppShell>
  );
};
