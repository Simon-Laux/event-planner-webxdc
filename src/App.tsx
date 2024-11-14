import React, { useState, useEffect } from 'react';
import { CreatePoll } from './components/CreatePoll';
import { PollView } from './components/PollView';
import { PollState, UpdateType } from './types/scheduler';
import * as Y from 'yjs';

const doc = new Y.Doc();
const pollState = doc.getMap('poll');

function App() {
  const [poll, setPoll] = useState<PollState | null>(null);

  useEffect(() => {
    // Ensure WebXDC is initialized
    if (typeof window.webxdc === 'undefined') {
      console.warn('WebXDC not initialized, waiting...');
      return;
    }

    window.webxdc.setUpdateListener((update: { payload: UpdateType }) => {
      if (update.payload.type === 'CREATE_POLL') {
        const { payload } = update.payload;
        const newPoll: PollState = {
          ...payload,
          timeSlots: payload.timeSlots.map((slot) => ({
            slot,
            votes: {},
          })),
        };
        setPoll(newPoll);
        pollState.set('data', newPoll);
      } else if (update.payload.type === 'VOTE') {
        const { slotIndex, vote } = update.payload.payload;
        setPoll((current) => {
          if (!current) return null;
          const newPoll = { ...current };
          newPoll.timeSlots[slotIndex].votes[vote.userId] = vote;
          return newPoll;
        });
      }
    });
  }, []);

  const handleCreatePoll = (
    title: string,
    description: string,
    timeSlots: { time: string; date: string }[]
  ) => {
    const update: UpdateType = {
      type: 'CREATE_POLL',
      payload: {
        title,
        description,
        creator: window.webxdc.selfName,
        timeSlots,
      },
    };

    window.webxdc.sendUpdate(
      {
        payload: update,
        summary: description,
        document: title,
      },
      'Created new scheduling poll'
    );
  };

  const handleVote = (
    slotIndex: number,
    availability: 'available' | 'maybe' | 'unavailable'
  ) => {
    const update: UpdateType = {
      type: 'VOTE',
      payload: {
        slotIndex,
        vote: {
          userId: window.webxdc.selfAddr,
          userName: window.webxdc.selfName,
          availability,
        },
      },
    };

    window.webxdc.sendUpdate(
      {
        payload: update,
        info: `${window.webxdc.selfName} has just updated their availability.`,
      },
      'Updated availability for time slot'
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {!poll ? (
          <CreatePoll onCreatePoll={handleCreatePoll} />
        ) : (
          <PollView poll={poll} onVote={handleVote} />
        )}
      </div>
    </div>
  );
}

export default App;
