import React, { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/CandidateInterface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(
      localStorage.getItem('savedCandidates') || '[]'
    );
    setSavedCandidates(storedCandidates);
  }, []);

  const removeCandidate = (username: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== username
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    width='50'
                    height='50'
                  />
                </td>
                <td>
                  <a
                    href={candidate.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {candidate.name || candidate.login}
                  </a>
                </td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => removeCandidate(candidate.login)}
                    className='remove-btn'
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have been accepted.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
