from .db import db, environment, SCHEMA, add_prefix_for_prod

class BoardPin(db.Model):
    __tablename__ = "board_pins"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)

    pin_join = db.relationship("Board", foreign_keys=[board_id], back_populates="board_to_boardpin")
    board_join = db.relationship("Pin", foreign_keys=[pin_id], back_populates="pin_to_boardpin")
