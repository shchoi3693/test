'use client';

import { animate, motion, PanInfo, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import TurntablePin from './TurntablePin';

export default function Turntable() {
  return (
    <>
      <TurntablePin />
    </>
  );
}
