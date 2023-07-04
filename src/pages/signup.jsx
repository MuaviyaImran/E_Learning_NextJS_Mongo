import { validateRegister } from "@lib/validate";
import styles from "@styles/Form.module.css";
import { useFormik } from "formik";
import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [education, setEducation] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
      selectedOption: "",
      agree: false,
      phone: "",
    },
    validate: validateRegister,
    onSubmit,
  });

  async function onSubmit(values) {
    setError("");
    if (selectedOption === "") {
      showToast("Select User Type");
    } else {
      if (selectedOption === "teacher" && selectedOption === "") {
        showToast("Fill Education Field");
      } else {
        setLoading(true);
        try {
          const res = await fetch(`/api/signup`, {
            method: "POST",
            body: JSON.stringify({
              firstname: values.firstName,
              lastname: values.lastName,
              email: values.email,
              password: values.password,
              role: selectedOption,
              phone: values.phone,
              education: education !== "" ? education : education,
              courses: [],
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.status === 201) {
            setSuccess(true);
            router.push("/");
          } else if (res.status === 406) {
            setError("User already exists with this email");
          } else {
            setError("Something went wrong");
          }
        } catch (e) {
          setError(e.message);
        }
        setLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      {/* <Main> */}
      <ToastContainer />
      <section className="flex min-h-screen items-center justify-center">
        <div className="w-3/4">
          <div className="title">
            <h1 className="text-center text-4xl font-bold text-gray-800">
              Sign Up
            </h1>
          </div>
          <form
            className="m-auto flex flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                className={styles.input_text}
                type="text"
                id="firstname"
                placeholder="First Name"
                {...formik.getFieldProps("firstName")}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <span className="text-sm text-rose-500">
                  {formik.errors.firstName}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                className={styles.input_text}
                type="text"
                id="lastname"
                placeholder="Last Name"
                {...formik.getFieldProps("lastName")}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <span className="text-sm text-rose-500">
                  {formik.errors.lastName}
                </span>
              )}
            </div>

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
              {formik.errors.email && formik.touched.email && (
                <span className="text-sm text-rose-500">
                  {formik.errors.email}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="number">Contact</label>
              <input
                className={styles.input_text}
                type="phone"
                maxlLength={11}
                id="number"
                placeholder="Number"
                autoComplete="off"
                {...formik.getFieldProps("phone")}
              />
              {formik.errors.phone && formik.touched.phone && (
                <span className="text-sm text-rose-500">
                  {formik.errors.phone}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className={styles.input_text}
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <span className="text-sm text-rose-500">
                  {formik.errors.password}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                className={styles.input_text}
                type="password"
                id="cpassword"
                placeholder="Confirm Password"
                {...formik.getFieldProps("cpassword")}
              />
              {formik.errors.cpassword && formik.touched.cpassword && (
                <span className="text-sm text-rose-500">
                  {formik.errors.cpassword}
                </span>
              )}
            </div>
            <div className="text-center">
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="appearance-none rounded border border-gray-300 bg-white px-4 py-2 pr-8 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select an option</option>
                <option value="teacher">Teacher</option>
                <option value="user">User</option>
              </select>
              {selectedOption === "teacher" && (
                <div>
                  <label htmlFor="education">Education</label>
                  <input
                    className={styles.input_text}
                    type="text"
                    id="education"
                    placeholder="Education"
                    onChange={(e) => setEducation(e.target.value)}
                  />
                  {education === "" ? (
                    <span className="text-sm text-rose-500">
                      Fill the Field
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              )}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 13.95a1 1 0 0 1-1.414 0l-3.536-3.536A1 1 0 0 1 6.364 9.05L9 11.686l2.636-2.636a1 1 0 0 1 1.414 0l3.536 3.536a1 1 0 0 1 0 1.414l-3.536 3.536a1 1 0 0 1-1.414 0L9.293 13.95z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex">
                <input
                  className="hover:cursor-pointer"
                  type="checkbox"
                  id="checkbox"
                  {...formik.getFieldProps("agree")}
                />
                <label htmlFor="checkbox" className="ms-2">
                  I agree to the{" "}
                  <Link
                    href={"/terms"}
                    className="terms"
                    passHref
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              {formik.errors.agree && (
                <div className="text-sm text-rose-500">
                  {formik.errors.agree}
                </div>
              )}
            </div>

            <div className="mt-2 flex flex-col gap-2">
              {error && (
                <span className="text-center text-sm text-rose-500">
                  {error}
                </span>
              )}
              {success && (
                <span className="text-center text-sm text-green-600">
                  User registered successfully
                </span>
              )}
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 py-2 text-slate-50 disabled:opacity-50"
                disabled={loading || !_.isEmpty(formik.errors)}
              >
                Sign up
              </button>
            </div>
            <div className="text-center">
              Already have account? {""}
              <Link href="/signin">Sign in</Link>
            </div>
          </form>
        </div>
      </section>
      {/* </Main> */}
    </>
  );
}
