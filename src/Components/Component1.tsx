import React, { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { TableDataInterface } from '../Interfaces/TableDataInterface';

const Component1: React.FC = () => {
  const [dataItems, setDataItems] = useState<TableDataInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataItems = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setDataItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dataItems:', error);
        setLoading(false);
      }
    };

    fetchDataItems();
  }, []);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 },
  ];

  return (
    <Container style={{ height: 600, width: '100%' }}>
      {loading ? (
        <Typography variant="h5" gutterBottom>
          Loading ...
        </Typography>
      ) : (
        <DataGrid rows={dataItems} columns={columns} />
      )}
    </Container>
  );
};

export default Component1;
