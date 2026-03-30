'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPerson(data: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
}) {
  const person = await prisma.person.create({ data });
  revalidatePath('/');
  return person;
}

export async function getPersonById(id: number) {
  return prisma.person.findUnique({ where: { id } });
}

export async function getAllPeople() {
  return prisma.person.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function updatePerson(
  id: number,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    bio?: string;
  }
) {
  const person = await prisma.person.update({
    where: { id },
    data,
  });
  revalidatePath('/');
  return person;
}

export async function deletePerson(id: number) {
  const person = await prisma.person.delete({ where: { id } });
  revalidatePath('/');
  return person;
}

export async function searchPeople(query: string) {
  return prisma.person.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });
}
