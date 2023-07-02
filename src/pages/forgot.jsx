import { validateForgot } from '@lib/validate';
import styles from '@styles/Form.module.css';
import { useFormik } from 'formik';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Forgot() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cpassword: '',
      agree: false,
    },
    validate: validateForgot,
    onSubmit,
  });

  async function onSubmit(values, { resetForm }) {
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      resetForm();
    }, 2000);
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      {/* <Main> */}
      <section className="mx-auto flex h-full w-3/4 flex-col gap-10 py-4">
        <div className="title">
          <h1 className="text-center text-4xl font-bold text-gray-800">
            Forgot Password
          </h1>
        </div>
        <form
          className="m-auto flex flex-col gap-4"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label htmlFor="email">Enter your Email</label>
            <input
              className={styles.input_text}
              type="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
              {...formik.getFieldProps('email')}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-sm text-rose-500">
                {formik.errors.email}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-col gap-2">
            {error && (
              <span className="text-center text-sm text-rose-500">
                Somthing went wrong try again
              </span>
            )}
            {success && (
              <span className="text-center text-sm text-green-600">
                A recovery code has been sent to your email
              </span>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 py-2 text-slate-50 disabled:opacity-50"
              disabled={loading || !_.isEmpty(formik.errors)}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      {/* </Main> */}
    </>
  );
}
