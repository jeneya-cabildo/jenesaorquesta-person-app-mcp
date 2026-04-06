'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { deletePerson } from '@/app/actions/person';
import PersonForm from './person-form';
import { Mail, Phone, MapPin, FileText, Calendar, Edit2, Trash2, User } from 'lucide-react';

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
      <Card className="p-6 mb-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-blue-200/50 dark:border-slate-600/50">
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
    <Card className="group p-6 mb-4 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300 overflow-hidden relative">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex justify-between items-start gap-4">
        {/* Left: Avatar and Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <User className="h-7 w-7 text-white" />
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{person.name}</h3>
              
              <div className="mt-3 space-y-2">
                {/* Email */}
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <a href={`mailto:${person.email}`} className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate">
                    {person.email}
                  </a>
                </div>

                {/* Phone */}
                {person.phone && (
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Phone className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <a href={`tel:${person.phone}`} className="text-sm hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {person.phone}
                    </a>
                  </div>
                )}

                {/* Address */}
                {person.address && (
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm">{person.address}</span>
                  </div>
                )}
              </div>

              {/* Bio */}
              {person.bio && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 italic">
                  <FileText className="h-3 w-3 inline mr-1 opacity-50" />
                  {person.bio}
                </p>
              )}

              {/* Metadata */}
              <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Added {new Date(person.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex gap-2 flex-shrink-0">
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            className="bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 gap-2 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white shadow-sm gap-2 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">{isDeleting ? 'Deleting...' : 'Delete'}</span>
            <span className="sm:hidden">{isDeleting ? '...' : 'Delete'}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
