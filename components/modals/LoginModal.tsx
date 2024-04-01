"use client";
import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "./Modal";
import Input from "../form/Input";
import { loginSchema } from "@/schemas/userSchemas";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Content = ({ register, errors }: InputProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Welcome to Airbnb</h2>
        <p className="font-light text-neutral-500 mt-2">
          Login to your account!
        </p>
      </div>
      <Input
        id="email"
        required
        type="email"
        label="email"
        errors={errors}
        register={register}
      />
      <Input
        id="password"
        required
        type="password"
        label="password"
        errors={errors}
        register={register}
      />
    </div>
  );
};

const Footer = () => {
  return (
    <div className="space-y-4 mt-3">
      <button
        className="relative btn btn-outline"
        onClick={() => signIn("google")}
      >
        <FcGoogle size={24} className="absolute left-4 top-4" />
        <span>Continue with Google</span>
      </button>
      <button
        className="relative btn btn-outline"
        onClick={() => signIn("github")}
      >
        <FaGithub size={24} className="absolute left-4 top-4" />
        <span>Continue with Github</span>
      </button>
      <div className="text-neutral-500 font-light text-center mt-4">
        <p>
          Already have an account?{" "}
          <span className="text-neutral-800 cursor-pointer hover:underline">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((cb) => {
      setIsLoading(false);

      if (cb?.ok) {
        loginModal.close();
        router.refresh();
        toast.success("Logged in successfully");
      }

      if (cb?.error) {
        toast.error("Invalid email or password");
      }
    });
  };

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.close}
      title="Login"
      actionLabel="Login"
      onSubmit={handleSubmit(onSubmit)}
      body={<Content register={register} errors={errors} />}
      footer={<Footer />}
    />
  );
};

export default LoginModal;
