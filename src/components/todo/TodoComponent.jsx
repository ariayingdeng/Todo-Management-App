import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import TodoService from "../api/todo-api/TodoService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.id,
      description: "Learn Formik",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    let username = AuthenticationService.getLoggedUsername();
    TodoService.retrieveTodo(username, this.state.id).then((response) =>
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
      })
    );
  }

  render() {
    let { description, targetDate } = this.state;

    return (
      <div>
        <h1>Todo #{this.state.id}</h1>
        <Container>
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  ></Field>
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  ></Field>
                </fieldset>
                <br />
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
  }

  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Please enter a description";
    } else if (values.description.length < 5) {
      errors.description = "Enter at least 5 characters in a description";
    }
    // if (!moment(values.targetDate).isValid) {
    //   errors.targetDate = "Please enter a valid target date";
    // }
    return errors;
  }
}

export default TodoComponent;
