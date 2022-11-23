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
                image="https://i.pinimg.com/564x/15/6e/65/156e65aeff03dd8c53911397c4043bc5.jpg")

    pin_2 = Pin(profile_id=1,
                destination_link="pinterest.com",
                title="My Second Pin",
                about="This is my second pin!",
                alt_text="My second alt text",
                note="My second Note",
                image="https://i.pinimg.com/564x/fe/f9/e7/fef9e7b60aa988ea7ba4d25ecb464322.jpg")

    pin_3 = Pin(profile_id=1,
                destination_link="google.com",
                title="My Third Pin",
                about="This is my third pin!",
                alt_text="My third alt text",
                note="My Third Note",
                image="https://i.pinimg.com/564x/e6/a7/12/e6a71256ee029026ab73baa5da7af97c.jpg")

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
