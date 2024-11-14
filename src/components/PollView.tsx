import React, { useState } from 'react';
import { PollState } from '../types/scheduler';
import { format, parse } from 'date-fns';
import { DateTime } from 'luxon';
import {
  CheckCircle2,
  CircleDashed,
  XCircle,
  LayoutGrid,
  Table,
} from 'lucide-react';
import { TableView } from './TableView';

interface PollViewProps {
  poll: PollState;
  onVote: (
    slotIndex: number,
    availability: 'available' | 'maybe' | 'unavailable'
  ) => void;
}

export const PollView: React.FC<PollViewProps> = ({ poll, onVote }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const formatDateTime = (date: string, time: string) => {
    const dateTime = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date());
    try {
      const date = DateTime.fromJSDate(dateTime);
      return date.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    } catch (_err) {
      return format(dateTime, 'MMM d, yyyy h:mm a');
    }
  };

  const getVoteCount = (votes: Record<string, any>, type: string) => {
    return Object.values(votes).filter((vote) => vote.availability === type)
      .length;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{poll.title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
              title="Table View"
            >
              <Table className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-gray-600">{poll.description}</p>
        <p className="text-sm text-gray-500 mt-2">Created by {poll.creator}</p>
      </div>

      {viewMode === 'grid' ? (
        <div className="space-y-4">
          {poll.timeSlots.map((slot, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">
                  {formatDateTime(slot.slot.date, slot.slot.time)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onVote(index, 'available')}
                    className={`p-2 rounded-md transition-colors ${
                      slot.votes[window.webxdc.selfAddr]?.availability ===
                      'available'
                        ? 'bg-green-100 text-green-600'
                        : 'hover:bg-gray-100'
                    }`}
                    title="Available"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => onVote(index, 'maybe')}
                    className={`p-2 rounded-md transition-colors ${
                      slot.votes[window.webxdc.selfAddr]?.availability ===
                      'maybe'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'hover:bg-gray-100'
                    }`}
                    title="Maybe"
                  >
                    <CircleDashed className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => onVote(index, 'unavailable')}
                    className={`p-2 rounded-md transition-colors ${
                      slot.votes[window.webxdc.selfAddr]?.availability ===
                      'unavailable'
                        ? 'bg-red-100 text-red-600'
                        : 'hover:bg-gray-100'
                    }`}
                    title="Unavailable"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 text-sm">
                <span className="text-green-600">
                  {getVoteCount(slot.votes, 'available')} available
                </span>
                <span className="text-yellow-600">
                  {getVoteCount(slot.votes, 'maybe')} maybe
                </span>
                <span className="text-red-600">
                  {getVoteCount(slot.votes, 'unavailable')} unavailable
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {Object.values(slot.votes).map((vote) => (
                  <div
                    key={vote.userId}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="font-medium">{vote.userName}:</span>
                    <span
                      className={
                        vote.availability === 'available'
                          ? 'text-green-600'
                          : vote.availability === 'maybe'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }
                    >
                      {vote.availability}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TableView poll={poll} />
      )}
    </div>
  );
};
