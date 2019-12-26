import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./EditorInfo.module.scss";
import TextInput from "../../Inputs/TextInput";
import TextareaInput from "../../Inputs/TextareaInput";
import ImageUpload from '../../Inputs/ImageUpload';
import { Link } from "react-router-dom";

import {
  authenticateLinkedin,
  getGithubAccount,
  AddImage,
  UploadImage
} from "../../../actions";

const EditorInfo = ({
  setEditorStatus,
  handleChange,
  currentVal,
  githubAccount,
  state,
  ...props
}) => {
  const [userInfo, setUserInfo] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setEditorStatus(2);
    console.log("user info", userInfo);
  }

  function linkedinLogin(e) {
    e.preventDefault();
    console.log(props.authenticateLinkedin());
    window.location = "/api/auth/linkedin";
  }

  function handleUpload(e) {
    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);
    this.props.UploadImage(formData);
  }

  function handleClick(e) {
    e.preventDefault();
    this.props.AddImage(this.state).then((img) => {
      if (img) {
        console.log("IMAGE", img);
        let imgData = {
          image_id: img.id,
          url: img.data.location
        };
        this.props.AddImage(imgData);
      }
    });
  }

  useEffect(() => {
    console.log(state);
    if (state) {
      if (state.githubAccount) {
        fetch(
          `https://api.github.com/users/${state.githubAccount}/repos?per_page=1000`
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    }

  }, []);

  return (
    <div id={styles.container} className="container-sm">
      <div className={styles.infoCta}>
        <h3>Fill in info or</h3>
        <button onClick={linkedinLogin}>login with linkedin</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="auto-grid grid-gap-md">
          <TextInput
            type="text"
            title="first"
            name="firstName"
            value={"hello"}
            placeholder="first name"
            handleChange={handleChange}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
          <TextInput
            type="text"
            title="last"
            name="lastName"
            value="yo"
            placeholder="last name"
            handleChange={handleChange}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
          <TextareaInput
            title="about"
            name="about"
            value="tell us about yourself"
            handleChange={handleChange}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </div>
        <ImageUpload name="profileImage" handleUpload={handleUpload} />
        <div className="editor-button-container">
          <button>
            <Link to="/editor/templates">go back</Link>
          </button>
          <button>
            <Link to="/editor/deploy" onClick={handleClick}>
              continue
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return { state: state };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateLinkedin: () => {
      return dispatch(authenticateLinkedin());
    },
    UploadImage: () => {
      return dispatch(UploadImage());
    },
    AddImage: () => {
      return dispatch(AddImage());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorInfo);
