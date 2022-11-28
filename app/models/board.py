from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

board_pins = db.Table(
    'board_pins',
    db.metadata,
    db.Column('id',
              db.Integer,
              primary_key=True),
    db.Column('pins_id',
              db.Integer,
              db.ForeignKey(add_prefix_for_prod('pins.id'))),
    db.Column('boards_id',
              db.Integer,
              db.ForeignKey(add_prefix_for_prod('boards.id')),
))
if environment == "production":
    board_pins.schema = SCHEMA

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    description = db.Column(db.String(255))
    profile_id = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())

    pins = db.relationship("Pin", secondary=board_pins, back_populates="boards")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'profile_id': self.profile_id,
            'createdAt': self.createdAt
        }
