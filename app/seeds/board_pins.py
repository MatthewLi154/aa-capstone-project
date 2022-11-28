from app.models import db, environment, SCHEMA
from app.models.board import boardPins

def seed_boardPins():
    boardPins_1 = boardPins.insert().values(pinsId=1, boardsId=1)
    boardPins_2 = boardPins.insert().values(pinsId=2, boardsId=1)
    boardPins_3 = boardPins.insert().values(pinsId=3, boardsId=1)

    boardPins_4 = boardPins.insert().values(pinsId=4, boardsId=2)
    boardPins_5 = boardPins.insert().values(pinsId=5, boardsId=2)
    boardPins_6 = boardPins.insert().values(pinsId=6, boardsId=2)

    boardPins_7 = boardPins.insert().values(pinsId=7, boardsId=3)
    boardPins_8 = boardPins.insert().values(pinsId=8, boardsId=3)

    db.session.execute(boardPins_1)
    db.session.execute(boardPins_2)
    db.session.execute(boardPins_3)
    db.session.execute(boardPins_4)
    db.session.execute(boardPins_5)
    db.session.execute(boardPins_6)
    db.session.execute(boardPins_7)
    db.session.execute(boardPins_8)
    db.session.commit()

def undo_boardPins():
    if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.boardPins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM boardPins")

    db.session.commit()
