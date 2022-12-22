from flask import Blueprint, request
from app.models.comment import Comment, db

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


@comment_routes.route('/pin/<pinId>')
def comments_by_id(pinId):
    """
    Query for all comments for a pin and returns them in a list of comment dicitionaries
    """
    comments = Comment.query.filter_by(pinId=pinId).all()
    comments_dict = {}
    for comment in comments:
        comments_dict[comment.id] = comment.to_dict()
    return comments_dict


@comment_routes.route('/profile/<profileId>', methods=['POST'])
def add_comments_by_profileId(profileId):
    """
    Add comment with profile Id
    """
    data = request.get_json()
    print(data)
    new_comment = Comment(**data)
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()
