import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ isOpen }) => (
  <motion.ul
    variants={variants}
    className={`mobul text-cream ${isOpen ? "block" : "hidden"}`}
  >
    <MenuItem link={"Home"} href={"/"} />
    <MenuItem link={"Products"} href={"/products"} />
    <MenuItem link={"Cart"} href={"/cart"} />
    <MenuItem link={"Login"} href={"/"} />
  </motion.ul>
);
