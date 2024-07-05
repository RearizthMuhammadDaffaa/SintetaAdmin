import {BrowserRouter,Route,Routes} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./component/Login"
import Users from "./pages/Users"

import AddUser from "./pages/AddUser"
import EditUser from "./pages/EditUser"
import AuthProvider from "./Context/AuthProvider"
import PrivateRoute from "./Context/PrivateRoute"
import Classlist from "./component/Classlist"
import Class from "./pages/Class"
import AddKelas from "./pages/AddKelas"
import EditKelas from "./pages/EditKelas"
import Facility from "./pages/Facility"
import FormAddFacility from "./component/FormAddFacility"
import FormEditFacility from "./component/FormEditFacility"
import Program from "./pages/Program"
import FormAddProgramList from "./component/FormAddProgramList"
import FormEditProgram from "./component/FormEditProgram"
import Kelolosan from "./pages/Kelolosan"
import AddKelolosan from "./pages/AddKelolosan"
import FormEditKelolosan from "./component/FormEditKelolosan"
import EditKelolosan from "./pages/EditKelolosan"
import Office from "./pages/Office"
import AddOffice from "./pages/AddOffice"
import EditOffice from "./pages/EditOffice"
import Buletin from "./pages/Buletin"
import AddBuletin from "./pages/AddBuletin"
import EditBuletin from "./pages/EditBuletin"
import Testimonial from "./pages/Testimonial"
import AddTestimonial from "./pages/AddTestimonial"
import EditTestimonial from "./pages/EditTestimonial"
import Congratulations from "./pages/Congratulations"
import AddCongratulations from "./pages/AddCongratulations"
import EditCongratulations from "./pages/EditCongratulations"
import ForgetPassword from "./component/ForgetPassword"
import ConfirmPassword from "./component/ConfirmPassword"
import PromoList from "./component/PromoList"
import Promo from "./pages/Promo"
import AddPromo from "./pages/AddPromo"
import EditPromo from "./pages/EditPromo"
function App() {
  

  return (
    <div>
      <BrowserRouter>
        <AuthProvider> {/* Move AuthProvider inside BrowserRouter */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/confirm-password" element={<ConfirmPassword />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
              <Route path="/class" element={<Class />} />
              <Route path="/class/add" element={<AddKelas />} />
              <Route path="/class/edit/:id" element={<EditKelas />} />
              <Route path="/facility" element={<Facility />} />
              <Route path="/facility/add" element={<FormAddFacility />} />
              <Route path="/facility/edit/:id" element={<FormEditFacility />} />
              {/* <Route path="/program" element={<Program />} />
              <Route path="/program/add" element={<FormAddProgramList />} />
              <Route path="/program/edit/:id" element={<FormEditProgram />} /> */}
              <Route path="/kelolosan" element={<Kelolosan />} />
              <Route path="/kelolosan/add" element={<AddKelolosan />} />
              <Route path="/kelolosan/edit/:id" element={<EditKelolosan />} />
              <Route path="/office" element={<Office />} />
              <Route path="/office/add" element={<AddOffice />} />
              <Route path="/office/edit/:id" element={<EditOffice />} />
              <Route path="/buletin" element={<Buletin />} />
              <Route path="/buletin/add" element={<AddBuletin />} />
              <Route path="/buletin/edit/:id" element={<EditBuletin />} />
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/testimonial/add" element={<AddTestimonial />} />
              <Route path="/testimonial/edit/:id" element={<EditTestimonial />} />
              <Route path="/congratulations" element={<Congratulations />} />
              <Route path="/congratulations/add" element={<AddCongratulations />} />
              <Route path="/congratulations/edit/:id" element={<EditCongratulations />} />
              <Route path="/promo" element={<Promo />} />
              <Route path="/promo/add" element={<AddPromo />} />
              <Route path="/promo/edit/:id" element={<EditPromo />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
