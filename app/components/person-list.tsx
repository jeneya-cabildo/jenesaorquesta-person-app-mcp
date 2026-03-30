'use client';

import { useEffect, useState } from 'react';
import { getAllPeople, searchPeople } from '@/app/actions/person';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PersonCard from './person-card';
import PersonForm from './person-form';
import { Card } from '@/components/ui/card';

interface Person {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function PersonList() {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPeople();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredPeople(people);
    } else {
      handleSearch(searchQuery);
    }
  }, [people, searchQuery]);

  async function loadPeople() {
    setIsLoading(true);
    try {
      const data = await getAllPeople();
      setPeople(data);
      setFilteredPeople(data);
    } catch (error) {
      console.error('Failed to load people:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch(query: string) {
    if (!query) {
      setFilteredPeople(people);
      return;
    }

    try {
      const results = await searchPeople(query);
      setFilteredPeople(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">People Directory</h2>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          {showForm ? 'Cancel' : '+ Add Person'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">Add New Person</h3>
          <PersonForm
            onSuccess={() => {
              setShowForm(false);
              loadPeople();
            }}
            onCancel={() => setShowForm(false)}
          />
        </Card>
      )}

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : filteredPeople.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? 'No people found matching your search.' : 'No people yet. Add one to get started!'}
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Showing {filteredPeople.length} of {people.length} people
          </p>
          {filteredPeople.map((person) => (
            <PersonCard key={person.id} person={person} onUpdate={loadPeople} />
          ))}
        </div>
      )}
    </div>
  );
}
