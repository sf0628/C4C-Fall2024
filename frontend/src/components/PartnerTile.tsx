import React from 'react';
import { PartnerData} from '../types';
import { PartnerDetails } from '../../../backend/src/types';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

interface PartnerTileProps {
  partnerData: PartnerDetails;
  onRemove: () => void;
}

function PartnerTile({ partnerData, onRemove }: PartnerTileProps) {
  const partner = partnerData as PartnerDetails;
  const getStatus = (active: boolean): string => {
    return active ? 'Active' : 'Inactive';
  };

  return (
    <div className="partner-tile">
      <h2 className="partner-name">{partner.name}</h2>
      <img className="partner-thumbnail" src={partner.thumbnailUrl} alt={partner.name} />
      <hr />
      <div className="partner-info">
        <span 
          id="status"
          style={{color: partner.active ? '#2eba27' : 'red', fontSize: '10pt', fontWeight: 'bold' }}
        >
          {getStatus(partner.active)}
        </span>
        <p>{partner.description}</p>
      </div>
      <button type="button" className="partner-button" onClick={onRemove}>Remove</button>
      <button type="button" className="edit-partner-button">Edit</button>
    </div>
  );
}

export default PartnerTile;