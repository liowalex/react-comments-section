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
  } else if (values.name.length > 35) {
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
  comId,
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
        onSubmit={()=>{}}
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
                  className='imgdefault hidden'
                />
              </a>
            </div>
            <div className="form-control">
              <textarea
                onChange={props.handleChange}
                value={props.values.message}
                onBlur={props.handleBlur}
                name="message"
                className='postComment textarea textarea-bordered h-2'
                style={{
                  textDecoration: "none",
                  backgroundColor: "rgb(247, 248, 249)",
                  borderColor: "rgb(240, 240, 240)",
                  borderRadius: "1px",
                  margin: "10px 0px 0px 0px",
                  width: "100%",
                  padding: "10px 15px",
                  transition: "all 0s ease-in-out",
                }}
                placeholder='Comment *'
              />
              {props?.errors.message ? <div className="text-sm text-red-700">{props.errors.message}</div> : null}
            </div>
            <div className="form-control">
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.name}
                onBlur={props.handleBlur}
                name="name"
                placeholder="Name *"
                className="input input-bordered w-full max-w-xs"
                style={{
                  textDecoration: "none",
                  backgroundColor: "rgb(247, 248, 249)",
                  borderColor: "rgb(240, 240, 240)",
                  borderRadius: "1px",
                  margin: "10px 0px 0px 0px",
                  width: "100%",
                  padding: "10px 15px",
                  transition: "all 0s ease-in-out",
                }}
              />
              {props?.errors.name ? <div className="text-sm text-red-700">{props.errors.name}</div> : null}
            </div>
            <div className="form-control">
              <input
                type="email"
                onChange={props.handleChange}
                value={props.values.email}
                onBlur={props.handleBlur}
                name="email"
                placeholder="Email *"
                className="input input-bordered w-full max-w-xs"
                style={{
                  textDecoration: "none",
                  backgroundColor: "rgb(247, 248, 249)",
                  borderColor: "rgb(240, 240, 240)",
                  borderRadius: "1px",
                  margin: "10px 0px 0px 0px",
                  width: "100%",
                  padding: "10px 15px",
                  transition: "all 0s ease-in-out",
                }}
              />
              {props?.errors.email ? <div className="text-sm text-red-700">{props.errors.email}</div> : null}
            </div>
            {mode && (
              <button
                className='cancelBtn'
                style={{
                  marginTop: '5px',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: '#55555e',
                  margin: '10px 20px 10px 0px',
                }}
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
              onClick={(e)=>{
                if (props.isValid) {
                  handleSubmit(e, props.values.message, props.values);
                }
                e.preventDefault();
              }}
              style={{
                marginTop: '5px',
                backgroundColor: '#55555e',
                cursor: 'pointer',
                color: 'white',
                padding: '10px 20px',
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
