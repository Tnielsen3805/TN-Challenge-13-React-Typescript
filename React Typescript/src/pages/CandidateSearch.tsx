import React, { useEffect, useState } from 'react';
import { searchGithubUser, searchGithub } from '../api/API';
import { Candidate } from '../interfaces/CandidateInterface';
import CandidateCard from '../components/CandidateCard';

const Home: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  });

  useEffect(() => {
    setCurrentIndex(0);

    const fetchCandidates = async () => {
      const users = await searchGithub();
      if (users.length > 0) {
        const userDetails = await searchGithubUser(users[0].login);
        setCandidates([userDetails]);
      }
    };
    fetchCandidates();
  }, []);

  const acceptCandidate = () => {
    const newSaved = [...savedCandidates, candidates[currentIndex]];
    setSavedCandidates(newSaved);
    localStorage.setItem('savedCandidates', JSON.stringify(newSaved));
    nextCandidate();
  };

  const nextCandidate = async () => {
    const users = await searchGithub();
    if (users.length > 0) {
      const userDetails = await searchGithubUser(users[0].login);
      setCandidates([userDetails]);
    } else {
      setCandidates([]);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidates.length > 0 ? (
        <CandidateCard
          candidate={candidates[currentIndex]}
          onAccept={acceptCandidate}
          onReject={nextCandidate}
        />
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default Home;
