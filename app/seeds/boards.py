from app.models import db, environment, SCHEMA
from app.models.board import Board

# Add seeds for Boards
def seed_boards():
    board_1_1 = Board(name="Trees", profile_id=1, createdAt="now")
    board_1_2 = Board(name="Rivers", profile_id=1, createdAt="now")
    board_1_3 = Board(name="Mountains", profile_id=1, createdAt="now")

    db.session.add(board_1_1)
    db.session.add(board_1_2)
    db.session.add(board_1_3)
    db.session.commit()

def undo_boards():
    if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM boards")

    db.session.commit()
