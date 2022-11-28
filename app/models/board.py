from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

boardPins = db.Table(
    'board_pins',
    db.metadata,
    db.Column('id',
              db.Integer,
              primary_key=True),
    db.Column('pinsId',
              db.Integer,
              db.ForeignKey(add_prefix_for_prod('pins.id'))),
    db.Column('boardsId',
              db.Integer,
              db.ForeignKey(add_prefix_for_prod('boards.id')),
))
if environment == "production":
    boardPins.schema = SCHEMA

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    description = db.Column(db.String(255))
    profileId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())

    pins = db.relationship("Pin", secondary=boardPins, back_populates="boards")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'profileId': self.profileId,
            'createdAt': self.createdAt
        }
