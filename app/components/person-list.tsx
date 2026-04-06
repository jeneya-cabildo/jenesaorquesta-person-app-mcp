'use client';

import { useEffect, useState } from 'react';
import { getAllPeople, searchPeople } from '@/app/actions/person';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PersonCard from './person-card';
import PersonForm from './person-form';
import { Card } from '@/components/ui/card';
import { Search, Plus, Loader2 } from 'lucide-react';

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
  const [isSearching, setIsSearching] = useState(false);
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

    setIsSearching(true);
    try {
      const results = await searchPeople(query);
      setFilteredPeople(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header with Title and Add Button */}
      <div className="flex gap-4 flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">People Directory</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{people.length} total contact{people.length !== 1 ? 's' : ''}</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
        >
          <Plus className="h-5 w-5" />
          {showForm ? 'Cancel' : 'Add Person'}
        </Button>
      </div>

      {/* Add Form Card */}
      {showForm && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-blue-200/50 dark:border-slate-600/50 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Person</h3>
          <PersonForm
            onSuccess={() => {
              setShowForm(false);
              loadPeople();
            }}
            onCancel={() => setShowForm(false)}
          />
        </Card>
      )}

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
        </div>
        <Input
          type="text"
          placeholder="🔍 Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-3 text-base bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin opacity-20"></div>
            <div className="absolute inset-2 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your contacts...</p>
        </div>
      ) : filteredPeople.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 mb-4">
            <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'No matches found' : 'No contacts yet'}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? 'Try searching with different keywords' : 'Add your first contact to get started'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Showing <span className="font-bold text-gray-900 dark:text-white">{filteredPeople.length}</span> of <span className="font-bold text-gray-900 dark:text-white">{people.length}</span> contact{people.length !== 1 ? 's' : ''}
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>
          <div className="grid gap-4">
            {filteredPeople.map((person) => (
              <PersonCard key={person.id} person={person} onUpdate={loadPeople} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
