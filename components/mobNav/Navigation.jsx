import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const variants1 = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const Navigation = ({ isOpen }) => {
  const { data: session } = useSession();
  return (
    <>
      <motion.ul
        variants={variants}
        className={`mobul text-cream ${isOpen ? "block" : "hidden"}`}
      >
        <MenuItem link={"Home"} href={"/"} />
        <MenuItem link={"Products"} href={"/products"} />
        <MenuItem link={"Cart"} href={"/cart"} />
        {session?.user ? (
          <>
            <motion.li
              className="moblist"
              variants={variants1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/">
                <h1 className="text-2xl">My Prof|le</h1>
              </Link>
            </motion.li>
            <motion.li
              className="moblist"
              variants={variants1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="button"
                onClick={() => signOut()}
                className="bg-brown text-cream px-2 py-2 rounded-lg"
              >
                Sign Out
              </button>
            </motion.li>
          </>
        ) : (
          <motion.li
            className="moblist"
            variants={variants1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/login">
              <h1 className="text-2xl">Login</h1>
            </Link>
          </motion.li>
        )}
      </motion.ul>
    </>
  );
};
