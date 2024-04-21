import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast";

import Addmenu from "./components/addmenu/Addmenu";
import Dashboard from "./components/dashboard/Dashboard";
import Login from './components/Login'
import Chef from "./components/chefmode/Chef";
import MenuFirstPage from "./components/usermode/MenuFirstPage";
import Foodmenu from "./components/usermode/Foodmenu";
import ItemDetailInfo from "./components/usermode/ItemDetailInfo";
import Cart from "./components/usermode/Cart";
import MangeQRCode from "./components/dashboard/MangeQRCode";
import Admin from "./components/Admin";
import YourOrder from "./components/usermode/YourOrder";

function App(){
  
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={ <Login />} />
          <Route path="/admin" element={ <Admin /> }>
            <Route path="dashboard" element={ <Dashboard />} />
            <Route path="addmenu" element={ <Addmenu /> } />
            <Route path="chef" element={ <Chef /> } />
            <Route path="manageQRCode" element={ <MangeQRCode /> } />
          </Route>
          <Route path="/user/menufirstpage/:table/:token" element={ <MenuFirstPage /> } />
          <Route path="/user/foodmenu" element={ <Foodmenu /> } />
          <Route path="/user/itemdetailinfo" element={ <ItemDetailInfo /> } />
          <Route path="/user/cart" element={ <Cart /> } />
          <Route path="/user/yourorder" element={ <YourOrder /> } />
          <Route path="*" element={<h1>404 Page Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
