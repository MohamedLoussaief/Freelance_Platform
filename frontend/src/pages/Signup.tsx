import React, { useState } from 'react';
import UserRole from '../components/organisms/UserRole';
import NavBar from '../components/organisms/NavBar';
import SignupForm from '../components/organisms/SignupForm';
import { UserType } from '../types/models/User';
import AccountCreated from '../components/molecules/AccountCreated';


const Signup: React.FC = ()=>{

const [selectedRole, setSelectedRole] = useState<UserType | undefined>();
const [confirmRole, setConfirmRole] = useState<boolean>(false)
const [success, setSuccess] = useState<boolean>(false)  



return(<>

<NavBar selectedRole={selectedRole} setSelectedRole={setSelectedRole} 
confirmRole={confirmRole} success={success} />

{!confirmRole&&<UserRole selectedRole={selectedRole} 
setSelectedRole={setSelectedRole} 
setConfirmRole={setConfirmRole}
/> }

{(confirmRole && !success)&&<SignupForm selectedRole={selectedRole}
setSuccess={setSuccess} />}


{success&&<AccountCreated/>}

</>)



}

export default Signup