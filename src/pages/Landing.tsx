import Header from "../components/Header"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase as supabaseClient } from '../services/supabaseConfig';
import { Session } from '@supabase/supabase-js';

export default function Landing() {
  
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>()
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    void supabaseClient.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setSession(session)
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    supabaseClient.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="overflow-hidden h-screen bg-white">
      {
        !session ? <>
          <div className="">
            
            <div className="relative isolate px-6 pt-14 lg:px-8">
            <Header />
              <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
              <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Unlock Your Academic Potential: Calculate Grades, Achieve Success
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                  Your pathway to academic excellence starts here, where grades are not just numbers but stepping stones to your success journey!
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to="/login" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Get started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </> : <>{navigate("/dashboard")}</>
      }
    </div>
  );
}
