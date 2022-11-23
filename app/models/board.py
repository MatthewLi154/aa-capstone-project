from .db import db, environment, SCHEMA, add_prefix_for_prod

board_pin = db.Table('board_pin',
    db.Model.metadata,
    db.Column('pins_id', db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id'))),
    db.Column('boards_id', db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')))
)

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    profile_id = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.String(55), nullable=False)

    pins = db.relationship('Pin', secondary=board_pin, back_populates="boards")
