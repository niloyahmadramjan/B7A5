
import { getMe } from "@/service/getMe";
import Navbar from "../_components/Navbar";

const AuthGroupLayout = async (
    { children }: { children: React.ReactNode }) => {

         const userData = await getMe();
        
  return <div>
    <Navbar userData={userData}/>
    {children}
  
  </div>;
};

export default AuthGroupLayout;