import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../services/api'
import CompanyForm from '../../components/CompanyForm';

const CompanyDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCompany = async () => {
        const response = await api.get(`/api/companies/${id}`);
        setCompany(response.data);
      };
      fetchCompany();
    }
  }, [id]);

  const handleUpdate = async (updatedData) => {
    await api.put(`/api/companies/${id}`, updatedData);
    router.push('/companies');
  };

  const handleDelete = async () => {
    await api.delete(`/api/companies/${id}`);
    router.push('/companies');
  };

  return (
    <div>
      <h1>Company Details</h1>
      {company && <CompanyForm company={company} onSubmit={handleUpdate} />}
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default CompanyDetails;
