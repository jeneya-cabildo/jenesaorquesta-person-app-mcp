import PersonList from './components/person-list';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Person App</h1>
        <p className="text-gray-600">Manage your contacts with full CRUD operations and database integration.</p>
      </div>
      <PersonList />
    </div>
  );
}
