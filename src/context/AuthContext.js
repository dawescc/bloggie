import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/utils/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);