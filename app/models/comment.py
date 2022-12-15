from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profileId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    pinId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)
    body = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'profileId': self.profileId,
            'pinId': self.pinId,
            'body': self.body,
            'createdAt': self.createdAt
        }
