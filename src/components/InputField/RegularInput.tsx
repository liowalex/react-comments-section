import React from 'react'
import './InputField.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import { object, string } from "zod";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from 'zod-formik-adapter';

interface RegularInputProps {
  comId?: string
  mode?: string
  customImg?: string
  inputStyle?: object
  cancelBtnStyle?: object
  submitBtnStyle?: object
  imgStyle?: object
  imgDiv?: object
  handleSubmit: Function
}

const contactFormSchema = object({
  // defines a required field called name
  name: string({
    required_error: "Please enter your name",
  }),
  // defines a required field called email.
  // we use the built-in email validator from zod
  email: string().email("Please enter a valid email"),
  // defines a required field called message with length constraints of 150-1000 characters.
  message: string().min(5).max(350),
});

const RegularInput = ({
  imgDiv,
  imgStyle,
  customImg,
  mode,
  inputStyle,
  cancelBtnStyle,
  comId,
  submitBtnStyle,
  handleSubmit,
}: RegularInputProps) => {
  const globalStore: any = useContext(GlobalContext)

  return (
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        onSubmit={(event, values) => {
          // Handle form submission here
          console.log(event);
          console.log(values);
        }}
        validationSchema={toFormikValidationSchema(contactFormSchema)}
      >
        {() => (
          <form>
            <div className='userImg' style={imgDiv}>
              <a
                target='_blank'
                href={globalStore.currentUserData.currentUserProfile}
              >
                <img
                  src={
                    globalStore.customImg ||
                    customImg ||
                    globalStore.currentUserData.currentUserImg
                  }
                  style={globalStore.imgStyle || imgStyle}
                  alt='userIcon'
                  className='imgdefault'
                />
              </a>
            </div>
            <Form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your name</span>
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  className="input input-bordered w-full max-w-xs"
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your email</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="e.g johndoe@gmail.com"
                  className="input input-bordered w-full max-w-xs"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="form-control">
                <Field
                  as="textarea"
                  type="text"
                  name="message"
                  className='postComment textarea textarea-bordered h-2'
                  style={
                    mode === 'replyMode' || mode === 'editMode'
                      ? globalStore.replyInputStyle
                      : globalStore.inputStyle || inputStyle
                  }
                  placeholder='Type your reply here.'
                />
                <ErrorMessage name="message" component="div" className="text-red-500" />
              </div>
              {mode && (
                <button
                  className='cancelBtn'
                  style={globalStore.cancelBtnStyle || cancelBtnStyle}
                  type='button'
                  onClick={() =>
                    mode === 'editMode'
                      ? globalStore.handleAction(comId, true)
                      : globalStore.handleAction(comId, false)
                  }
                >
                  Cancel
                </button>
              )}
              <button
                className='postBtn'
                type='submit'
                style={globalStore.submitBtnStyle || submitBtnStyle}
                onClick={(e)=>handleSubmit(e)}
              >
                Post
              </button>
            </Form>
          </form>
        )}
      </Formik>
  )
}

export default RegularInput
