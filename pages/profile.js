import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import Head from "next/head";
import Link from "next/dist/client/link";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
import { imageUpload } from "../utils/imageUpload";

const Profile = () => {
  const initialState = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
    contact_number: "",
  };

  const [data, setData] = useState(initialState);
  const { avatar, name, password, cf_password, contact_number } = data;

  const { state, dispatch } = useContext(DataContext);
  const { auth, notify } = state;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }

    if (name !== auth.user.avatar || avatar) updateInformation();
  };

  const updateInformation = async () => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (avatar) media = await imageUpload([avatar]);

    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please choose an image file" },
      });

    if (file.size > 1024 * 1024 * 3)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image size should not be greater than 3 MB!" },
      });

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image format not supported" },
      });

    setData({ ...data, avatar: file });
  };

  if (!auth.user) {
    return (
      <div className="profile_page">
        <Head>
          <title>Oops!</title>
        </Head>
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1>It seems you have entered forbidden grounds</h1>

          <h3 className="my-5">
            If you have an account, try{" "}
            <Link href="/signin">
              <a style={{ color: "crimson" }}>logging in </a>
            </Link>{" "}
            for from here
          </h3>
          <br />
          <h3 className="my-3">
            Or, If you don't have an account, you can{" "}
            <Link href="/register">
              <a style={{ color: "crimson" }}>sign-up </a>
            </Link>
            from here
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="profile_page">
      <Head>
        <title>Profile</title>
      </Head>

      <section className="row text-secondary my-5 mx-auto">
        <div className="col-md-12">
          <h3 className="text-center text-uppercase">{auth.user.name}'s Profile</h3>

          <div className="avatar">
            <img
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              alt={auth.user.avatar}
            ></img>
            <span>
              <i className="fa fa-camera" />
              <p>Change avatar</p>
              <input 
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changeAvatar}
              ></input>
            </span>
          </div>

          <div className="form-group ">
            {/* <label htmlFor="name">Name</label> */}
            <input
            style={{width: "60%"}}
              type="text"
              name="name"
              defaultValue={auth.user.name}
              className="form-control mx-auto"
              placeholder="Chnage your Name"
              onChange={handleChange} />
          </div>

          <div className="form-group ">
            {/* <label htmlFor="email">Email</label> */}
            <input
            style={{width: "60%"}}
              type="text"
              name="email"
              defaultValue={auth.user.email}
              className="form-control mx-auto"
              disabled={true}
              placeholder="Update your Email" />
          </div>

          <div className="form-group ">
            {/* <label htmlFor="password">Password</label> */}
            <input
            style={{width: "60%"}}
              type="password"
              name="password"
              value={password}
              className="form-control mx-auto"
              placeholder="Update your Password"
              onChange={handleChange} />
          </div>

          <div className="form-group ">
            {/* <label htmlFor="cf_password">Confirm Password</label> */}
            <input
            style={{width: "60%"}}
              type="password"
              name="cf_password"
              value={cf_password}
              className="form-control mx-auto"
              placeholder="Type your password again"
              onChange={handleChange} />
          </div>

          <div className="form-group mx-auto">
            {/* <label htmlFor="contact_number" style={{justifyContent:"center"}}>Contact Number</label> */}
            <input 
              style={{width: "60%"}}
              type="text"
              name="contact_number"
              value={auth.user.contact_number}
              className="form-control mx-auto"
              placeholder="Update your phone number"
              onChange={handleChange} />
          </div>

          <div className="col text-center">
          <button
            className="btn btn-info "
            disabled={notify.loading}
            onClick={handleUpdateProfile} >
            Update
          </button>
          </div>
        </div>

        
      </section>
    </div>
  );
};

export default Profile;
