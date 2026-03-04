// @ts-nocheck

'use client';

import React, { type JSX } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right';

// Her kelime / harf arasında organik, nefes alan bir gecikme
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,   // önceki 0.1 → biraz daha akıcı
      delayChildren: 0.05,
    },
  },
};

// Yön bazlı animasyon — yumuşak cubic-bezier, hafif scale ile
const generateVariants = (
  direction: Direction
): { hidden: any; visible: any } => {
  const axis  = direction === 'left' || direction === 'right' ? 'X' : 'Y';
  // Önceki ±100 → ±32 — daha kısa mesafe, daha zarif
  const value = direction === 'right' || direction === 'down' ? 32 : -32;

  return {
    hidden: {
      filter:               'blur(6px)',
      opacity:              0,
      [`translate${axis}`]: value,
      scale:                0.94,
    },
    visible: {
      filter:               'blur(0px)',
      opacity:              1,
      [`translate${axis}`]: 0,
      scale:                1,
      transition: {
        duration: 0.6,
        // Başta hızlı, sonda yavaş — çiçeğin açılması gibi
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

const defaultViewport = { amount: 0.25, margin: '0px 0px 0px 0px' };

const TextAnimation = ({
  as = 'h1',
  text,
  classname = '',
  viewport = defaultViewport,
  variants,
  direction = 'down',
  letterAnime = false,
  lineAnime = false,
}: {
  text: string;
  classname?: string;
  as?: keyof JSX.IntrinsicElements;
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  variants?: {
    hidden?: any;
    visible?: any;
  };
  direction?: Direction;
  letterAnime?: boolean;
  lineAnime?: boolean;
}) => {
  const baseVariants = variants || generateVariants(direction);
  const modifiedVariants = {
    hidden:  baseVariants.hidden,
    visible: { ...baseVariants.visible },
  };

  const MotionComponent = motion[
    as as keyof typeof motion
  ] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <MotionComponent
      whileInView="visible"
      initial="hidden"
      variants={containerVariants}
      viewport={viewport}
      className={cn('inline-block uppercase', classname)}
    >
      {lineAnime ? (
        // Tek satır — tüm metin bir bütün olarak yüzer
        <motion.span className="inline-block" variants={modifiedVariants}>
          {text}
        </motion.span>
      ) : (
        <>
          {text.split(' ').map((word: string, index: number) => (
            <motion.span
              key={index}
              className="inline-block"
              variants={letterAnime === false ? modifiedVariants : {}}
            >
              {letterAnime ? (
                <>
                  {word.split('').map((letter: string, letterIndex: number) => (
                    <motion.span
                      key={letterIndex}
                      className="inline-block"
                      variants={modifiedVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  &nbsp;
                </>
              ) : (
                <>{word}&nbsp;</>
              )}
            </motion.span>
          ))}
        </>
      )}
    </MotionComponent>
  );
};

export default TextAnimation;