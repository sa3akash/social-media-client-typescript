import CommentTree from "./test/comment-tree"

import { useEffect, useRef } from "react"

const Test = () => {

  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(()=>{
    const container = containerRef.current;
    if(!container) return;


    const scrollerHandler = () => {
      console.log('scrolling');
      console.log(container.scrollTop);
    }

    container.addEventListener('scroll', scrollerHandler);
    return () => {
      container.removeEventListener('scroll', scrollerHandler);
    }

  },[])

  return (
    <main className="container mx-auto py-8 flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-8">Enhanced Nested Comment System</h1>
      <CommentTree />

    </main>
  )
}

export default Test