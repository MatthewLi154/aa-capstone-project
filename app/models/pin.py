from .db import db, environment, SCHEMA, add_prefix_for_prod
from .board import Board, board_pin

class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args_ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.String(20), db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    destination_link = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(55), nullable=False)
    note = db.Column(db.String(255))
    image = db.Column(db.String(255), nullable=False)

    user = db.relationship("User", back_populates="user_pins")

    boards = db.relationship("Board", secondary=board_pin, back_populates="pins")

    def to_dict(self):
        return {
            'id': self.id,
            'profile_id': self.profile_id,
            'destination_link': self.destination_link,
            'title': self.title,
            'note': self.note,
            'image': self.image
        }
