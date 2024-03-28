import React, { useState } from 'react';
import MemberList from './MemberList';
import AddMember from './AddMember';
import './App.css'

function App() {
  const [members, setMembers] = useState([]);
  const [showAddMember, setShowAddMember] = useState(false);

  return (
    <div>
      <h2>Welcome to the member management system</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <h2>Member List</h2>

          <MemberList members={members} setMembers={setMembers}/>
        </div>
        <div style={{ flex: '2' }}>
        {!showAddMember && (
            <button onClick={() => setShowAddMember(true)}>Add Member</button>
          )}
          {showAddMember && <AddMember members={members} setMembers={setMembers} setShowAddMember={setShowAddMember} />}
        </div>
      </div> 
    </div>
    
  );
}

export default App;
