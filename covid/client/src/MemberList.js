import React, { useState, useEffect, memo } from 'react';
import './App.css'

function MemberList(props) {
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  const[selectedMember, setSelectedMember]=useState();
  const[showEditMember,setShowEditMember]=useState();
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    memId: '',
    address: '',
    phone: '',
    cell: '',
    vac1: '',
    vac2: '',
    vac3: '',
    vac4: '',
    manu1: '',
    manu2: '',
    manu3: '',
    manu4: '',
    positive: '',
    recovery: ''
  });


  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch('http://localhost:4000/');
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        console.log(data);
        props.setMembers(data);
       } catch (error) {
        console.error('error fetching members', error);
      } 
    }
    fetchMembers();
}, []);

function displayMemberDetails(member) {
  if(member==selectedMember)
    setShowMemberDetails(!showMemberDetails);
  setSelectedMember(member);
}

//When the user clicks on the delete button
async function handleDeleteMember(member) {
  await fetch(`http://localhost:4000/members/${member.memId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete member');
      }
      // Remove the deleted member from the local state
      props.setMembers(prevMembers => prevMembers.filter(m => m.memId !== member.memId));
      console.log('Member deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting member:', error);
    });
}

//When the user clicks on the edit button
function handleEditMember(member) {
  setShowEditMember(true);
  setShowMemberDetails(false);
  setSelectedMember(member);
  setFormData({
    fName: member.fName,
    lName: member.lName,
    memId: member.memId,
    address: member.address || '',
    phone: member.phone || '',
    cell: member.cell || '',
    vac1: member.vac1 || '',
    vac2: member.vac2 || '',
    vac3: member.vac3 || '',
    vac4: member.vac4 || '',
    manu1: member.manu1 || '',
    manu2: member.manu2 || '',
    manu3: member.manu3 || '',
    manu4: member.manu4 || '',
    positive: member.positive || '',
    recovery: member.recovery || ''
  });
}
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

//When the user clicks on the "save changes" button
const handleEditSubmit = async (e) => {
   e.preventDefault();

   if(!formData.fName||!formData.lName){ 
    alert('Member must have first name and last name');
  return;
   }
    try {
      const response = await fetch(`http://localhost:4000/members/${selectedMember.memId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update member');
      }
      const updatedMembers = props.members.map((member) => {
        if (member.memId === selectedMember.memId) {
          return {
            ...member,
            ...formData
          };
        }
        return member;
      });

      props.setMembers(updatedMembers);
      setShowEditMember(false);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };



  return (
    <div>
         <ul>
      {props.members.map(member => (
        <li key={member.memId} onClick={() => displayMemberDetails(member)}>
          {member.fName} {member.lName}
          <button onClick={()=>handleDeleteMember(member)}>delete</button>
          <button onClick={(e) => { e.preventDefault(); handleEditMember(member); }}>edit</button>

        </li>
      ))}
    </ul>
    {showMemberDetails&&<div className="form">
          <h2>{selectedMember.fName} {selectedMember.lName}</h2>
          <p>ID: {selectedMember.memId}</p>
          <p>Address: {selectedMember.address}</p>
          <p>Phone: {selectedMember.phone}</p>
          <p>Cell: {selectedMember.cell}</p>
          {selectedMember.vac1 && <p>First Vaccination: {selectedMember.vac1}</p>} {selectedMember.manu1&& <p>  By: {selectedMember.manu1}</p>}
          {selectedMember.vac2 && <p>Second Vaccination: {selectedMember.vac2}</p>} {selectedMember.manu2&& <p> By: {selectedMember.manu2}</p>}
          {selectedMember.vac3 && <p>Third Vaccination: {selectedMember.vac3}</p>} {selectedMember.manu3&& <p> By: {selectedMember.manu3}</p>}
          {selectedMember.vac4 && <p>Fourth Vaccination: {selectedMember.vac4}</p>} {selectedMember.manu4&& <p> By: {selectedMember.manu4}</p>}
      </div>}

      {showEditMember && (
        <div className="form">
          <h2>Edit Member</h2>
          <form onSubmit={handleEditSubmit}>
          <label>
                    First Name:
                    <input
                        type="text"
                        name="fName"
                        value={formData.fName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lName"
                        value={formData.lName}
                        onChange={handleChange}
                    />
                </label>
                <br></br>

                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </label>
                <br></br>

                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Cell:
                    <input
                        type="text"
                        name="cell"
                        value={formData.cell}
                        onChange={handleChange}
                    />
                </label>
                <br></br>
                <label>
                    Vaccine 1:
                    <input
                        type="date"
                        name="vac1"
                        value={formData.vac1}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    By:
                    <select
                        name="manu1"
                        value={formData.manu1}
                        onChange={handleChange}
                    >
                        <option value="">Select Manufacturer</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="Moderna">Moderna</option>
                    </select>
                    </label>
                    <br></br>

                <label>
                    Vaccine 2:
                    <input
                        type="date"
                        name="vac2"
                        value={formData.vac2}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    By:
                    <select
                        name="manu2"
                        value={formData.manu2}
                        onChange={handleChange}
                    >
                        <option value="">Select Manufacturer</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="Moderna">Moderna</option>
                    </select>
                    </label>
                    <br></br>

                <label>
                    Vaccine 3:
                    <input
                        type="date"
                        name="vac3"
                        value={formData.vac3}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    By:
                    <select
                        name="manu3"
                        value={formData.manu3}
                        onChange={handleChange}
                    >
                        <option value="">Select Manufacturer</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="Moderna">Moderna</option>
                    </select>
                    </label>
                    <br></br>

                <label>
                    Vaccine 4:
                    <input
                        type="date"
                        name="vac4"
                        value={formData.vac4}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    By:
                    <select
                        name="manu4"
                        value={formData.manu4}
                        onChange={handleChange}
                    >
                        <option value="">Select Manufacturer</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="Moderna">Moderna</option>
                    </select>
                    <br></br>

                    </label>
               
                <label>
                    Positive Test Date:
                    <input
                        type="date"
                        name="positive"
                        value={formData.positive}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Recovery Date:
                    <input
                        type="date"
                        name="recovery"
                        value={formData.recovery}
                        onChange={handleChange}
                    />
                </label>
                <br></br>
                <button type="submit">Save Changes</button>
            </form>
       </div>)}
    
    </div>
 
  );

      }



export default MemberList;
