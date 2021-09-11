/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import valid from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Register = () => {
  const initialState = { name: "", email: "", password: "", cf_password: "" };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    return router.push("/signin");
  };

  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <h1 className="row justify-content-center" style={{ color: "black" }}>
        Hello!
      </h1>

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name" style={{ color: "black" }}>
            Name <span style={{ color: "crimson" }}>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChangeInput}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1" style={{ color: "black" }}>
            Email address <span style={{ color: "crimson" }}>*</span>
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChangeInput}
            name="email"
          />
          <small
            id="emailHelp"
            className="form-text"
            style={{ color: "rgb(185,61,0)" }}
          >
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" style={{ color: "black" }}>
            Password <span style={{ color: "crimson" }}>*</span>
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={handleChangeInput}
            name="password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword2" style={{ color: "black" }}>
            Confirm your Password <span style={{ color: "crimson" }}>*</span>
          </label>
          <input
            type="password"
            className="form-control"
            value={cf_password}
            id="exampleInputPassword2"
            onChange={handleChangeInput}
            name="cf_password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-info w-100 my-2"
          style={{ color: "black" }}
        >
          Register Now
        </button>
        <p className="my-2 text-muted" style={{ color: "black" }}>
          <span style={{ color: "crimson" }}>*</span> Fields are required
        </p>
        <p className="my-2" style={{ color: "black" }}>
          Already have an account?
          <Link href="/signin">
            <a style={{ color: "crimson" }}>Sign-In here!</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
