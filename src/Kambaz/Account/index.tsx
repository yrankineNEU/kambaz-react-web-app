import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import Users from "./Users";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ marginRight: "20px" }}>
          <AccountNavigation />
        </div>
        <div style={{ flex: 1, maxWidth: "400px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    currentUser
                      ? "/Kambaz/Account/Profile"
                      : "/Kambaz/Account/Signin"
                  }
                />
              }
            />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Users/:uid" element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
