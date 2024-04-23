import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";

const Card = ({tittle,desc,image}) => {
  return (
      <TiltCard tittle={tittle} desc={desc} image={image} />
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({tittle,desc,image}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-[90vw] mx-auto lg:w-72  bg-purpleShade rounded-xl to-violet-300"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute hover:bg-theme/40 hover:text-white inset-3 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        <img
         style={{
            transform: "translateZ(50px)",
          }}
        className="w-40" src={image}/>
        <p
          style={{
            transform: "translateZ(50px)",
          }}
          className="text-center text36  font-semibold py-2"
        >
          {tittle}
        </p>

        <p className="mt-2">{desc}</p>
      </div>
    </motion.div>
  );
};

export default Card;