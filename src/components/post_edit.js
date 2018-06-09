import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updatePost, fetchPost } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class PostEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log('PostsEdit/fetchpost');
    this.props.fetchPost(id);
  }

  renderField(field) {
    // const { meta } = field; // to replace 'field.meta' with 'meta'
    // const { touched, error } = meta; // to replace 'meta.touched' with 'touched'
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    const { id } = this.props.match.params;
    this.props.updatePost(id, values, () => {
      this.props.history.push(`/posts/${id}`);
    });
  }

  render() {
    const { id } = this.props.match.params;
    const { post } = this.props;
    const { handleSubmit } = this.props; // handleSubmit is added from redux-form

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      // <div>
      //   <h3>Title: {post.title}</h3>
      //   <h6>Categories: {post.categories}</h6>
      //   <p>{post.content}</p>
      // </div>

      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
          placeholder={post.title}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
          placeholder={post.categories}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
          placeholder={post.content}
        />
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <Link className="btn btn-danger" to={`/posts/${id}`}>
          Cancel
        </Link>
      </form>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {}; // empty object

  // Validate the inputs from 'values'
  // if (!values.title) {
  //   errors.title = 'Enter a title!';
  // }
  //
  // if (!values.categories) {
  //   errors.categories = 'Enter some categories!';
  // }
  //
  // if (!values.content) {
  //   errors.content = 'Enter some content please.';
  // }

  // If empty is empty, the form is fine to submit.
  // If errors has *any* properties, redux form assumes form is invalid.
  return errors;
}

export default reduxForm({
  validate, // validate: validate, :validate function will be called automatically when the form is submitted.
  form: 'PostNewForm'
})(connect(mapStateToProps, { updatePost, fetchPost })(PostEdit));
