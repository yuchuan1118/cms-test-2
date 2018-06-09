import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { course } = this.props;

    if (!course) {
      return <div>讀取中...</div>;
    }

    return (
      <div>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          刪除課程
        </button>
        <Link to="/">回到首頁</Link>
        <Link
          className="btn btn-primary pull-xs-right"
          to={`/courses/${course.id}/edit`}
        >
          編輯課程
        </Link>

        <h3>{course.courseTitle}</h3>
        <h6>authorDescription:</h6>
        <p>{course.authorDescription}</p>
        <h6>authorId: {course.authorId}</h6>
        <h6>authorName: {course.authorName}</h6>
        <h6>authorImage: ooo</h6>
        <h6>couponExchange: {course.couponExchange}</h6>
        <h6>couponLimit: {course.couponLimit}</h6>
        <h6>courseDescription:</h6>
        <p>{course.courseDescription}</p>
        <h6>courseId: {course.courseId}</h6>
        <h6>courseTitle: {course.courseTitle}</h6>
        <h6>overViewImage: ooo</h6>
        <h6>priceOnSales: {course.priceOnSales}</h6>
        <h6>priceOrigin: {course.priceOrigin}</h6>
        <h6>scorePeople: {course.scorePeople}</h6>
        <h6>scoreTotal: {course.scoreTotal}</h6>
        <h6>studentNumber: {course.studentNumber}</h6>
      </div>
    );
  }
}

function mapStateToProps({ courses }, ownProps) {
  return { course: courses[ownProps.match.params.id] }; // this.props === ownProps
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
