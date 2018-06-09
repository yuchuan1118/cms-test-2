import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';
import { connect } from 'react-redux';

class PostsNew extends Component {
  renderField(field) {
    // const { meta } = field; // to replace 'field.meta' with 'meta'
    // const { touched, error } = meta; // to replace 'meta.touched' with 'touched'
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
  render() {
    const { handleSubmit } = this.props; // handleSubmit is added from redux-form

    return (
      // <form onSubmit={handleSubmit(this.onSubmit)}>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="authorDescription"
          name="authorDescription"
          component={this.renderField}
        />
        <Field label="authorId" name="authorId" component={this.renderField} />
        <Field
          label="authorName"
          name="authorName"
          component={this.renderField}
        />
        <Field
          label="couponExchange"
          name="couponExchange"
          component={this.renderField}
          parse={value => Number(value)}
        />
        <Field
          label="couponLimit"
          name="couponLimit"
          component={this.renderField}
          parse={value => Number(value)}
        />
        <Field
          label="courseDescription"
          name="courseDescription"
          component={this.renderField}
        />
        <Field
          label="courseTitle"
          name="courseTitle"
          component={this.renderField}
        />
        <Field
          label="priceOnSales"
          name="priceOnSales"
          component={this.renderField}
          parse={value => Number(value)}
        />
        <Field
          label="priceOrigin"
          name="priceOrigin"
          component={this.renderField}
          parse={value => Number(value)}
        />
        <Field
          label="scorePeople"
          name="scorePeople"
          component={this.renderField}
          parse={value => Number(value)}
        />
        <Field
          label="scoreTotal"
          name="scoreTotal"
          component={this.renderField}
          parse={value => Number(value)}
        />
        <Field
          label="studentNumber"
          name="studentNumber"
          component={this.renderField}
          parse={value => Number(value)}
        />
        <button type="submit" className="btn btn-primary">
          上架
        </button>
        <Link className="btn btn-danger" to="/">
          取消
        </Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {}; // empty object

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Enter a title!';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories!';
  }

  if (!values.content) {
    errors.content = 'Enter some content please.';
  }
  // If empty is empty, the form is fine to submit.
  // If errors has *any* properties, redux form assumes form is invalid.
  return errors;
}

export default reduxForm({
  validate, // validate: validate, :validate function will be called automatically when the form is submitted.
  form: 'PostNewForm'
})(connect(null, { createPost })(PostsNew));
