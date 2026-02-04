import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AddServiceTypeModal } from './components/AddServiceTypeModal';

type ServiceType = {
  id: number;
  name: string;
  workGroupId?: number;
  startBookingDate?: string;
  note?: string;
  workingDays?: any[];
};

type WorkGroup = {
  id: number;
  name: string;
};

type Office = {
  id: number;
  name: string;
  code: string;
};

const API_BASE = 'http://localhost:3000';
const DEFAULT_OFFICE_ID = 1;

function App() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [workGroups, setWorkGroups] = useState<WorkGroup[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedOfficeId, setSelectedOfficeId] = useState<number>(DEFAULT_OFFICE_ID);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceType | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [servicesRes, groupsRes, officesRes] = await Promise.all([
          axios.get<ServiceType[]>(
            `${API_BASE}/service-types/office/${selectedOfficeId}`,
          ),
          axios.get<WorkGroup[]>(`${API_BASE}/work-groups`, {
            params: { officeId: selectedOfficeId },
          }),
          axios.get<Office[]>(`${API_BASE}/offices`),
        ]);
        setServiceTypes(servicesRes.data);
        setWorkGroups(groupsRes.data);
        setOffices(officesRes.data);
      } catch (e) {
        setError('Failed to load service types or work groups');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedOfficeId]);

  const handleEdit = async (service: ServiceType) => {
    try {
      // Fetch full details including schedule
      const res = await axios.get(`${API_BASE}/service-types/${service.id}`);
      setEditingService(res.data);
      setIsModalOpen(true);
    } catch (e) {
      console.error("Failed to fetch service details", e);
      alert("Could not load service details");
    }
  };

  const handleCreate = (newItem: ServiceType) => {
    setServiceTypes(prev => [...prev, newItem]);
  };

  const handleUpdate = (updatedItem: ServiceType) => {
    setServiceTypes(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleDelete = async (service: ServiceType) => {
    try {
      await axios.delete(`${API_BASE}/service-types/${service.id}`);
      setServiceTypes(prev => prev.filter(item => item.id !== service.id));
    } catch (e) {
      console.error("Failed to delete service type", e);
      alert("ลบไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingService(null);
  }

  return (
    <div className="app-container">
      <Sidebar />
      <Dashboard
        serviceTypes={serviceTypes}
        loading={loading}
        error={error}
        offices={offices}
        selectedOfficeId={selectedOfficeId}
        onOfficeChange={setSelectedOfficeId}
        onAddClick={() => {
          setEditingService(null);
          setIsModalOpen(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <AddServiceTypeModal
          workGroups={workGroups}
          onClose={handleClose}
          onCreated={handleCreate}
          onUpdated={handleUpdate}
          apiBase={API_BASE}
          officeId={DEFAULT_OFFICE_ID}
          axios={axios}
          editData={editingService}
        />
      )}
    </div>
  );
}

export default App;
