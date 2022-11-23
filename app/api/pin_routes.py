from flask import Blueprint
from app.models import User, Pin

pin_routes = Blueprint('pins', __name__)


@pin_routes.route('/')
def pins():
    """
    Query for all pins and returns them in a list of pin dictionaries
    """
    pins = Pin.query.all()
    pins_dict = {}
    for pin in pins:
        pins_dict[pin.id] = pin.to_dict()
    return pins_dict
