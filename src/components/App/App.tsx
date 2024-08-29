import {useState, useEffect} from 'react';
import {AppShell} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

import { getMinerData } from "../../lib";

import {AppHeader} from '../AppHeader';
import {Main} from '../Main';

import './App.css';

const MINER_ADDRESS = import.meta.env.VITE_MINER_ADDRESS;

export const App = () => {
  const [opened, {toggle}] = useDisclosure();

  const [minerData, setMinerData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getMinerData(MINER_ADDRESS);

        setMinerData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        console.log('finished')
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <AppShell
      navbar={{width: 300, breakpoint: 'sm', collapsed: {desktop: true, mobile: !opened}}}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={opened} toggle={toggle} data={minerData?.statistics} />
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>
        <Main data={minerData} />
      </AppShell.Main>
    </AppShell>
  )
}