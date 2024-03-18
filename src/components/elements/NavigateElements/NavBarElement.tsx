import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TbSunset2, TbMoonStars } from "react-icons/tb";
import { Link } from "react-router-dom";

function NavbarElement() {

  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(0);
  const [greeting, setGreeting] = useState<string>("")
  const [subtitle, setSubtitle] = useState<string>("")
  const [dayIcon, setDayIcon] = useState<boolean>(false);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  useEffect(() => {
    //Obteniendo la hora actual del sistema
    const currentTime = new Date().getHours();

    //Establecer un rango de horas para considerar en que momento del día se está
    const startday = 6; // am
    const startnight = 18 // pm

    //Verificando si es de día o de noche
    const time = currentTime >= startday && currentTime < startnight;

    if (time) {
      setDayIcon(time)
      setGreeting("Good Morning")
      setSubtitle("What deliveries do we have for today?")
    } else {
      setDayIcon(time)
      setGreeting("Good Evening")
      setSubtitle("Where are we going tomorrow?")
    }

  }, [])

  function IconDay() {
    if (dayIcon) {
      return (
        <TbSunset2 size={60} className="bg-yellow-500 rounded-full p-2" color="white" />
      )
    } else {
      return (
        <TbMoonStars size={60} className="bg-gray-500 rounded-full p-2" color="white" />
      )
    }
  }

  function NavList() {
    return (
      <List placeholder="">
        <Accordion
          placeholder=""
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem placeholder="" className="p-0" selected={open === 1}>
            <AccordionHeader placeholder="" onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix placeholder="">
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography placeholder="" color="blue-gray" className="mr-auto font-normal">
                Orders
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List placeholder="" className="p-0">
              <Link to="/">
                <ListItem placeholder="">
                  <ListItemPrefix placeholder="">
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  List
                </ListItem>
              </Link>
              <Link to="/order/create">
                <ListItem placeholder="">
                  <ListItemPrefix placeholder="">
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Create
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          placeholder=""
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem placeholder="" className="p-0" selected={open === 2}>
            <AccordionHeader placeholder="" onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix placeholder="">
                <BuildingStorefrontIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography placeholder="" color="blue-gray" className="mr-auto font-normal">
                Products
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List placeholder="" className="p-0">
              <Link to="/products/">
                <ListItem placeholder="">
                  <ListItemPrefix placeholder="">
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  List
                </ListItem>
              </Link>
              <Link to="/products/create">
                <ListItem placeholder="">
                  <ListItemPrefix placeholder="">
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Create
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    );
  }


  return (

    <Navbar placeholder="" className="mx-auto h-max max-w-screen-xl sticky top-0 z-10 px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex flex-row gap-3">
          <IconDay />
          <div className="">
            <h3 className=" font-medium text-xl text-primary">
              {greeting}
            </h3>
            <p className="font-normal text-gray-600">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="hidden lg:block">

        </div>
        <IconButton
          placeholder=""
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="mt-5">
          <NavList />
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarElement;