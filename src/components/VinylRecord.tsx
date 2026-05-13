'use client';

import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

export default function VinylRecord() {
  const [isOpen, setIsOpen] = useState(false);
  const constraintsRef = useRef(null);

  // 1. 드래그 거리(x축)를 추적할 MotionValue 생성
  const x = useMotionValue(0);

  // 2. x축 이동 거리(-100 ~ 100)를 회전 각도(-45도 ~ 45도)로 매핑
  const rotate = useTransform(x, [-100, 100], [-45, 45]);
  const openAnimate = {
    bbb: { x: 40, y: 40, opacity: 0 },
    aaa: { x: 60, y: 60, opacity: 1 },
  };
  return (
    <>
      <button onClick={() => setIsOpen(prev => !prev)}>Open</button>
      <div className="fixed p-10 right-0 bottom-0">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="w-20 h-20 bg-amber-100"
              initial={{ x: 0, y: 80, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: 0, y: 80, opacity: 0 }}
              transition={{ ease: 'circInOut', duration: 1 }}
            ></motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div className="w-full h-screen flex justify-center items-start pt-20">
        <motion.div
          className="w-4 h-50 bg-amber-200 rounded-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragMomentum={false}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.6} // 팽팽한 느낌을 줌
          style={{
            x,
            rotate,
            originY: 0, // 핵심: 회전축을 상단(0)으로 고정
            originX: 0, // 핵심: 회전축을 상단(0)으로 고정
          }}
        />
      </motion.div>
    </>
  );
}
