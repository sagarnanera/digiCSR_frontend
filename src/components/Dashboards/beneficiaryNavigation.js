import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "../../CSS/ComCss.module.css";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const BenificiaryNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("BeneficiaryAuthToken");
    navigate("/", { replace: true });
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Company Dashboard</div>
      <nav>
        <ul className={classes.nav}>
          <li>
            <Link
              to="/Beneficiary"
              className={
                location.pathname === "/Beneficiary" ? classes.active : ""
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Beneficiary/NGOBlogs"
              className={
                location.pathname === "/Beneficiary/NGOBlogs"
                  ? classes.active
                  : ""
              }
            >
              Media Section
            </Link>
          </li>
          <li>
            <Menu>
              <MenuButton
                as={Avatar}
                size="sm"
                src="https://bit.ly/broken-link"
              />
              <MenuList>
                <Link to="/Beneficiary/profile">
                  <MenuItem>Show Company Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleClick}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BenificiaryNavigation;
