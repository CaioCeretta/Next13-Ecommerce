'use client'

import { useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Link from 'next/link'

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  /* UseForm is a hook to manage state and validation, it returns an object with various methods and properties for form
  management, it takes a generic parameter <FieldValues> which represents the type of the form values, in this case, it's
  ann object with the keys 'name,' email' and 'password'

  the register function is provided by the useForm to register inputs with the form, it connects input elements to the
  form state, enabling form validation and tracking the input values, in this code, it is destructured from the result of
  useForm

  handleSubmit is a function that we pass the <form> elements onSubmit attr, it takes a cb function that will be executed
  when the form is submitted, the cb functionb receives the form data as an argument

  the formState object is an object that contains various properties related to the form state. In this code, we are
  destructuring the errors property from form state, enabling the integration of validations rules, the handleSubmit
  function manages the form submission logic and formState.errors holds the validation errors for each input field
  */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    console.log(data)
  }

  return (
    <>
      <Heading title="Sign up for E-shop" />

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        required
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        label={isLoading ? 'Loading' : 'Sign Up'}
      />
      <p className="text-sm">
        Already have an account?{' '}
        <Link className="underline" href="/login">
          Login
        </Link>
      </p>
      <hr className="h-px w-full bg-slate-300" />
    </>
  )
}

export default RegisterForm
