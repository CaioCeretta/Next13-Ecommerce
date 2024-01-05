'use client'

import { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { SafeUser } from '@/types'

interface LoginFormProps {
  currentUser: SafeUser
}

const LoginForm = ({ currentUser }: LoginFormProps) => {
  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      router.push('/cart')
      router.refresh()
    }
  }, [router, currentUser])

  const [isLoading, setIsLoading] = useState(false)

  console.log(currentUser)

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
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((cb) => {
      setIsLoading(false)
      if (cb?.ok) {
        console.log(cb)
        router.push('/cart')
        router.refresh()
        toast.success('Logged in')
      }

      if (cb?.error) {
        toast.error(cb.error)
      }
    })
  }

  if (currentUser) {
    return <p>Logged in! Redirecting...</p>
  }

  return (
    <>
      <Heading title="Sign in to E-Shop" />
      <Button
        outline
        label="Sign In with Google"
        icon={AiOutlineGoogle}
        onClick={() => signIn('google')}
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
        label={isLoading ? 'Loading' : 'Login'}
      />
      <p className="text-sm">
        Do not have an account?{' '}
        <Link className="underline" href="/register">
          Sign Up
        </Link>
      </p>
      <hr className="h-px w-full bg-slate-300" />
    </>
  )
}

export default LoginForm
