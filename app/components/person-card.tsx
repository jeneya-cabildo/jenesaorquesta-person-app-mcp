'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { deletePerson } from '@/app/actions/person';
import PersonForm from './person-form';

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

export default function PersonCard({ person, onUpdate }: { person: Person; onUpdate: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this person?')) return;
    setIsDeleting(true);
    try {
      await deletePerson(person.id);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete person:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <Card className="p-4 mb-4">
        <PersonForm
          initialData={person}
          onSuccess={() => {
            setIsEditing(false);
            onUpdate();
          }}
          onCancel={() => setIsEditing(false)}
        />
      </Card>
    );
  }

  return (
    <Card className="p-4 mb-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{person.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{person.email}</p>
          {person.phone && <p className="text-sm">📱 {person.phone}</p>}
          {person.address && <p className="text-sm">📍 {person.address}</p>}
          {person.bio && <p className="text-sm mt-2 text-gray-700">{person.bio}</p>}
          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(person.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            size="sm"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
