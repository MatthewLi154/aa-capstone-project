from .db import db, environment, SCHEMA, add_prefix_for_prod

board_pins = db.Table(
    'board_pins',
    db.Column('pins_id',
              db.Integer,
              db.ForeignKey(add_prefix_for_prod('pins.id')),
              primary_key=True),
    db.Column('boards_id',
              db.Integer,
              db.ForeignKey(add_prefix_for_prod('boards.id')),
              primary_key=True)
)
if environment == "production":
    board_pins.schema = SCHEMA

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    profile_id = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.String(55), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'profile_id': self.profile_id,
            'createdAt': self.createdAt
        }
