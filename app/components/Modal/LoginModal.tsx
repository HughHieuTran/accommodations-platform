"use client"

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input/Input";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    } } = useForm<FieldValues>({
      defaultValues: {
        email: '',
        password: '',
      }
    })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials',
      {
        ...data,
        redirect: false
      })
      .then(callback => {
        setIsLoading(false);
        if (callback?.ok) {
          toast.success('Logged in successfully');
          router.refresh();
          loginModal.onClose();
        }
        if (callback?.error) {
          toast.error('Error logging in');
        }
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" center={false} />
      <Input
        label="Email:"
        id="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        label="Password:"
        type="password"
        id="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
      >
        <p>Don't have an account?
          <span
            onClick={() => { }}
            className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
          > Register</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal