"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { googleLogin } from "@/features/authSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleLoginButton() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const nextUrl = searchParams.get("next") || "/";

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="flex flex-col items-center gap-4">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (credentialResponse.credential) {
              try {
                await dispatch(googleLogin(credentialResponse.credential)).unwrap();
                router.push(nextUrl); // Redirect to 'next' or home
              } catch (err) {
                console.error("Login failed:", err);
              }
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        {loading && <p className="text-blue-500">Logging in...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </GoogleOAuthProvider>
  );
}