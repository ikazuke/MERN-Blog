import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CreatePost = () => {
  const initialValues = {
    title: "",
    content: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title can't be empty"),
    content: Yup.string().required("Content can't be empty"),
    username: Yup.string().min(3).max(15).required("Username can't be empty"),
  });

  const onSubmit = (data, { resetForm }) => {
    axios
      .post("http://localhost:3001/posts", data)
      .then(() => {
        alert("¡You have shared a post!");
        resetForm({});
      })
      .catch((err) => console.log("Something goes wrong: ", err));
  };

  return (
    <div className="createPostPage">
      <h2>New post</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Hi im a title"
          />
          <label>Content: </label>
          <ErrorMessage name="content" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="content"
            placeholder="Lorem isump..."
          />
          <label>User: </label>
          <ErrorMessage name="user" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="user"
            placeholder="Jonh Doe"
          />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
