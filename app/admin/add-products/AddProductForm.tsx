'use client'

import Heading from '@/app/components/Heading'
import CategoryInput from '@/app/components/inputs/CategoryInput'
import CustomCheckbox from '@/app/components/inputs/CustomCheckBox'
import Input from '@/app/components/inputs/Input'
import TextArea from '@/app/components/inputs/TextArea'
import { categories } from '@/utils/categories'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      images: [],
      category: '',
      inStock: false,
      brand: '',
    },
  })

  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        type="number"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="category"
        label="Category"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        label="This Product is in Stock"
        register={register}
      />

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select Category</div>
        <div className="grid max-h-[50vh] grid-cols-2 overflow-y-auto md:grid-cols-3">
          {categories.map((category) => {
            if (category.label === 'All') {
              return null
            }

            return (
              <CategoryInput
                icon={category.icon}
                label={category.label}
                onClick={() => {}}
                key={category.label}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default AddProductForm
