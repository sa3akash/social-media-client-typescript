// import MessangerPage from "@/components/messanger/MessangerPage";
import { lazy, Suspense } from "react";

const MessangerPage = lazy(() => import('@/components/messanger/MessangerPage'))

const Messanger = () => {
  return (
    <section className='w-full h-[calc(100%-70px)] md:h-full cardBG'>
      <Suspense fallback={<div>Loading...</div>}>
        <MessangerPage />
      </Suspense>
    </section>
  )
}

export default Messanger