'use client';

import { useState } from 'react';
import { createPerson, updatePerson } from '@/app/actions/person';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PersonFormProps {
  initialData?: {
    id?: number;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    bio?: string | null;
  };
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function PersonForm({ initialData, onSuccess, onCancel }: PersonFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!initialData?.id;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || undefined,
        address: formData.get('address') as string || undefined,
        bio: formData.get('bio') as string || undefined,
      };

      if (!data.name || !data.email) {
        setError('Name and email are required');
        return;
      }

      if (isEditing && initialData?.id) {
        await updatePerson(initialData.id, data);
      } else {
        await createPerson(data);
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && <div className="p-4 bg-red-50 text-red-700 rounded-md font-medium border border-red-200">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-base font-bold text-gray-900">Name *</Label>
        <Input
          id="name"
          name="name"
          type="text"
          defaultValue={initialData?.name || ''}
          required
          placeholder="Full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-bold text-gray-900">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={initialData?.email || ''}
          required
          placeholder="email@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base font-bold text-gray-900">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={initialData?.phone || ''}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-base font-bold text-gray-900">Address</Label>
        <Input
          id="address"
          name="address"
          type="text"
          defaultValue={initialData?.address || ''}
          placeholder="123 Main St, City, State"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="text-base font-bold text-gray-900">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          defaultValue={initialData?.bio || ''}
          placeholder="Your bio..."
          rows={4}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
