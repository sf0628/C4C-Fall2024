import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import AddPartner from '../components/AddPartner';
import { PartnerData } from '../types';
import { PartnerDetails, UserDetails } from '../../../backend/src/types';
import SearchPartner from './SearchPartner';
import AdminLogin from './AdminLogin';

interface DashboardProps {

}

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard({}: DashboardProps) {
  const [partners, setPartners] = useState<PartnerData>({});
  const [filteredPartners, setFilteredPartners] = useState<PartnerData>({});
  const [showLogin, setShowLogin] = useState<boolean>(true);

  // Load all partners on initial page load 
  useEffect(() => {
    fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data: PartnerData) => setPartners(data))
    .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleRemove = async (removeKey: string) => {
    try {
      const response = await fetch(`http://localhost:4000/partner/${removeKey}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newPartners: PartnerData = { ...partners };
        delete newPartners[removeKey];
        setPartners(newPartners);

      } else {
        console.error('Failed to delete partner');
      }
    }
    catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  const handleAddPartner = async (newPartner: PartnerDetails) => {
    try {
      const response = await fetch(`http://localhost:4000/partner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPartner),
    });
    
    if (response.ok) {
      const newKey = newPartner.name.toLowerCase().replace(/\s+/g, '');
      setPartners({
        ...partners,
        [newKey]: newPartner,
      });
    } else {
      console.error('Failed to add partner');
    }
  }
  catch (error) {
    console.error('Error adding partner:', error);
  }
};

const handleSearchByTitle = (title: string) => {
  const filtered = Object.entries(partners)
    .filter(([_, partner]) => partner.name.toLowerCase().includes(title.toLowerCase()))
    .reduce((obj, [key, partner]) => {
      obj[key] = partner;
      return obj;
    }, {} as PartnerData);
  setFilteredPartners(filtered);
};

const handleSearchByStatus = (status: boolean) => {
  const filtered = Object.entries(partners)
    .filter(([_, partner]) => partner.active === status)
    .reduce((obj, [key, partner]) => {
      obj[key] = partner;
      return obj;
    }, {} as PartnerData);
  setFilteredPartners(filtered);
};

const handleSearch = () => {
  setFilteredPartners(partners);
};

const handleAdminLogin = async (username: string, password: string) => {
  try {
    const response = await fetch(`http://localhost:4000/admin/login`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log('Admin logged in successfully');
      setShowLogin(false);
    } else {
      console.error('Failed to log in as admin');
    }
  }

  catch (error) {
    console.error('Error while loggin in as admin', error);
  }
}

  return (
    <div id="main-content">
      {showLogin && (
        <AdminLogin onLogin={handleAdminLogin}/>
      )}
      {!showLogin && (
        <>
        <AddPartner onAdd={handleAddPartner} />
        <SearchPartner 
          onSearchByTitle={handleSearchByTitle}
          onSearchByStatus={handleSearchByStatus}
          onSearch={handleSearch}
        />
        
        <div id="main-partners-grid">
          {Object.keys(filteredPartners).map((key) => {
            const partner = filteredPartners[key as keyof PartnerData] as PartnerDetails;
            return (
              <PartnerTile
                key={key}
                partnerData={partner} 
                onRemove={() => handleRemove(key)} //passes the remove handler
              />
            );
          })}
        </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;