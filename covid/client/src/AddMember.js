import React, { useState, useEffect } from 'react';
import './App.css'

function AddMember(props) {
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

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the member ID already exists in the local members list
        if (props.members.some(member => member.memId === parseInt(formData.memId))) {
            alert('Member with the same ID already exists');
            return;
          }
          
        // Check if the member has ID, first name and last name
          if(!formData.fName||!formData.lName||!formData.memId){ 
            alert('Member must have ID, first name and last name');
          return;
        }
    
    else
        try {
          const response = await fetch('http://localhost:4000/members', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)     
          });

          if (!response.ok) {
            throw new Error('Failed to add member');
          }

          console.log('Member added successfully');
          props.setShowAddMember(false); 

          props.setMembers([...props.members, formData]);

        } catch (error) {
          console.error('Error adding member:', error);
        }
      };
      

    return (
        <div className="form">
            <h2>Add Member</h2>
            <form onSubmit={handleSubmit} style={{padding:'10px'}}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="fName"
                        value={formData.fName}
                        onChange={handleChange}
                    />
                </label>
                <br></br>
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
                    Member ID:
                    <input
                        type="text"
                        name="memId"
                        value={formData.memId}
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
                <br></br>

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

                <button type="submit">Add Member</button>
            </form>
        </div>
    );
}

export default AddMember;
