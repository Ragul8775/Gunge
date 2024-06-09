"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [providers, setProviders] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are necessary.");
      return;
    }
    // Handle custom email/password sign in here
  };

  useEffect(() => {
    if (session) {
      const redirectUrl = decodeURIComponent(callbackUrl);
      router.push(redirectUrl);
    }
  }, [session, callbackUrl, router]);

  return (
    <main className="bg-productBg h-screen flex items-center justify-center p-16">
      <div className="grid box-animate w-full h-full grid-cols-1 bg-creamLight md:grid-cols-2 max-w-[900px]">
        <div className="bg-brown text-cream flex items-center justify-center flex-col ">
          <div className="my-4 w-full px-10">
            <h1 className="font-grunge font-bold text-3xl">Login</h1>
            <p className="text-xs font-mono">Embrace the raw intensity </p>
          </div>
          <form className="w-full px-10" onSubmit={handleSubmit}>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  variant="outline"
                  onClick={() => signIn(provider.id, { callbackUrl })}
                  className="text-brown flex items-center w-full gap-4 font-semibold hover:opacity-90 mb-2"
                >
                  <FcGoogle />
                  Sign In with {provider.name}
                </Button>
              ))}
            <div className="flex justify-between items-center w-full gap-1">
              <hr className="w-full" />
              <p className="text-center font-mono">or</p>
              <hr className="w-full" />
            </div>
            <Label htmlFor="email">Email*</Label>
            <Input
              className="mt-2 mb-4 focus:ring-brown focus:border-brown text-black font-semibold"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="@gmail.com"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              className="mt-2 mb-4 focus:ring-brown focus:border-brown text-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              placeholder="•••••••••"
            />
            {error && (
              <div className="text-red-500 font-mono cursor-pointer">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className={`w-full mt-6 bg-cream font-grunge text-xl text-brown hover:bg-darkCream ${
                error ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Login
            </Button>
            <p className="text-xs text-center mt-2 opacity-80">
              &copy; 2024 all rights reserved{" "}
            </p>
          </form>
        </div>
        <div className="hidden md:block relative">
          <Image
            className="object-cover"
            src="/assets/images/login1.jpg"
            fill={true}
            alt="Login"
          />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
