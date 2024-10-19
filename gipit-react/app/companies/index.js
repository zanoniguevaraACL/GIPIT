import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import api from '../../services/api'

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await api.get('/api/companies');
      setCompanies(response.data);
    };
    fetchCompanies();
  }, []);

  return (
    <div>
      <h1>Companies</h1>
      <Button variant="contained" color="primary" component={Link} href="/companies/new">
        Add New Company
      </Button>
      <List>
        {companies.map((company) => (
          <ListItem key={company.id} component={Link} href={`/companies/${company.id}`}>
            <ListItemText primary={company.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Companies;
