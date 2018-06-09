import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCourses } from '../actions/index';
import { Link } from 'react-router-dom';
// import comma_dark from '';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  renderCourses() {
    return _.map(this.props.courses, post => {
      return (
        <li className="list-group-item" key={post.courseId}>
          <Link to={`/courses/${post.courseId}`}>{post.courseTitle}</Link>
        </li>
      );
    });
  }

  render() {
    // const { courses } = this.props;
    // if (!courses) {
    //   return <div>Loading...</div>;
    // }
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/courses/new">
            上架課程
          </Link>
        </div>
        <h1>Comma,</h1>
        <ul className="list-group">{this.renderCourses()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { courses: state.courses };
}
export default connect(mapStateToProps, { fetchCourses })(PostsIndex);
