import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import FlexBetween from '@/Components/FlexBetween';
import Logo from "@/assets/wealthcare-logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import "./style.css";


const Navbar = () => {
  
  const { palette } = useTheme();
  const [ selected, setSelected ] = useState("dashboard");
  const [ isOpen, setIsOpen ] = useState(false);

  
  useEffect(() => {

    const navbar = document.querySelector(".responsive-navbar");
  
    const handleMenuClick = () => {
      navbar?.classList.toggle("active");
    }
    
    document.getElementById("menu-bar")?.addEventListener('click', handleMenuClick);
    
  }, []);
    
  return (
    <FlexBetween mb={"0.25rem"} p={ window.innerWidth > 600 ? "0.5rem 2rem 0.5rem 1.5rem" : "0.5rem 1.25rem 0.5rem .75rem"} borderBottom={"1px solid rgba(255, 255, 255, 0.1)"}>
      
      {/* Left side */}
      <div className="logo">
        <img src={Logo} alt="Wealthcare - Finance Dashboard" />
      </div>
      
      {/* Right side */}
      <FlexBetween gap={"1.5rem"} className='navigate'>
        <Box sx={{ "&:hover" : { color : "#FFF" } }}>
          <Link 
            to={"/"}
            onClick={() => setSelected("dashboard")}
            style={{
              color : selected === "dashboard" ? "#FFF" : palette.grey[700],
              textDecoration : "inherit",
              fontWeight : 600
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover" : { color : "#FFF" } }}>
          <Link 
            to={"/predictions"}
            onClick={() => setSelected("predictions")}
            style={{
              color : selected === "predictions" ? "#FFF" : palette.grey[700],
              textDecoration : "inherit",
              fontWeight : 600
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexBetween>
      
      {/* Right second menu */}
      <FlexBetween className='menu-bar' id='menu-bar' onClick={() => setIsOpen(!isOpen)}>
        <Box sx={{ "&:hover" : { color : "#FFF" } }}>
          <MenuIcon style={{ color : "#FFF", cursor : "pointer", fontSize : "27.5px" }} />
        </Box>
      </FlexBetween>
      
      {
        isOpen &&
        (
          <div className='responsive-navbar '> 
            <Link to = "/" onClick={() => setIsOpen(false)}> Dashboard </Link>
            <Link to= "/predictions" onClick={() => setIsOpen(false)}> Predictions </Link>
          </div>
        )
      }
      
    </FlexBetween>
  )
}

export default Navbar;