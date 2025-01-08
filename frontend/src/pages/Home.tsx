import React from 'react';
import NavBar from '../components/organisms/NavBar';
import JobPostCard from '../components/organisms/JobPostCard';
import { useAuthContext } from '../context/AuthContext';

const Home: React.FC = ()=>{

const {user, loading} = useAuthContext()    


if(loading){
    return<></>
}


return( <div>

<NavBar/>


{!user&&<JobPostCard/>}


</div> )

}

export default Home