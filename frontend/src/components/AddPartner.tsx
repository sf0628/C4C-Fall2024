import { useState } from 'react';
import { PartnerDetails } from '../../../backend/src/types';

interface AddPartnerProps {
    onAdd: (newPartner: PartnerDetails) => void;
}

/*
  The top-level component containing everything relevant to add partners,
  including a fields and buttons to add a partner.
*/
function AddPartner({onAdd}: AddPartnerProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [active, setActive] = useState(false);

    const handleAdd = async () => {
        if (name && description && thumbnailUrl) {
            const newPartner: PartnerDetails = {thumbnailUrl, name, description, active};
            onAdd(newPartner);
            setName('');
            setDescription('');
            setThumbnailUrl('');
            setActive(false);
        } else {
            alert('Please fill in all fields');
        }
    }

  return (
    <div id="partner-content">
        <form id="partner-form" className="form" action="./" method="POST">
            <h1 className="form-title">Add New Partner</h1>
            <div className="form-group">
                <label htmlFor="name">Partner name: </label>
                <input type="text" className="form-input" id="name" value={name}
                onChange={(e) => setName(e.target.value)}></input>
            </div>

            <div className="form-group">
                <label htmlFor="description">Partner Description: </label>
                <input type="text" className="form-input" id="description" value={description}
                onChange={(e) => setDescription(e.target.value)}></input>
            </div>

            <div className="form-group">
                <label htmlFor="logo-source">Partner Logo Source: </label>
                <input type="text" className="form-input" id="logo-source" value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}></input>
            </div>

            <div className="form-group checkbox-group">
                <label htmlFor="is-active">Active? </label>
                <input type="checkbox" className="form-input" id="is-active" checked={active}
                onChange={(e) => setActive(e.target.checked)} name="is-active"></input>
            </div>
            <button type="button" onClick={handleAdd}>Submit</button>
        </form>
    </div>
  );
}

export default AddPartner;