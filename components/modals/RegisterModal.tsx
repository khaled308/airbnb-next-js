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
      <input type="text" required {...register("name")} />
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
      <button className="relative btn btn-outline">
        <FcGoogle size={24} className="absolute left-4 top-4" />
        <span>Continue with Google</span>
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
      .post("/api/register", data)
      .then(() => {
        registerModal.close();
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.");
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
