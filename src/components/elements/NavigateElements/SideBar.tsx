import React from "react";
import {
  Card,
  Typography,
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
import { ChevronRightIcon, ChevronDownIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function SideBar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card placeholder="" className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-lg justify-around">
      <div className="mt-5 p-3 ">
        <RocketLaunchIcon className="mb-4 h-12 w-12 text-primary/80" />
        <h3 className="mb-1 text-lg text-primary font-semibold">
          Delivery manager
        </h3>
        <p className="font-normal text-gray-500">
          This application manages your orders, products and gives you data of the orders delivered on the day.
        </p>
      </div>
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
      <div className=" p-3 ">
        <h3 className="mb-1 text-lg text-center text-primary font-normal">
          Developed by
        </h3>
        <p className="font-normal text-center text-gray-500">
          Márlon Sánchez
        </p>
        <p className="font-normal text-center text-gray-500">
          marlonsanchezal@gmail.com
        </p>
      </div>
    </Card>
  );
}