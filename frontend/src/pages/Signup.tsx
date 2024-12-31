import React, { useState } from 'react';
import UserRole from '../components/organisms/UserRole';
import NavBar from '../components/organisms/NavBar';
import SignupForm from '../components/organisms/SignupForm';
import { UserType } from '../types/models/User';




const Signup: React.FC = ()=>{

const [selectedRole, setSelectedRole] = useState<UserType | undefined>();
const [confirmRole, setConfirmRole] = useState<boolean>(false)


return(<>

<NavBar selectedRole={selectedRole} setSelectedRole={setSelectedRole} confirmRole={confirmRole} />

{!confirmRole&&<UserRole selectedRole={selectedRole} 
setSelectedRole={setSelectedRole} 
setConfirmRole={setConfirmRole}
/> }

{confirmRole&&<SignupForm selectedRole={selectedRole}  />}


</>)



}

export default Signup