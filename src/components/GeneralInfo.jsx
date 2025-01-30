import { useState } from 'react';

export default function GeneralInfo({ generalInfo, setGeneralInfo }) {
  const [editMode, setEditMode] = useState('false');

  function changeMode() {
    setEditMode(!editMode);
  }

  function handleGeneralInfoSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGeneralInfo = Object.fromEntries(formData.entries());
    console.log(setGeneralInfo);
    changeMode();
    setGeneralInfo(newGeneralInfo);
  }

  return (
    <div className="generalnfo-section">
      <div className="title">
        <h2>General Info</h2>
        {editMode ? <button onClick={changeMode}>Edit</button> : <></>}
      </div>

      {editMode ? (
        <div className="card">
          <p>First Name: {generalInfo.firstName}</p>
          <p>Last Name: {generalInfo.lastName}</p>
          <p>Email: {generalInfo.email}</p>
          <p>Phone: {generalInfo.phone}</p>
        </div>
      ) : (
        <form onSubmit={handleGeneralInfoSubmit}>
          <label>
            First name:
            <input
              name="firstName"
              type="text"
              defaultValue={generalInfo.firstName}
            />
          </label>
          <label>
            Last name:
            <input
              name="lastName"
              type="text"
              defaultValue={generalInfo.lastName}
            />
          </label>
          <label>
            Email:
            <input name="email" type="email" defaultValue={generalInfo.email} />
          </label>
          <label>
            Phone:
            <input name="phone" type="tel" defaultValue={generalInfo.phone} />
          </label>
          <div className="form-buttons">
            <button type="submit">Save</button>
            <button onClick={changeMode}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
