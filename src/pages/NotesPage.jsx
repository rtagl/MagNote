// import { fakeData as notes } from '../assets/fakeData';
import { useEffect, useState } from 'react';
import { db } from '../appwrite/databases';
import NoteCard from '../components/NoteCard';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		const response = await db.notes.list();
		setNotes(response.documents);
	};

	return (
		<div>
			{notes.map((note) => (
				<NoteCard key={note.$id} note={note} />
			))}
		</div>
	);
};

export default NotesPage;
