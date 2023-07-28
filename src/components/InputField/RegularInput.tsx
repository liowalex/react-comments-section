import React from 'react'
import './InputField.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import { Formik } from "formik";

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

 // A custom validation function. This must return an object
 // which keys are symmetrical to our values/initialValues
 const validate = (values: { name: string | any[]; message: string | any[]; email: string; }) => {
  var errors: {name?: string, message?: string, email?: string} = {};
  if (!values.name || values.name === '') {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }
 
  if (!values.message || values.message === '') {
    errors.message = 'Required';
  } else if (values.message.length > 240) {
    errors.message = 'Must be 240 characters or less';
  }
 
  if (!values.email || values.email === '') {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
 
  return errors;
};

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
        initialErrors={{
          name: 'Required',
          email: 'Required',
          message: 'Required',
        }}
        onSubmit={(event, values) => {
          // Handle form submission here
          console.log(event);
          console.log(values);
        }}
        validate={validate}
      >
        {props => (
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your name</span>
              </label>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.name}
                onBlur={props.handleBlur}
                name="name"
                placeholder="e.g. John Doe"
                className="input input-bordered w-full max-w-xs"
              />
              {props?.errors.name ? <div className="text-red-500">{props.errors.name}</div> : null}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your email</span>
              </label>
              <input
                type="email"
                onChange={props.handleChange}
                value={props.values.email}
                onBlur={props.handleBlur}
                name="email"
                placeholder="e.g johndoe@gmail.com"
                className="input input-bordered w-full max-w-xs"
              />
              {props?.errors.email ? <div className="text-red-500">{props.errors.email}</div> : null}
            </div>
            <div className="form-control">
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.message}
                onBlur={props.handleBlur}
                name="message"
                className='postComment textarea textarea-bordered h-2'
                style={
                  mode === 'replyMode' || mode === 'editMode'
                    ? globalStore.replyInputStyle
                    : globalStore.inputStyle || inputStyle
                }
                placeholder='Type your reply here.'
              />
              {props?.errors.message ? <div className="text-red-500">{props.errors.message}</div> : null}
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
              onClick={(e)=>{
                if (props.isValid) {
                  handleSubmit(e, props.values.message, props.values);
                }
                e.preventDefault();
              }}
            >
              Post
            </button>
          </form>
        )}
      </Formik>
  )
}

export default RegularInput
