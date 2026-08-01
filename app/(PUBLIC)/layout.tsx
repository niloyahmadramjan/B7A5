import { getMe } from "@/service/getMe";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const userData = await getMe();

  return (
    <div>
      <Navbar userData={userData} />
      {children}
       <Footer/>
    </div>
  );
};

export default PublicLayout;
