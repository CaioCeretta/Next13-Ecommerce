'use client'

import { ImageType } from '@/app/admin/add-products/AddProductForm'
import { useCallback, useEffect, useState } from 'react'
import SelectImage from './SelectImage'
import Button from '../Button'

interface SelectColorProps {
  item: ImageType
  addImageToState: (value: ImageType) => void
  removeImageFromState: (value: ImageType) => void
  isProductCreated: boolean
}

const SelectColor = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}: SelectColorProps) => {
  const [isSelected, setIsSelected] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false)
      setFile(null)
    }
  }, [isProductCreated])

  const handleFileChange = useCallback((value: File) => {
    setFile(value)
    addImageToState({ ...item, image: value })
  }, [])

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked)

      if (!e.target.checked) {
        setFile(null)
        removeImageFromState(item)
      }
    },
    [isSelected],
  )

  return (
    <div
      className="grid grid-cols-1 items-center overflow-y-auto
    border-b-[1.2px] border-slate-200 p-2"
    >
      <div className="flex h-[3rem] items-center gap-2">
        <input
          id={item.color}
          onChange={handleCheck}
          type="checkbox"
          checked={isSelected}
          className="cursor-pointer "
        />
        <label htmlFor={item.color}>{item.color}</label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}

        {file && (
          <div className="col-span-2 flex w-[10.5rem] flex-row items-center justify-between gap-2 text-sm">
            <p>{file.name}</p>
            <div className="w-70px">
              <Button
                label="Cancel"
                small
                outline
                onClick={() => {
                  setFile(null)
                  removeImageFromState(item)
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default SelectColor
