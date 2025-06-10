import { Routes, Route, Navigate } from "react-router";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";

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
          </Routes>
        </div>
      </div>
    </div>
  );
}
