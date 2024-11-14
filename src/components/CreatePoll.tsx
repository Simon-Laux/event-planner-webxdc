import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface CreatePollProps {
  onCreatePoll: (
    title: string,
    description: string,
    timeSlots: { time: string; date: string }[]
  ) => void;
}

export const CreatePoll: React.FC<CreatePollProps> = ({ onCreatePoll }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeSlots, setTimeSlots] = useState<{ time: string; date: string }[]>(
    []
  );

  const handleAddTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      { date: format(new Date(), 'yyyy-MM-dd'), time: '12:00' },
    ]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || timeSlots.length === 0) return;
    onCreatePoll(title, description, timeSlots);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Create New Poll</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event description"
            rows={3}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Time Slots
            </label>
            <button
              type="button"
              onClick={handleAddTimeSlot}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Time Slot
            </button>
          </div>

          <div className="space-y-3">
            {timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center gap-4">
                <input
                  type="date"
                  value={slot.date}
                  onChange={(e) => {
                    const newSlots = [...timeSlots];
                    newSlots[index].date = e.target.value;
                    setTimeSlots(newSlots);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  value={slot.time}
                  onChange={(e) => {
                    const newSlots = [...timeSlots];
                    newSlots[index].time = e.target.value;
                    setTimeSlots(newSlots);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTimeSlot(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={!title || timeSlots.length === 0}
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};
