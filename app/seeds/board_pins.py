from app.models import db, environment, SCHEMA
from app.models.board import board_pins

def seed_board_pins():
    board_pins_1 = board_pins.insert().values(pins_id=1, boards_id=1)
    board_pins_2 = board_pins.insert().values(pins_id=2, boards_id=1)
    board_pins_3 = board_pins.insert().values(pins_id=3, boards_id=1)

    board_pins_4 = board_pins.insert().values(pins_id=4, boards_id=2)
    board_pins_5 = board_pins.insert().values(pins_id=5, boards_id=2)
    board_pins_6 = board_pins.insert().values(pins_id=6, boards_id=2)

    board_pins_7 = board_pins.insert().values(pins_id=7, boards_id=3)
    board_pins_8 = board_pins.insert().values(pins_id=8, boards_id=3)

    db.session.execute(board_pins_1)
    db.session.execute(board_pins_2)
    db.session.execute(board_pins_3)
    db.session.execute(board_pins_4)
    db.session.execute(board_pins_5)
    db.session.execute(board_pins_6)
    db.session.execute(board_pins_7)
    db.session.execute(board_pins_8)
    db.session.commit()

def undo_board_pins():
    if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.board_pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM board_pins")

    db.session.commit()
