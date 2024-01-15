'use client'

import Button from '@/app/components/Button'
import Heading from '@/app/components/Heading'
import CategoryInput from '@/app/components/inputs/CategoryInput'
import CustomCheckbox from '@/app/components/inputs/CustomCheckBox'
import Input from '@/app/components/inputs/Input'
import SelectColor from '@/app/components/inputs/SelectColor'
import TextArea from '@/app/components/inputs/TextArea'
import firebaseApp from '@/libs/firebase'
import { categories } from '@/utils/categories'
import { colors } from '@/utils/colors'
import { getStorage } from 'firebase/storage'
import { watch } from 'fs'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export type ImageType = {
  color: string
  colorCode: string
  image: File | null
}
export type UploadedImageType = {
  color: string
  colorCode: string
  image: string
}

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isProductCreated, setIsProductCreated] = useState(false)
  const [images, setImages] = useState<ImageType[] | null>()

  console.log('images >>>>>', images)

  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      images: [],
      category: '',
      inStock: false,
      brand: '',
    },
  })

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  useEffect(() => {
    setCustomValue('images', images)
  }, [images])

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setImages(null)
      setIsProductCreated(false)
    }
  }, [isProductCreated])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Product Data', data)
    // Upload images to firebase

    // Save product to mongodb
    setIsLoading(true)
    const UploadedImages: UploadedImageType[] = []

    if (!data.category) {
      setIsLoading(false)
      return toast.error('Category is not selected')
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false)
      return toast.error('No selected Imagek')
    }

    const handleImageUploads = async () => {
      toast('Creating product, please wait...')

      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + '-' + item.image.name
            const storage = getStorage(firebaseApp)
          }
        }
      } catch (error) {}
    }
  }

  const categoryW = watch('category')

  const addImageToState = useCallback((image: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [image]
      }

      return [...prev, image]
    })
  }, [])

  const removeImageFromState = useCallback((image: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const newImages = prev.filter(
          (currentImage) => currentImage.colorCode !== image.colorCode,
        )

        return newImages
      }

      return prev
    })
  }, [])

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
        id="price"
        type="number"
        label="Price"
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
        <div className="grid max-h-[50vh] grid-cols-2 gap-3 overflow-y-auto md:grid-cols-3">
          {categories.map((category) => {
            if (category.label === 'All') {
              return null
            }

            return (
              <CategoryInput
                icon={category.icon}
                label={category.label}
                onClick={(category) => setCustomValue('category', category)}
                key={category.label}
                selected={categoryW === category.label}
              />
            )
          })}
        </div>
      </div>
      <div className="flex w-full flex-col flex-wrap gap-4">
        <div className="font-bold">
          Select the available product colors and upload their image
        </div>
        <div className="text-sm">
          You must upload an image for each of the color selected, otherwise
          your color selection will be ignored
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-3">
        {colors.map((color, idx) => {
          return (
            <>
              <SelectColor
                item={color}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={false}
                key={idx}
              />
            </>
          )
        })}
      </div>
      <Button
        label={isLoading ? 'Loading' : 'Add Product'}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  )
}

export default AddProductForm
