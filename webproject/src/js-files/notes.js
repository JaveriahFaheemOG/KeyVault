import '../css-files/notes.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notes() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [savedNotes, setSavedNotes] = useState([]); // To hold saved notes
    const [selectedNote, setSelectedNote] = useState(null); // Current note
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false); // Success message for saving
    const [editId, setEditId] = useState(null); 

    // Show popup to add new note
    const showPopup = (note = null) => {
        setIsPopupVisible(true);
        if (note) {
            setNoteTitle(note.title);
            setNoteContent(note.content);
            setEditId(note._id); // Set the note ID for editing
        } else {
            setNoteTitle('');
            setNoteContent('');
            setEditId(null); // Clear edit mode
        }
    };

    // Fetch saved notes from API
    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/notes', {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            });
            setSavedNotes(response.data.notes); // Set the notes from the response
        } catch (error) {
            console.error('Error fetching notes:', error);
            //alert('Failed to fetch notes. Please try again later.');
        }
    };

    useEffect(() => {
        fetchNotes(); // Fetch notes on component load
    }, []);

    // Save note to the backend
    const saveNote = async () => {
        if (noteTitle && noteContent) {
            const newNote = { title: noteTitle, content: noteContent };

            try {
                if (editId) {
                    // Update note
                    const response = await axios.put(
                        `http://localhost:3001/notes/${editId}`,
                        newNote,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
                    );
                    setSavedNotes(savedNotes.map(note => 
                        note._id === editId ? response.data.note : note
                    ));
                } else {
                    // Add new note
                    const response = await axios.post('http://localhost:3001/notes', newNote, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                    });
                    setSavedNotes([...savedNotes, response.data.note]);
                }
                setIsPopupVisible(false);
                setIsSuccessVisible(true); // Show success message
                setTimeout(() => setIsSuccessVisible(false), 3000); // Hide success message after 3 seconds
            } catch (error) {
                console.error('Error saving note:', error);
            }
        } else {
            alert('Please fill all fields');
        }
    };
    const handleDeleteNote = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await axios.delete(`http://localhost:3001/notes/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                setSavedNotes(savedNotes.filter(note => note._id !== id));
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        setIsDetailVisible(false);
    };

    const closedetails = () => {
        //setIsPopupVisible(false);
        setIsDetailVisible(false);
    };

    const viewNoteDetails = (note) => {
        setSelectedNote(note);
        setIsDetailVisible(true);
    };

    return (
        <div className={`Notes-container ${savedNotes.length === 0 ? 'empty' : ''}`}>
            <div className="Notes-div">
                <h1>Notes</h1>
                <button onClick={showPopup}>Add Notes</button>
            </div>
            <hr />

            {/* Popup for adding new note */}
            {isPopupVisible && (
                <div className="notes-popup">
                    <div className="popup-content">
                        <i className="fa fa-close close" onClick={closePopup}></i>
                        <h2>{editId ? 'Edit Note' : 'Add Note'}</h2>
                        <div>
                            <label>Title:</label>
                            <input
                                type="text"
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Content:</label>
                            <textarea
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-actions">
                            <button onClick={closePopup} className="btn1">Cancel</button>
                            <button onClick={saveNote} className="btn1">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Display success message */}
            {isSuccessVisible && <div className="success-message">Note saved successfully!</div>}

            {/* Display saved notes */}
            <div className="notes-container">
                {savedNotes.map((note, index) => (
                    <div key={index} className="note-card" onClick={() => viewNoteDetails(note)}>
                        <div className="note-icon">
                            <img src={require('../images/notes.png')} alt="Note" />
                        </div>
                        <div className="note-title">{note.title}</div>
                        <div className="entry-actions">
                        <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); // Prevent viewNoteDetails from being triggered
                                    showPopup(note); 
                                }}>
                                Edit
                            </button>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); // Prevent viewNoteDetails from being triggered
                                    handleDeleteNote(note._id); 
                                }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed view of a note */}
            {isDetailVisible && selectedNote && (
                <div className="notes-detail-popup">
                    <div className="popup-content">
                        <h2>Note Details</h2>
                        <p><strong>Title:</strong> {selectedNote.title}</p>
                        <p><strong>Content:</strong> {selectedNote.content}</p>
                        <button className="close-info" onClick={closedetails}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notes;
