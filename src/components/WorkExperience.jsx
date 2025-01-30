import { useState } from "react";

export default function WorkExperience({experienceList, setExperienceList}) {
  const [editMode, setEditMode] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  const [id, setId] = useState(0);

  function changeMode() {
    if (editMode) setItemToEdit({});
    setEditMode(!editMode);
  }

  function editExperienceInit(experience) {
    setItemToEdit(experience);
    changeMode();
  }

  function saveExperience(experienceItem) {
    const foundElementIndex = experienceList.findIndex((element) => element.id === itemToEdit.id);
    if (foundElementIndex != -1) {
      experienceItem.id = itemToEdit.id;
      const newExperienceList = experienceList;
      newExperienceList.splice(foundElementIndex, 1);
      setExperienceList([...newExperienceList, experienceItem])
    } else {
      experienceItem.id = id;
      setId(id + 1);
      setExperienceList([...experienceList, experienceItem]);
    }
  }

  function deleteExperience(experienceItem) {
    const foundElementIndex = experienceList.findIndex((element) => element.id === experienceItem.id);
    if (foundElementIndex != -1) {
      const newExperienceList = experienceList;
      newExperienceList.splice(foundElementIndex, 1);
      setExperienceList([...newExperienceList])
    }
  }

  function renderExperienceItem(experience) {
    return (
      <div className="experienceItem card" key={experience.id}>
        <p>Position title: {experience.position}</p>
        <p>Company: {experience.company}</p>
        <p>Responsibilities: {experience.responsibilities}</p>
        <p>Start date: {experience.startDate}</p>
        <p>End date: {experience.endDate}</p>
        <div className="element-buttons">
          <button onClick={() => editExperienceInit(experience)}>Edit</button>
          <button onClick={() => deleteExperience(experience)}>Delete</button>
        </div>
      </div>
    );
  } 

  function handleExperienceSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newExperience = Object.fromEntries(formData.entries());
    changeMode();
    saveExperience(newExperience);
  }

  function editExperience(experience = {}) {
    return (
      <div className="experienceEdit">
        <form onSubmit={handleExperienceSubmit}>
            <label>Position title: 
              <input 
                name="position"
                type="text" 
                defaultValue={experience.position}
              />
            </label>
            <label>Company: 
              <input 
                name="company"
                type="text" 
                defaultValue={experience.company}
              />
            </label>
            <label>Responsibilities: 
              <textarea 
                name="responsibilities"
                type="text" 
                defaultValue={experience.responsibilities}
              />
            </label>
            <label>Start date: 
              <input 
                name="startDate"
                type="date" 
                defaultValue={experience.startDate}
              />
            </label>
            <label>End date: 
              <input 
                name="endDate"
                type="date" 
                defaultValue={experience.endDate}
              />
            </label>
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button onClick={changeMode}>Cancel</button>
            </div>
          </form>
      </div>
    );
  }

  return (
    <div className="experience-section">
      <div className="title">
        <h2>Work Experience</h2>
        {editMode ? <></> : <button onClick={changeMode}>Add new</button>}
      </div>
      <div className="card-container">
        {editMode && editExperience(itemToEdit)}
        {experienceList
          .sort((a, b) => a.id - b.id)
          .map((experience) => renderExperienceItem(experience))
        }
      </div>
    </div>
  );
}