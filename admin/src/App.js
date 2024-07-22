import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import React, { createContext, useEffect, useState, useRef } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import Category from "./pages/Category/categoryList";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/Products/addProduct";
import EditProduct from "./pages/Products/editProduct";
import CategoryAdd from "./pages/Category/addCategory";
import EditCategory from "./pages/Category/editCategory";
import SubCatAdd from "./pages/Category/addSubCat";
import SubCatList from "./pages/Category/subCategoryList";
import EditSubCategory from "./pages/Category/editSubCat";
import AddProductRAMS from "./pages/Products/addProductRAMS";
import ProductWeight from "./pages/Products/addProductWeight";
import ProductSize from "./pages/Products/addProductSize";
import Orders from "./pages/Orders";
import AddHomeBannerSlide from "./pages/HomeBanner/addHomeSlide";
import HomeBannerSlideList from "./pages/HomeBanner/homeSlideList";
import EditHomeBannerSlide from "./pages/HomeBanner/editSlide";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import LoadingBar from "react-top-loading-bar";
import { fetchDataFromApi } from "./utils/api";

import axios from "axios";

const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [catData, setCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  });

  const [baseUrl, setBaseUrl] = useState(
    "https://fullstackecommerce-ser.onrender.com"
  );

  const [progress, setProgress] = useState(0);
  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: false,
    open: false,
  });

  const [selectedLocation, setSelectedLocation] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setselectedCountry] = useState("");

  useEffect(() => {
    const theme_Mode = localStorage.getItem("themeMode");

    if (themeMode === true) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    }
  }, [themeMode]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));

      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountryList(res.data.data);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertBox({
      open: false,
    });
  };

  useEffect(() => {
    setProgress(20);
    fetchCategory();
    fetchSubCategory();
  }, []);

  const fetchCategory = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      setProgress(100);
    });
  };

  const fetchSubCategory = () => {
    fetchDataFromApi("/api/subCat").then((res) => {
      setSubCatData(res);
      setProgress(100);
    });
  };

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    alertBox,
    setAlertBox,
    setProgress,
    baseUrl,
    catData,
    fetchCategory,
    subCatData,
    fetchSubCategory,
    setUser,
    user,
    countryList,
    selectedCountry,
    setselectedCountry,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          className="topLoadingBar"
        />

        <Snackbar
          open={alertBox.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            autoHideDuration={6000}
            severity={alertBox.error === false ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>

        {isHideSidebarAndHeader !== true && <Header />}
        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <div
              className={`sidebarWrapper ${
                isToggleSidebar === true ? "toggle" : ""
              }`}
            >
              <Sidebar />
            </div>
          )}

          <div
            className={`content ${isHideSidebarAndHeader === true && "full"} ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route path="/login" exact={true} element={<Login />} />
              <Route path="/signUp" exact={true} element={<SignUp />} />
              <Route path="/products" exact={true} element={<Products />} />
              <Route
                path="/product/details/:id"
                exact={true}
                element={<ProductDetails />}
              />
              <Route
                path="/product/upload"
                exact={true}
                element={<ProductUpload />}
              />
              <Route
                path="/product/edit/:id"
                exact={true}
                element={<EditProduct />}
              />
              <Route path="/category" exact={true} element={<Category />} />
              <Route
                path="/category/add"
                exact={true}
                element={<CategoryAdd />}
              />
              <Route
                path="/category/edit/:id"
                exact={true}
                element={<EditCategory />}
              />
              <Route
                path="/subCategory/"
                exact={true}
                element={<SubCatList />}
              />
              <Route
                path="/subCategory/add"
                exact={true}
                element={<SubCatAdd />}
              />
              <Route
                path="/subCategory/edit/:id"
                exact={true}
                element={<EditSubCategory />}
              />
              <Route
                path="/productRAMS/add"
                exact={true}
                element={<AddProductRAMS />}
              />
              <Route
                path="/productWEIGHT/add"
                exact={true}
                element={<ProductWeight />}
              />
              <Route
                path="/productSIZE/add"
                exact={true}
                element={<ProductSize />}
              />
              <Route path="/orders/" exact={true} element={<Orders />} />
              <Route
                path="/homeBannerSlide/add"
                exact={true}
                element={<AddHomeBannerSlide />}
              />
              <Route
                path="/homeBannerSlide/list"
                exact={true}
                element={<HomeBannerSlideList />}
              />
              <Route
                path="/homeBannerSlide/edit/:id"
                exact={true}
                element={<EditHomeBannerSlide />}
              />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
