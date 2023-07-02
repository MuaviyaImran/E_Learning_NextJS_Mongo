import styles from "@styles/Form.module.css";
import { useFormik } from "formik";
import _ from "lodash";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import { validateLogin } from "@/lib/validate";

export default function Signin() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "t@t.com",
      password: "12345678",
    },
    validate: validateLogin,
    onSubmit,
  });

  async function onSubmit(values) {
    setError(false);
    setLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(router.query.callbackurl || status.url);
    else {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <section className="flex items-center justify-center min-h-screen">
        <div className="w-3/4">
          <div className="title">
            <h1 className="text-center text-4xl font-bold text-gray-800">
              Sign In
            </h1>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="m-auto flex flex-col gap-4"
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                className={styles.input_text}
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="off"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <span className="text-rose-500">{formik.errors.email}</span>
            )}
            <div>
              <label htmlFor="password">Password</label>
              <div className="relative flex items-center">
                <input
                  className={styles.input_text}
                  type={!show ? "password" : "text"}
                  id="password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                <span
                  className="icon absolute right-0 px-4 hover:cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <HiOutlineEyeOff size={20} />
                  ) : (
                    <HiOutlineEye size={20} />
                  )}
                </span>
              </div>
            </div>
            {formik.errors.password && formik.touched.password && (
              <span className="text-rose-500">{formik.errors.password}</span>
            )}

            <div>
              <Link href="/forgot">Forgot password?</Link>
            </div>
            <div className="">
              <Link href="/signup">Dont have an Account? Signup</Link>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {error && (
                <span className="text-center text-sm text-rose-500">
                  Something went wrong Email or password incorrect
                </span>
              )}
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 py-2 text-slate-50 disabled:opacity-50"
                disabled={loading || !_.isEmpty(formik.errors)}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
