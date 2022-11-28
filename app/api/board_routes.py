from flask import Blueprint, request
from app.models import Board, boardPins, Pin, db
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


@board_routes.route('/profile/<profileId>/pins')
def get_user_board_pins(profileId):
    """
    Query for pins of each board for a user
    """
    boards = Board.query.filter_by(profileId=profileId).all()
    boards_dict = {}
    for board in boards:
        pins_dict = {}
        pins = Pin.query.join(boardPins).join(Board).filter(
            (boardPins.c.pinsId == Pin.id) &
            (boardPins.c.boardsId == Board.id)
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
    return {"message": "Successfully deleted board"}


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


@board_routes.route('/<board_name>/pins/<pin_id>', methods=['POST'])
def add_pin_to_board(board_name, pin_id):
    """
    Adds a pin to a board using both id's
    """
    board = Board.query.filter_by(name=board_name).first()
    new_board_pin = boardPins.insert().values(pinsId=pin_id, boardsId=board.id)
    db.session.execute(new_board_pin)
    db.session.commit()
    return {
        "pinsId": pin_id,
        "boardsId": board.id
    }


@board_routes.route('/<profile_id>/<board_name>')
def get_board_by_name(board_name, profile_id):
    board = Board.query.filter_by(name=board_name, profileId=profile_id).first()
    return board.to_dict()
