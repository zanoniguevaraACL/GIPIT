import { useRouter } from 'next/router';
import api from '../../services/api'
import CompanyForm from '../../components/CompanyForm';

const NewCompany = () => {
  const router = useRouter();

  const handleCreate = async (newData) => {
    await api.post('/api/companies', newData);
    router.push('/companies');
  };

  return (
    <div>
      <h1>Add New Company</h1>
      <CompanyForm onSubmit={handleCreate} />
    </div>
  );
};

export default NewCompany;
