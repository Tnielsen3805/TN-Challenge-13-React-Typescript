import React from 'react';
import { Candidate } from '../interfaces/CandidateInterface';

interface Props {
  candidate: Candidate;
  onAccept: () => void;
  onReject: () => void;
}

const CandidateCard: React.FC<Props> = ({ candidate, onAccept, onReject }) => {
  return (
    <div className='card'>
      <img
        src={candidate.avatar_url}
        alt={candidate.login}
        className='avatar'
      />
      <h2>{candidate.name || candidate.login}</h2>
      <p>
        <strong>Username:</strong> {candidate.login}
      </p>
      <p>
        <strong>Location:</strong> {candidate.location || 'N/A'}
      </p>
      <p>
        <strong>Company:</strong> {candidate.company || 'N/A'}
      </p>
      <p>
        <strong>Email:</strong> {candidate.email || 'N/A'}
      </p>
      <p>
        <a href={candidate.html_url} className='github-link' target='_blank'>
          GitHub Profile
        </a>
      </p>
      <button onClick={onAccept} className='accept'>
        +
      </button>
      <button onClick={onReject} className='reject'>
        -
      </button>
    </div>
  );
};

export default CandidateCard;
