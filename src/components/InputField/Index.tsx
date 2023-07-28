import './InputField.scss'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/Provider'
import React from 'react'
const { v4: uuidv4 } = require('uuid')
import RegularInput from './RegularInput'
import AdvancedInput from './AdvancedInput'

interface InputFieldProps {
  formStyle?: object
  comId?: string
  fillerText?: string
  parentId?: string
  mode?: string
  customImg?: string
  inputStyle?: object
  cancelBtnStyle?: object
  submitBtnStyle?: object
  imgStyle?: object
  imgDiv?: object
}

const InputField = ({
  formStyle,
  comId,
  fillerText,
  parentId,
  mode,
  customImg,
  inputStyle,
  cancelBtnStyle,
  submitBtnStyle,
  imgStyle,
  imgDiv
}: InputFieldProps) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (fillerText) {
      setText(fillerText)
    }
  }, [fillerText])

  const globalStore: any = useContext(GlobalContext)

  const editMode = async (advText?: string, data?: {name:string, email: string, message: string}) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onEdit(textToSend, comId, parentId),
      globalStore.onEditAction &&
        (await globalStore.onEditAction({
          userId: globalStore.currentUserData.currentUserId,
          comId: comId,
          avatarUrl: globalStore.currentUserData.currentUserImg,
          userProfile: globalStore.currentUserData.currentUserProfile
            ? globalStore.currentUserData.currentUserProfile
            : null,
          fullName: globalStore.currentUserData.currentUserFullName,
          text: textToSend,
          data: data,
          parentOfEditedCommentId: parentId
        }))
    )
  }

  const replyMode = async (replyUuid: string, advText?: string, data?: {name:string, email: string, message: string}) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onReply(textToSend, comId, parentId, replyUuid),
      globalStore.onReplyAction &&
        (await globalStore.onReplyAction({
          userId: globalStore.currentUserData.currentUserId,
          repliedToCommentId: comId,
          avatarUrl: globalStore.currentUserData.currentUserImg,
          userProfile: globalStore.currentUserData.currentUserProfile
            ? globalStore.currentUserData.currentUserProfile
            : null,
          fullName: globalStore.currentUserData.currentUserFullName,
          text: textToSend,
          data: data,
          parentOfRepliedCommentId: parentId,
          comId: replyUuid
        }))
    )
  }
  const submitMode = async (createUuid: string, advText?: string, data?: {name:string, email: string, message: string}) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onSubmit(textToSend, createUuid),
      globalStore.onSubmitAction &&
        (await globalStore.onSubmitAction({
          userId: globalStore.currentUserData.currentUserId,
          comId: createUuid,
          avatarUrl: globalStore.currentUserData.currentUserImg,
          userProfile: globalStore.currentUserData.currentUserProfile
            ? globalStore.currentUserData.currentUserProfile
            : null,
          fullName: globalStore.currentUserData.currentUserFullName,
          text: textToSend,
          data: data,
          replies: []
        }))
    )
  }

  const handleSubmit = async (event: any, advText?: string, data?: {name:string, email: string, message: string}) => {
    event.preventDefault()
    const createUuid = uuidv4()
    const replyUuid = uuidv4()
    mode === 'editMode'
      ? editMode(advText, data)
      : mode === 'replyMode'
      ? replyMode(replyUuid, advText, data)
      : submitMode(createUuid, advText, data)
    setText('')
  }

  return (
    <div>
      {globalStore.advancedInput ? (
        <AdvancedInput
          handleSubmit={handleSubmit}
          text={mode === 'editMode' ? text : ''}
          formStyle={formStyle}
          mode={mode}
          cancelBtnStyle={cancelBtnStyle}
          submitBtnStyle={submitBtnStyle}
          comId={comId}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
        />
      ) : (
        <RegularInput
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
          mode={mode}
          inputStyle={inputStyle}
          cancelBtnStyle={cancelBtnStyle}
          comId={comId}
          submitBtnStyle={submitBtnStyle}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
export default InputField
