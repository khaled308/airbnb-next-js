"use client";
import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "./Modal";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import Input from "../form/Input";
import { registerSchema } from "@/schemas/userSchemas";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Content = ({ register, errors }: InputProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Welcome to Airbnb</h2>
        <p className="font-light text-neutral-500 mt-2">Create an account!</p>
      </div>

      <Input
        id="name"
        required
        label="name"
        errors={errors}
        register={register}
      />
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
      <button className="relative btn btn-outline" onClick={()=> signIn('google')}>
        <FcGoogle size={24} className="absolute left-4 top-4" />
        <span>Continue with Google</span>
      </button>
      <button className="relative btn btn-outline" onClick={()=> signIn('github')}>
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

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data, errors);

    axios
      .post("/api/auth/register", data)
      .then(() => {
        toast.success("Account created successfully!");
        router.refresh();
        registerModal.close();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.close}
      title="Sign Up"
      actionLabel="Sign Up"
      onSubmit={handleSubmit(onSubmit)}
      body={<Content register={register} errors={errors} />}
      footer={<Footer />}
    />
  );
};

export default RegisterModal;
