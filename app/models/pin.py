from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .board import Board, board_pins

class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args_ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    destination_link = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(55), nullable=False)
    about = db.Column(db.String(255), nullable=False)
    alt_text = db.Column(db.String(255))
    note = db.Column(db.String(255))
    image = db.Column(db.String(255), nullable=False)

    user = db.relationship("User", back_populates="user_pins")

    # boards = db.relationship("Board", secondary=board_pins, back_populates="pins")

    def to_dict(self):
        return {
            'id': self.id,
            'profile_id': self.profile_id,
            'destination_link': self.destination_link,
            'title': self.title,
            'about': self.about,
            'alt_text': self.alt_text,
            'note': self.note,
            'image': self.image
        }

    def __init__(self, **dictionary):
        for k, v in dictionary.items():
            setattr(self,k,v)
