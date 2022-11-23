from app.models import db, environment, SCHEMA
from app.models.pin import Pin

# Adds seeds for Pins
def seed_pins():
    pin_1 = Pin(profile_id=1,
                destination_link="google.com",
                title="My First Pin",
                about="This is my first pin!",
                alt_text="My first alt text",
                note="My first Note",
                image="https://i.pinimg.com/564x/a2/8f/cc/a28fcce2f0b496a6e2350e3488065027.jpg")

    pin_2 = Pin(profile_id=1,
                destination_link="pinterest.com",
                title="My Second Pin",
                about="This is my second pin!",
                alt_text="My second alt text",
                note="My second Note",
                image="https://i.pinimg.com/564x/f6/5c/32/f65c32742e3806821dd920b7f838aa6a.jpg")

    pin_3 = Pin(profile_id=1,
                destination_link="google.com",
                title="My Third Pin",
                about="This is my third pin!",
                alt_text="My third alt text",
                note="My Third Note",
                image="https://i.pinimg.com/564x/59/9e/e8/599ee880ffa6efbbba5e4a71b3d76fc6.jpg")

    db.session.add(pin_1)
    db.session.add(pin_2)
    db.session.add(pin_3)
    db.session.commit()


def undo_pins():
    if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins")

    db.session.commit()
