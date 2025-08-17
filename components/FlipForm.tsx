



'use client'
import React, {useEffect, useState} from 'react'
import CardLoginForm from "@/components/CardLoginForm";
import CardSignUpForm from "@/components/CardSignUpForm";
import { motion } from "motion/react"

const FlipForm = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const[direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
    const handleClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }
    const findDirection =(w:number) =>  {
        if(w >= 768){
            setDirection("horizontal") ;
        }else {
            setDirection("vertical") ;
        }
    };
    useEffect(() => {
        const handleResize = () => findDirection(window.innerWidth);

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    },)

    const variants = {
        horizontal: {
            visible: { rotateY: 0, rotateX: 0 },
            hidden: { rotateY: 180,rotateX: 0 },
        },
        vertical: {
            visible: { rotateX: 0 ,rotateY:0},
            hidden: { rotateX: 180 ,rotateY:0},
        },
    };



    return (
        <div className="w-screen h-[90vh] md:h-[70vh] flex items-center justify-center relative mb-10 md:mb-4">
            <motion.div

                variants={variants[direction]}
                initial="visible"
                animate={isFlipped ? "hidden" : "visible"}
                transition={{ duration: 0.8 }}
                className='backface-hidden absolute'
            >
                <CardLoginForm onClick={handleClick} />
            </motion.div>

            <motion.div

                variants={variants[direction]}
                initial="hidden"
                animate={isFlipped ? "visible" : "hidden"}
                transition={{ duration: 0.8 }}
                className='backface-hidden absolute'
            >
                <CardSignUpForm onClick={handleClick} />
            </motion.div>
        </div>
    );
};

export default FlipForm
