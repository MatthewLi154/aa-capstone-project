from flask import Blueprint, request
from app.models import Board, board_pins, Pin, db
from datetime import datetime

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


@board_routes.route('/profile/<profile_id>/pins')
def get_user_board_pins(profile_id):
    """
    Query for pins of each board for a user
    """
    boards = Board.query.filter_by(profile_id=profile_id).all()
    boards_dict = {}
    for board in boards:
        pins_dict = {}
        pins = Pin.query.join(board_pins).join(Board).filter(
            (board_pins.c.pins_id == Pin.id) &
            (board_pins.c.boards_id == Board.id)
            ).filter_by(id=board.id).all()
        for pin in pins:
            pins_dict[pin.id] = pin.to_dict()
        boards_dict[board.id] = pins_dict
    return boards_dict


@board_routes.route('/<id>', methods=['DELETE'])
def delete_board_by_id(id):
    """
    Delete a board by board id
    """
    board = Board.query.get(id)
    db.session.delete(board)
    db.session.commit()
    return {"message": "Successfully deleted"}


@board_routes.route('/<id>', methods=['PUT'])
def edit_board_by_id(id):
    """
    Edit a board by board id
    """
    data = request.get_json()
    board = Board.query.get(id)
    board.name = data["name"]
    board.description = data["description"]
    board.createdAt = datetime.now()
    db.session.commit()

    return board.to_dict()
