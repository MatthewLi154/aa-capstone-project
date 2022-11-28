from .db import db, environment, SCHEMA, add_prefix_for_prod
from .board import boardPins

class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args_ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profileId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    destinationLink = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(55), nullable=False)
    about = db.Column(db.String(255), nullable=False)
    altText = db.Column(db.String(255))
    note = db.Column(db.String(255))
    image = db.Column(db.String(255), nullable=False)

    user = db.relationship("User", backPopulates="userPins")

    boards = db.relationship("Board", secondary=boardPins, backPopulates="pins")

    def to_dict(self):
        return {
            'id': self.id,
            'profileId': self.profileId,
            'destinationLink': self.destinationLink,
            'title': self.title,
            'about': self.about,
            'altText': self.altText,
            'note': self.note,
            'image': self.image
        }

    def __init__(self, **dictionary):
        for k, v in dictionary.items():
            setattr(self,k,v)
