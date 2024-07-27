import { useAuthContext } from "@/Supabase/AuthContext";
import LeftSideNav from "./Nav/LeftSideNav";
import TopNav from "./Nav/TopNav";
import LogIn from "./Profile/LogIn";
import { ToastContainer } from "react-toastify";

function RootHome() {
  const { session, isLoading, fakeUser } = useAuthContext();
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <img
          src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
          alt=""
        />
      </div>
    );
  return (
    <div>
      <TopNav />
      <LeftSideNav />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );

  // if (session) return (
  //   <div >
  //     <TopNav />
  //     <LeftSideNav />
  //     <ToastContainer
  //       position="bottom-right"
  //       autoClose={5000}
  //       hideProgressBar={false}
  //       newestOnTop={false}
  //       closeOnClick
  //       rtl={false}
  //       pauseOnFocusLoss
  //       draggable
  //       pauseOnHover
  //       theme="light"
  //       transition:Bounce
  //     />
  //   </div>
  // )
  // return <LogIn />
}
export default RootHome;
