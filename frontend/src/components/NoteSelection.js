import React, {useState} from 'react'

function NoteSelection(){

    const [notes, setNotes] = useState(
        [{id: 1, content:"Note 1"}, {id: 2, content: "Note 2"}]/*this will be generated using data from api*/
    )

    const notesHtml = notes.map((note) => {
        return (
            <div className='note-menu-elem' key={note.id} onClick={() => handleNoteSwitch(note.id)}>
                {note.content}
            </div>
        )
    })

    function handleNoteSwitch(id){
        console.log(id)
    }

    return (
        <div className='note-selection'>
            {notesHtml}
        </div>
    )
}

export default NoteSelection
