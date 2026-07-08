'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="83623972046-cdtu530orj7ir23cq4mphmkppaphni21.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
