import { motion } from "framer-motion";

import Link from "next/link";

const variants = {
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

export const MenuItem = ({ link, href }) => {
  return (
    <>
      <motion.li
        className="moblist"
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href={href}>
          <h1 className="text-2xl">{link}</h1>
        </Link>
      </motion.li>
    </>
  );
};
