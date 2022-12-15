from flask import Blueprint, request
from app.models.comment import Comment

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('')
def comments():
    """
    Query for all comments and returns them in a list of comment dictionaries
    """
    comments = Comment.query.all()
    comments_dict = {}
    for comment in comments:
        comments_dict[comment.id] = comment.to_dict()
    return comments_dict
