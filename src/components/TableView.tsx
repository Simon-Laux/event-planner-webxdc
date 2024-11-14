import React from 'react';
import { PollState } from '../types/scheduler';
import { format, parse } from 'date-fns';
import { CheckCircle2, CircleDashed, XCircle, HelpCircle } from 'lucide-react';
import { DateTime } from 'luxon';

interface TableViewProps {
  poll: PollState;
}

export const TableView: React.FC<TableViewProps> = ({ poll }) => {
  const formatDateTime = (date: string, time: string) => {
    const dateTime = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date());
    try {
      const date = DateTime.fromJSDate(dateTime);
      return (
        <div>
          {date.toLocaleString(DateTime.DATE_SHORT)}
          <br />
          {date.toLocaleString({ weekday: 'long' })}
          <br />
          {date.toLocaleString(DateTime.TIME_SIMPLE)}
        </div>
      );
    } catch (_err) {
      return (
        <div>
          {format(dateTime, 'PP')}
          <br />
          {format(dateTime, 'p')}
        </div>
      );
    }
  };

  // Get unique users from all votes
  const users = Array.from(
    new Set(
      poll.timeSlots.flatMap((slot) =>
        Object.values(slot.votes).map((vote) => vote.userId)
      )
    )
  );

  const getAvailabilityIcon = (availability: string | undefined) => {
    switch (availability) {
      case 'available':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'maybe':
        return <CircleDashed className="w-5 h-5 text-yellow-600" />;
      case 'unavailable':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <HelpCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getAvailabilityBackgroundColor = (availability: string | undefined) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100'; // Light green background for available
      case 'maybe':
        return 'bg-yellow-100'; // Light yellow background for maybe
      case 'unavailable':
        return 'bg-red-100'; // Light red background for unavailable
      default:
        return 'bg-gray-100'; // Light gray background for unknown status
    }
  };

  return (
    <div className="mt-8 overflow-x-auto -mx-5">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
            >
              Participant
            </th>
            {poll.timeSlots.map((slot, index) => (
              <th
                key={index}
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-pre-line text-center"
              >
                {formatDateTime(slot.slot.date, slot.slot.time)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((userId) => {
            const userName =
              poll.timeSlots.find((slot) => slot.votes[userId])?.votes[userId]
                ?.userName || userId;

            return (
              <tr key={userId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                  {userName}
                </td>
                {poll.timeSlots.map((slot, index) => (
                  <td
                    key={index}
                    className={`px-6 py-4 whitespace-nowrap ${getAvailabilityBackgroundColor(
                      slot.votes[userId]?.availability
                    )}`}
                  >
                    <div className="flex justify-center">
                      {getAvailabilityIcon(slot.votes[userId]?.availability)}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
