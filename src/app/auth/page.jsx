"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../libs/supbase";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    if (email.length === 0 || password.length === 0) {
      setError(`Please Fill ${email.length === 0 ? "Email" : "Password"}`);
      setLoading(false);
      return;
    }
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Login successful!");
        router.push("/home");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        console.log(data.user.id);
        if (error) throw error;

        const { data: profileData, error: profileError } = await supabase
          .from("user")
          .insert([
            {
              id: data.user.id,
              name,
              email: data.user.email,
            },
          ]);
        console.log(profileData);
        if (profileError) {
          console.log(profileError);
          throw profileError;
        }

        setMessage("Signup successful! Check your email for confirmation.");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/home");
      }
    })();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900/50 to-zinc-700">
      <Card className="w-96 bg-white shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isLogin && (
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          {message && <p className="text-green-500 mt-2">{message}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleAuth}
            className={`w-full ${loading ? "cursor-not-allowed" : ""}`}
          >
            {loading ? "Loading...." : isLogin ? "Login" : "Sign Up"}
          </Button>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
