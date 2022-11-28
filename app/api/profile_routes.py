from flask import Blueprint, request
from app.models import User, Pin, Board, db
from datetime import datetime

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('')
def profiles():
    """
    Query and return all profiles
    """
    profiles = User.query.all()
    profiles_dict = {}
    for profile in profiles:
        profiles_dict[profile.id] = profile.to_dict()
    return profiles_dict


@profile_routes.route('/<id>/pins/created')
def profile_pins(id):
    """
    Query all pins created by user
    """
    pins = Pin.query.filter_by(profileId=id).all()
    pins_dict = {}
    for pin in pins:
        pins_dict[pin.id] = pin.to_dict()
    return pins_dict


@profile_routes.route('/<id>')
def get_single_profile(id):
    """
    Query for single profile information
    """
    profile = User.query.get(id)
    return profile.to_dict()

@profile_routes.route('/<id>/boards')
def profile_boards(id):
    """
    Query for boards created by user and returns them in a list of board dictionaries
    """
    boards = Board.query.filter_by(profileId=id).all()
    boards_dict = {}
    for board in boards:
        boards_dict[board.id] = board.to_dict()
    return boards_dict


@profile_routes.route('/<id>/boards', methods=['POST'])
def create_board_for_profile(id):
    """
    Create a new board for user
    """
    data = request.get_json()
    new_board = Board(name=data["name"],
                      profileId=data["profileId"],
                      description=data["description"],
                      createdAt=datetime.now())
    db.session.add(new_board)
    db.session.commit()
    return new_board.to_dict()
