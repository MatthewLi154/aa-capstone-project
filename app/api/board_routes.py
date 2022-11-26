from flask import Blueprint, request
from app.models import Board

board_routes = Blueprint('boards', __name__)

@board_routes.route('')
def boards():
    """
    Query for all boards and returns them in a list of board dictionaries
    """
    boards = Board.query.all()
    boards_dict = {}
    for board in boards:
        boards_dict[board.id] = board.to_dict()
    return boards_dict

@board_routes.route('')
def profile_boards():
    """
    Query for boards created by user and returns them in a list of board dictionaries
    """
    boards = Board.query.filter_by(profile_id=id).all()
    boards_dict = {}
    for board in boards:
        boards_dict[board.id] = board.to_dict()
    return boards_dict
