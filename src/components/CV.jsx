import Education from "./Education";
import GeneralInfo from "./GeneralInfo";
import WorkExperience from "./WorkExperience";
import { useState } from "react"

export default function CV() {
  const [generalInfo, setGeneralInfo] = useState({});
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);

  return (
    <div className="container">
      <GeneralInfo 
        generalInfo={generalInfo}
        setGeneralInfo={(newGeneralInfo) => setGeneralInfo(Object.create(newGeneralInfo))}
      />
      <Education 
        educationList={educationList}
        setEducationList={(newEducationList) => setEducationList([...newEducationList])}
      />
      <WorkExperience 
        experienceList={experienceList}
        setExperienceList={(newExperienceList) => setExperienceList([...newExperienceList])}
      />
    </div>
  );
}