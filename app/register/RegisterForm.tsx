'use client'

import { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

import Button from '../components/Button'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/types'

interface RegisterFormProps {
  currentUser: SafeUser
}

const RegisterForm = ({ currentUser }: RegisterFormProps) => {
  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      router.push('/cart')
    }
  }, [currentUser, router])

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

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Account Created')

        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push('/cart')
            router.refresh()
            toast.success('Logged in')
          }

          if (callback?.error) {
            toast.error(callback.error)
          }
        })
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Heading title="Sign up for E-shop" />
      <Button
        outline
        label="Sign Up with Google"
        icon={AiOutlineGoogle}
        onClick={() => signIn('google')}
      />
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
