import { useState } from "react";

export default function Education({educationList, setEducationList}) {
  const [editMode, setEditMode] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  const [id, setId] = useState(0);

  function changeMode() {
    if (editMode) setItemToEdit({});
    setEditMode(!editMode);
  }

  function editEducationInit(education) {
    setItemToEdit(education);
    changeMode();
  }

  function saveEducation(educationItem) {
    const foundElementIndex = educationList.findIndex((element) => element.id === itemToEdit.id);
    if (foundElementIndex != -1) {
      educationItem.id = itemToEdit.id;
      const newEducationList = educationList;
      newEducationList.splice(foundElementIndex, 1);
      setEducationList([...newEducationList, educationItem])
    } else {
      educationItem.id = id;
      setId(id + 1);
      setEducationList([...educationList, educationItem]);
    }
  }

  function deleteEducation(educationItem) {
    const foundElementIndex = educationList.findIndex((element) => element.id === educationItem.id);
    if (foundElementIndex != -1) {
      const newEducationList = educationList;
      newEducationList.splice(foundElementIndex, 1);
      setEducationList([...newEducationList])
    }
  }

  function renderEducationItem(education) {
    return (
      <div className="educationItem" key={education.id}>
        <p>School: {education.school}</p>
        <p>Field of Study: {education.fieldOfStudy}</p>
        <p>Graduation Date: {education.graduationDate}</p>
        <button onClick={() => editEducationInit(education)}>Edit</button>
        <button onClick={() => deleteEducation(education)}>Delete</button>
      </div>
    );
  } 

  function handleEducationSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEducation = Object.fromEntries(formData.entries());
    changeMode();
    saveEducation(newEducation);
  }

  function editEducation(education = {}) {
    return (
      <div className="educationEdit">
        <form onSubmit={handleEducationSubmit}>
            <label>School: 
              <input 
                name="school"
                type="text" 
                defaultValue={education.school}
              />
            </label>
            <label>Field of Study: 
              <input 
                name="fieldOfStudy"
                type="text" 
                defaultValue={education.fieldOfStudy}
              />
            </label>
            <label>Graduation Date: 
              <input 
                name="graduationDate"
                type="date" 
                defaultValue={education.graduationDate}
              />
            </label>
            <button type="submit">Save</button>
            <button onClick={changeMode}>Cancel</button>
          </form>
      </div>
    );
  }

  return (
    <div className="education-section">
      <h2>Education</h2>
      <button onClick={changeMode}>Add new</button>
      {editMode && editEducation(itemToEdit)}
      {educationList
        .sort((a, b) => a.id - b.id)
        .map((education) => renderEducationItem(education))
      }
    </div>
  );
}