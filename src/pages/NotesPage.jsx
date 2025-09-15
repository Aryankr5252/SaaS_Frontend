import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import UpgradeButton from '../components/UpgradeButton';

const NotesPage = () => {
  const { user, loading } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (!user) return;
    fetchAllNotes();
    // eslint-disable-next-line
  }, [user, refresh]);

  const fetchAllNotes = async () => {
    try {
      const res = await api.get('/notes/getAll');
      setNotes(res.data.notes);
      setError('');
    } catch (err) {
      setError('Failed to fetch notes');
    }
  };

  const fetchMyNotes = async () => {
    if (!user) return;
    try {
      const res = await api.get(`/notes/getOne/${user._id}`);
      // Backend returns {note: [...]}, so use note or []
      setNotes(res.data.note || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch your notes');
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notes/create', { title: noteTitle, content: noteContent });
      setNoteTitle('');
      setNoteContent('');
      setRefresh(r => !r);
    } catch (err) {
      setError('Failed to create note');
    }
  };

  const handleEditClick = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleEditSave = async (id) => {
    try {
      await api.put(`/notes/update/${id}`, { title: editTitle, content: editContent });
      setEditId(null);
      setEditTitle('');
      setEditContent('');
      setRefresh(r => !r);
    } catch (err) {
      setError('Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/delete/${id}`);
      setRefresh(r => !r);
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <div className="text-center mt-10">Please login to view notes.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Your Notes</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {/* Upgrade button logic: show if notes.length === 3 */}
      {user && notes.length === 3 && (
        <UpgradeButton user={user} notesCount={notes.length} tenantSlug={user.slug} onUpgraded={() => setRefresh(r => !r)} />
      )}
      <form onSubmit={handleCreateNote} className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={noteTitle}
          onChange={e => setNoteTitle(e.target.value)}
          placeholder="Note Title"
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />
        <input
          type="text"
          value={noteContent}
          onChange={e => setNoteContent(e.target.value)}
          placeholder="Note Content"
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Add Note</button>
      </form>
      <div className="flex gap-4 mb-4">
        <button onClick={fetchAllNotes} type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">All Notes</button>
        <button onClick={fetchMyNotes} type="button" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">My Notes</button>
      </div>
      <ul className="space-y-4">
        {notes.length === 0 ? (
          <li className="text-gray-500">No notes found.</li>
        ) : (
          notes.map(note => (
            <li key={note._id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-center gap-2">
              {editId === note._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="border px-2 py-1 rounded mb-2"
                  />
                  <input
                    type="text"
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="border px-2 py-1 rounded mb-2"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleEditSave(note._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
                    <button onClick={() => setEditId(null)} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-6">
                    <span className="font-semibold text-purple-700">{note.title}</span>
                    <span className="text-gray-700">{note.content}</span>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button onClick={() => handleEditClick(note)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDelete(note._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NotesPage;
