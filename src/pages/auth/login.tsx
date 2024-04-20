import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase} from '../../services/supabaseConfig';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const [session, setSession] = useState<Session | null>()
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    void supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setSession(session)
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setSession(session)
    })
  }, [])

  return (
    <>
            {
              !session ? <>
                <div className="mx-auto max-w-md py-16 sm:py-16 lg:py-16">
                  <Auth supabaseClient={supabase}
                    appearance={{
                      theme: ThemeSupa,
                      variables: {
                        default: {
                          colors: {
                            brand: '#a991f7',
                            brandAccent: '#37cdbe',
                            inputText: '',
                            defaultButtonBackground: '',
                          },
                          space: {
                            inputPadding: '10px 15px',
                          },

                        },
                      },

                    }} />
                </div>
              </> : <>
                {navigate("/dashboard")}
              </>
            }
    </>
  );
}

export default Login;