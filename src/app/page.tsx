'use client'

import Horizontal from '@/components/horizontal';
import Menu from '@/components/menu';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import { useRef, useEffect, useState, useCallback } from 'react';

export default function Home() {
  const mainRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const { scrollYProgress } = useScroll({
    target: mainRef,
  });

  const useCreateTransforms = (startPoint: number, midPoint: number, endPoint: number) => {
    const width = useTransform(scrollYProgress,
      [0, startPoint, midPoint, endPoint, 1],
      ["1.25rem", "1.25rem", "2rem", "1.25rem", "1.25rem"]
    );
    const opacity = useTransform(scrollYProgress,
      [0, startPoint, midPoint, endPoint, 1],
      [0.3, 0.3, 1, 0.3, 0.3]
    );
    return { width, opacity };
  };

  const transforms = Array.from({ length: 16 }, (_, i) => {
    const segment = 1 / 16;
    const start = Math.max(0, (i - 1) * segment);
    const mid = i * segment;
    const end = Math.min(1, (i + 2) * segment);
    return useCreateTransforms(start, mid, end);
  });

  // const handleMouseDown = useCallback((e) => {
  //   setIsDragging(true);
  //   e.preventDefault();
  // }, []);

  // const handleMouseUp = useCallback(() => {
  //   setIsDragging(false);
  // }, []);

  // const handleMouseMove = useCallback((e) => {
  //   if (!isDragging || !scrollbarRef.current) return;

  //   const scrollbarRect = scrollbarRef.current.getBoundingClientRect();
  //   const scrollPercentage = (e.clientY - scrollbarRect.top) / scrollbarRect.height;
  //   const scrollTarget = scrollPercentage * (document.documentElement.scrollHeight - window.innerHeight);

  //   window.scrollTo({
  //     top: scrollTarget,
  //     behavior: 'auto'
  //   });
  // }, [isDragging]);

  // useEffect(() => {
  //   const scrollbar = scrollbarRef.current;
  //   if (!scrollbar) return;

  //   scrollbar.addEventListener('mousedown', handleMouseDown);
  //   window.addEventListener('mouseup', handleMouseUp);
  //   window.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     scrollbar.removeEventListener('mousedown', handleMouseDown);
  //     window.removeEventListener('mouseup', handleMouseUp);
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, [handleMouseDown, handleMouseUp, handleMouseMove]);

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main ref={mainRef} className="relative">
      <header className="fixed py-5 h-full flex items-center justify-between flex-col w-20 left-0 z-50">
        <div className='text-neutral-800'>Logo</div>
        <div
          ref={scrollbarRef}
          className="flex flex-col items-center justify-center gap-y-2 cursor-grab active:cursor-grabbing"
          style={{ height: 'auto', touchAction: 'none' }}
        >
          {transforms.map(({ width, opacity }, index) => (
            <motion.span
              key={index}
              className='h-[2px] bg-neutral-800 w-full'
              style={{ width, opacity }}
            ></motion.span>
          ))}
        </div>
        <div><Menu /></div>
      </header>
      <Horizontal />
    </main>
  );
}